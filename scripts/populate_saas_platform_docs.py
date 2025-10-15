#!/usr/bin/env python3
"""Populate SaaS platform docs from a single HTML template.

This script:
  * Parses the HTML source file containing all SaaS platform sections
  * Converts each platform section to Markdown/MDX
  * Copies referenced images into static/img/saas-platforms/<platform-slug>/
  * Replaces placeholder text in the corresponding Docusaurus MDX file
  * Prints a concise summary when finished

Usage:
    python3 scripts/populate_saas_platform_docs.py \
        --html-source "/path/to/SaaSPlatformconfigurationtemplate.html" \
        --docs-root docs/cloud/services/data-collection/interfacing-lms/saas-platforms \
        --img-root static/img/saas-platforms
"""

from __future__ import annotations

import argparse
import re
import shutil
import sys
import textwrap
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Tuple
from urllib.parse import urlparse, unquote
from urllib.request import urlopen

from bs4 import BeautifulSoup, NavigableString, Tag


@dataclass
class HtmlSection:
    heading: Tag
    nodes: List

    @property
    def heading_text(self) -> str:
        return self.heading.get_text(strip=True)

    @property
    def heading_id(self) -> str:
        return self.heading.get("id", "")

    @property
    def heading_level(self) -> int:
        return int(self.heading.name[1]) if self.heading.name and self.heading.name.startswith("h") else 0


class DocPopulator:
    def __init__(self, html_source: Path, docs_root: Path, img_root: Path) -> None:
        self.html_source = html_source
        self.html_dir = html_source.parent
        self.docs_root = docs_root
        self.img_root = img_root
        self.sections: List[HtmlSection] = []
        self.section_index: Dict[str, HtmlSection] = {}
        self.summary: Dict[str, List[str]] = {
            "updated": [],
            "warnings": [],
        }
        self.images_copied = 0
        self._image_name_counts: Dict[Tuple[str, str], int] = {}
        self._image_hash: Dict[Tuple[str, str], Path] = {}

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def run(self) -> None:
        self._load_sections()
        self._process_docs()
        self._print_summary()

    # ------------------------------------------------------------------
    # HTML processing
    # ------------------------------------------------------------------

    def _load_sections(self) -> None:
        soup = BeautifulSoup(self.html_source.read_text(encoding="utf-8"), "html.parser")
        for heading in soup.find_all(["h2", "h3", "h4"]):
            text = heading.get_text(strip=True)
            if not text:
                continue
            if heading.name == "h2" and heading.find_parents("h3"):
                continue
            if heading.name == "h2" and not re.search(r"[a-zA-Z]", text):
                continue
            if heading.name in {"h2", "h3"}:
                nodes = []
                for sibling in heading.next_siblings:
                    if isinstance(sibling, NavigableString):
                        if not sibling.strip():
                            continue
                        nodes.append(sibling)
                        continue
                    if isinstance(sibling, Tag) and sibling.name in {"h2", "h3"}:
                        break
                    nodes.append(sibling)
                section = HtmlSection(heading=heading, nodes=nodes)
                self.sections.append(section)
        # Build lookup map for quick matching
        for section in self.sections:
            key = normalize_key(section.heading_text)
            if key:
                self.section_index.setdefault(key, section)
            sec_id = normalize_key(section.heading_id)
            if sec_id:
                self.section_index.setdefault(sec_id, section)

    # ------------------------------------------------------------------
    # Documentation processing
    # ------------------------------------------------------------------

    def _process_docs(self) -> None:
        for mdx_path in sorted(self.docs_root.glob("*.mdx")):
            slug = mdx_path.stem
            if slug in {"index"} or slug.startswith("_"):
                continue
            content = mdx_path.read_text(encoding="utf-8")
            if "Placeholder:" not in content:
                continue
            front_matter, body = split_front_matter(content)
            doc_title = front_matter.get("title", "")
            section = self._match_section(slug=slug, title=doc_title)
            if not section:
                self.summary["warnings"].append(f"No HTML section found for '{slug}' ({mdx_path})")
                continue
            markdown = self._convert_section(section, slug)
            new_content = replace_placeholder(body, markdown)
            if new_content == body:
                self.summary["warnings"].append(f"Placeholder not replaced for '{slug}' ({mdx_path})")
                continue
            combined = combine_front_matter(front_matter, new_content)
            mdx_path.write_text(combined, encoding="utf-8")
            self.summary["updated"].append(str(mdx_path))

    # ------------------------------------------------------------------
    # Section matching
    # ------------------------------------------------------------------

    def _match_section(self, slug: str, title: str) -> Optional[HtmlSection]:
        candidates: List[Tuple[int, HtmlSection]] = []
        slug_key = normalize_key(slug)
        title_key = normalize_key(title)
        for section in self.sections:
            sec_key = normalize_key(section.heading_text)
            sec_id = normalize_key(section.heading_id)
            score = None
            if sec_id and sec_id == slug_key:
                score = 0
            elif sec_key and sec_key == slug_key:
                score = 1
            elif title_key and sec_key == title_key:
                score = 2
            elif slug_key and sec_key.startswith(slug_key):
                score = 3
            elif slug_key and slug_key in sec_key:
                score = 4
            elif title_key and title_key in sec_key:
                score = 5
            if score is not None:
                candidates.append((score, section))
        if not candidates:
            return None
        candidates.sort(key=lambda item: item[0])
        return candidates[0][1]

    # ------------------------------------------------------------------
    # HTML -> Markdown conversion
    # ------------------------------------------------------------------

    def _convert_section(self, section: HtmlSection, slug: str) -> str:
        blocks: List[str] = []
        for node in section.nodes:
            block = self._convert_node(node, slug)
            if block:
                blocks.extend(block if isinstance(block, list) else [block])
        # Remove consecutive blank lines
        cleaned: List[str] = []
        for block in blocks:
            text = block.strip()
            if not text:
                continue
            if cleaned and cleaned[-1] == text:
                continue
            cleaned.append(text)
        markdown = "\n\n".join(cleaned)
        markdown = wrap_json_blocks(markdown)
        return markdown + ("\n" if not markdown.endswith("\n") else "")

    def _convert_node(self, node, slug: str):  # type: ignore[override]
        if isinstance(node, NavigableString):
            text = escape_angle_brackets(normalize_ws(str(node)))
            return text if text else None
        if not isinstance(node, Tag):
            return None
        name = node.name.lower()
        if name in {"div", "section", "article"}:
            blocks: List[str] = []
            for child in node.children:
                child_block = self._convert_node(child, slug)
                if child_block:
                    blocks.extend(child_block if isinstance(child_block, list) else [child_block])
            return blocks
        if name == "p":
            blocks: List[str] = []
            text_chunks: List[str] = []
            for kind, value in iter_paragraph_items(node):
                if kind == "text":
                    text_chunks.append(value)
                elif kind == "image":
                    text = escape_angle_brackets(normalize_ws("".join(text_chunks)))
                    if text:
                        admonition = convert_admonition(text)
                        blocks.append(admonition or text)
                    text_chunks = []
                    img_block = self._handle_image(value, slug)
                    if img_block:
                        blocks.append(img_block if isinstance(img_block, str) else "\n".join(img_block))
            remaining = escape_angle_brackets(normalize_ws("".join(text_chunks)))
            if remaining:
                admonition = convert_admonition(remaining)
                blocks.append(admonition or remaining)
            return blocks or None
        if name in {"h2", "h3", "h4", "h5"}:
            level = min(int(name[1:]), 6)
            level = max(level, 2)  # ensure at least level 2
            hashes = "#" * level
            heading_text = escape_angle_brackets(normalize_ws(convert_inline(node)))
            return f"{hashes} {heading_text}"
        if name == "ul":
            return convert_list(node, ordered=False, slug=slug, converter=self)
        if name == "ol":
            return convert_list(node, ordered=True, slug=slug, converter=self)
        if name == "img":
            return self._handle_image(node, slug)
        if name == "figure":
            img = node.find("img")
            if not img:
                return None
            block = self._handle_image(img, slug)
            caption_tag = node.find("figcaption")
            if caption_tag:
                caption_text = normalize_ws(convert_inline(caption_tag))
                if caption_text:
                    return f"{block}\n*{caption_text}*"
            return block
        if name == "pre":
            code = node.get_text()
            language = ""
            code_tag = node.find("code")
            if code_tag and code_tag.has_attr("class"):
                for cls in code_tag["class"]:
                    if cls.startswith("language-"):
                        language = cls.split("-", 1)[1]
                        break
            code_text = code if code_tag is None else code_tag.get_text()
            code_text = code_text.rstrip("\n")
            fence = f"```{language}\n{code_text}\n```"
            return fence
        if name == "code":
            return f"`{normalize_ws(node.get_text())}`"
        if name == "br":
            return "\n"
        if name == "hr":
            return None
        # Fallback: convert children
        blocks = []
        for child in node.children:
            child_block = self._convert_node(child, slug)
            if child_block:
                blocks.extend(child_block if isinstance(child_block, list) else [child_block])
        return blocks

    def _handle_image(self, img: Tag, slug: str) -> Optional[str]:
        src = img.get("src")
        if not src:
            return None
        src = src.strip()
        alt = img.get("alt", "")
        title = img.get("title", "")
        caption = title.strip() if title else ""
        new_filename = self._copy_image(src, slug)
        if not new_filename:
            return None
        image_path = f"/img/saas-platforms/{slug}/{new_filename}"
        parts = [f"![{alt}]({image_path})"]
        if caption and caption != alt:
            parts.append(f"*{caption}*")
        return "\n".join(parts)

    def _copy_image(self, src: str, slug: str) -> Optional[str]:
        parsed = urlparse(src)
        dest_dir = self.img_root / slug
        dest_dir.mkdir(parents=True, exist_ok=True)

        if parsed.scheme in {"http", "https"}:
            source_name = Path(parsed.path).name
            data = urlopen(src).read()
            normalized = normalize_filename(source_name)
            dest_path = self._unique_image_path(dest_dir, normalized)
            dest_path.write_bytes(data)
            self.images_copied += 1
            return dest_path.name

        # Local file
        relative = Path(unquote(parsed.path))
        source_path = (self.html_dir / relative).resolve()
        if not source_path.exists():
            self.summary["warnings"].append(f"Image not found: {source_path}")
            return None
        normalized = normalize_filename(source_path.name)
        dest_path = self._unique_image_path(dest_dir, normalized)
        shutil.copy2(source_path, dest_path)
        self.images_copied += 1
        return dest_path.name

    def _unique_image_path(self, dest_dir: Path, filename: str) -> Path:
        base, ext = splitext_lower(filename)
        key = (str(dest_dir), base)
        counter = self._image_name_counts.get(key, 0)
        while True:
            candidate = dest_dir / f"{base if counter == 0 else f'{base}-{counter}'}{ext}"
            if not candidate.exists():
                self._image_name_counts[key] = counter + 1
                return candidate
            counter += 1

    # ------------------------------------------------------------------
    # Summary
    # ------------------------------------------------------------------

    def _print_summary(self) -> None:
        updated = self.summary["updated"]
        warnings = self.summary["warnings"]
        log_lines = [
            f"Files updated: {len(updated)}",
            f"Images copied: {self.images_copied}",
        ]
        if updated:
            log_lines.append("Updated files:")
            log_lines.extend(f"  - {path}" for path in updated)
        if warnings:
            log_lines.append("Warnings:")
            log_lines.extend(f"  - {msg}" for msg in warnings)
        print("\n".join(log_lines))


# ----------------------------------------------------------------------
# Utility functions
# ----------------------------------------------------------------------

def normalize_ws(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def strip_text(text: str) -> str:
    return text.strip().replace("\xa0", "")


def normalize_key(value: str) -> str:
    if not value:
        return ""
    value = unicodedata.normalize("NFKD", value)
    value = value.lower()
    value = value.replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-")


def normalize_filename(name: str) -> str:
    base, ext = splitext_lower(name)
    base = normalize_key(base)
    if not base:
        base = "image"
    return f"{base}{ext}"


def splitext_lower(name: str) -> Tuple[str, str]:
    path = Path(name)
    stem = path.stem.lower()
    suffix = path.suffix.lower()
    return stem, suffix


def escape_angle_brackets(text: str) -> str:
    if not text:
        return text
    return text.replace("<", "&lt;").replace(">", "&gt;")


def convert_inline(tag: Tag) -> str:
    parts: List[str] = []
    for child in tag.children:
        if isinstance(child, NavigableString):
            parts.append(child)
            continue
        if not isinstance(child, Tag):
            continue
        name = child.name.lower()
        if name in {"strong", "b"}:
            parts.append(f"**{convert_inline(child)}**")
        elif name in {"em", "i"}:
            parts.append(f"*{convert_inline(child)}*")
        elif name == "code":
            parts.append(f"`{convert_inline(child)}`")
        elif name == "a":
            href = child.get("href")
            label = convert_inline(child)
            if href:
                href = href.strip()
                parts.append(f"[{label}]({href})")
            else:
                parts.append(label)
        elif name == "br":
            parts.append("\n")
        elif name == "img":
            continue
        else:
            parts.append(convert_inline(child))
    text = "".join(parts)
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text)
    return escape_angle_brackets(text)


def convert_admonition(text: str) -> Optional[str]:
    lower = text.lower()
    for kind in ("note", "warning", "tip"):
        prefix = f"{kind}:"
        if lower.startswith(prefix):
            body = text[len(prefix):].strip()
            body = body[1:].strip() if body.startswith("-") else body
            return f":::{kind}\n{body}\n:::"
    return None


def iter_paragraph_items(tag: Tag) -> Iterable[Tuple[str, object]]:
    for child in tag.children:
        if isinstance(child, NavigableString):
            yield ("text", str(child))
        elif isinstance(child, Tag):
            if child.name == "img":
                yield ("image", child)
            elif child.name == "figure" and child.find("img"):
                yield ("image", child.find("img"))
            elif child.find("img"):
                for item in iter_paragraph_items(child):
                    yield item
            else:
                yield ("text", convert_inline(child))


def convert_list(tag: Tag, ordered: bool, slug: str, converter: DocPopulator) -> str:
    lines: List[str] = []
    start = 1
    if ordered and tag.has_attr("start"):
        try:
            start = int(tag["start"])
        except ValueError:
            start = 1
    index = start
    for li in tag.find_all("li", recursive=False):
        primary_text = convert_inline_without_nested_lists(li)
        primary_text = normalize_ws(primary_text)
        bullet = f"{index}." if ordered else "-"
        nested_lists: List[str] = []
        image_blocks: List[str] = []
        for child in li.children:
            if isinstance(child, Tag) and child.name in {"ul", "ol"}:
                nested = convert_list(child, ordered=child.name == "ol", slug=slug, converter=converter)
                nested_lists.append(indent_text(nested, 2))
            elif isinstance(child, Tag):
                images = child.find_all("img") if child.name != "img" else [child]
                for img in images:
                    img_block = converter._handle_image(img, slug)
                    if img_block:
                        image_blocks.append(img_block)
        if primary_text:
            lines.append(f"{bullet} {primary_text}")
            for block in image_blocks:
                lines.append(indent_text(block, 2))
            lines.extend(nested_lists)
        else:
            if image_blocks:
                lines.extend(image_blocks)
            if nested_lists:
                lines.extend(nested_lists)
        if ordered:
            index += 1
    deduped: List[str] = []
    for line in lines:
        if not deduped or deduped[-1] != line:
            deduped.append(line)
    return "\n".join(deduped)


def convert_inline_without_nested_lists(li: Tag) -> str:
    parts: List[str] = []
    for child in li.children:
        if isinstance(child, NavigableString):
            parts.append(str(child))
        elif isinstance(child, Tag):
            if child.name in {"ul", "ol"}:
                continue
            parts.append(convert_inline(child))
    text = "".join(parts)
    return escape_angle_brackets(text)


def indent_text(text: str, spaces: int) -> str:
    indent = " " * spaces
    return "\n".join(indent + line if line else line for line in text.splitlines())


def wrap_json_blocks(text: str) -> str:
    lines = text.splitlines()
    result: List[str] = []
    buffer: List[str] = []
    in_json = False
    for line in lines:
        stripped = line.strip()
        if not in_json:
            if stripped == "{":
                if result and result[-1] != "":
                    result.append("")
                buffer = [line]
                in_json = True
            else:
                result.append(line)
        else:
            buffer.append(line)
            if stripped == "}":
                result.append("```json")
                result.extend(buffer)
                result.append("```")
                in_json = False
                buffer = []
    if buffer:
        # Flush unfinished buffer without wrapping
        result.extend(buffer)
    return "\n".join(result)


def split_front_matter(content: str) -> Tuple[Dict[str, str], str]:
    if not content.startswith("---\n"):
        return {}, content
    end = content.find("\n---", 4)
    if end == -1:
        return {}, content
    fm_block = content[4:end]
    body = content[end + 4 :]
    front_matter: Dict[str, str] = {}
    current_key: Optional[str] = None
    current_lines: List[str] = []
    for line in fm_block.splitlines():
        if line.startswith(" ") or line.startswith("\t"):
            if current_key is not None:
                current_lines.append(line.strip())
            continue
        if ":" in line:
            if current_key is not None:
                front_matter[current_key] = " ".join(current_lines).strip()
            key, value = line.split(":", 1)
            current_key = key.strip()
            current_lines = [value.strip().strip('"')]
    if current_key is not None:
        front_matter[current_key] = " ".join(current_lines).strip()
    return front_matter, body.lstrip("\n")


def combine_front_matter(front_matter: Dict[str, str], body: str) -> str:
    if not front_matter:
        return body
    lines = ["---"]
    for key, value in front_matter.items():
        if value and not value.startswith("'") and not value.startswith('"') and ":" not in value:
            lines.append(f"{key}: {value}")
        else:
            lines.append(f"{key}: \"{value}\"")
    lines.append("---\n")
    if body.startswith("\n"):
        return "\n".join(lines) + body
    return "\n".join(lines) + "\n" + body


def replace_placeholder(body: str, replacement: str) -> str:
    pattern = re.compile(r"\nPlaceholder:[^\n]*\n", re.IGNORECASE)
    match = pattern.search(body)
    if not match:
        return body
    before = body[: match.start()]
    after = body[match.end() :]
    if not before.endswith("\n"):
        before += "\n"
    replacement = replacement.rstrip() + "\n"
    return before + replacement + after.lstrip("\n")


# ----------------------------------------------------------------------
# CLI
# ----------------------------------------------------------------------

def parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description=textwrap.dedent(
            """Populate SaaS platform documentation from the shared HTML template."""
        ),
    )
    parser.add_argument("--html-source", required=True, type=Path, help="Path to the HTML source file")
    parser.add_argument("--docs-root", required=True, type=Path, help="Docs root containing MDX files")
    parser.add_argument("--img-root", required=True, type=Path, help="Static image root directory")
    return parser.parse_args(argv)


def main(argv: Optional[Sequence[str]] = None) -> None:
    args = parse_args(argv)
    populator = DocPopulator(html_source=args.html_source, docs_root=args.docs_root, img_root=args.img_root)
    populator.run()


if __name__ == "__main__":
    main()
