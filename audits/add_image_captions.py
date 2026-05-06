"""Add centered-italic captions under any image that doesn't already have one.

Convention (from src/css/custom.css):
    .theme-doc-markdown p > img + em { display: block; text-align: center; ... }

That CSS rule centers an italic line that immediately follows an image inside the same
paragraph. The on-disk markdown shape is:

    ![Alt text](path/to/image.png)
    *Alt text*

with NO blank line between the image and the italic.

What this script does:

  1. For every `![alt](src)` line, check the very next non-empty line. If it is an
     italic-only line (`*caption*`), the image already has a caption — skip.
  2. Otherwise, insert `*alt*` on the next line, preserving the image's indentation,
     so the italic sits in the same paragraph context.
  3. If the alt text is empty, skip (defensive — empty alt indicates a decorative
     image; we don't fabricate text).

Skip rules:
  - Frontmatter (between the first two `---` lines).
  - Fenced code blocks (between ``` markers).

Idempotent. Safe to re-run.
"""

from __future__ import annotations

import re
from pathlib import Path

REPO = Path(__file__).parent.parent
SCOPES = [
    REPO / "docs/cloud/data-collection/connect-license-managers",
    REPO / "i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers",
]

IMG_RE = re.compile(r"!\[(?P<alt>[^\]]*)\]\((?P<src>[^)]+)\)")
CAPTION_RE = re.compile(r"^\s*\*[^*\n]+\*\s*$")
FRONTMATTER_RE = re.compile(r"^---\n.*?\n---\n", re.DOTALL)


def process(text: str) -> tuple[str, int]:
    fm_match = FRONTMATTER_RE.match(text)
    if fm_match:
        fm = text[: fm_match.end()]
        body = text[fm_match.end():]
    else:
        fm = ""
        body = text

    lines = body.splitlines()
    out: list[str] = []
    in_fence = False
    fence_marker: str | None = None
    n_added = 0

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.lstrip()
        # Toggle fence state
        if stripped.startswith("```") or stripped.startswith("~~~"):
            marker = stripped[:3]
            if not in_fence:
                in_fence = True
                fence_marker = marker
            elif fence_marker and stripped.startswith(fence_marker):
                in_fence = False
                fence_marker = None
            out.append(line)
            i += 1
            continue
        if in_fence:
            out.append(line)
            i += 1
            continue

        m = IMG_RE.search(line)
        if not m:
            out.append(line)
            i += 1
            continue

        # Image found. Check next line for an italic caption.
        next_line = lines[i + 1] if i + 1 < len(lines) else ""
        if CAPTION_RE.match(next_line):
            out.append(line)
            i += 1
            continue

        alt = m.group("alt").strip()
        if not alt:
            # Empty alt = decorative image; don't fabricate a caption.
            out.append(line)
            i += 1
            continue

        # Determine indentation from the image line so the italic lives in the same
        # paragraph context (important when the image is inside a list item).
        indent_match = re.match(r"^(\s*)", line)
        indent = indent_match.group(1) if indent_match else ""

        out.append(line)
        out.append(f"{indent}*{alt}*")
        n_added += 1
        i += 1

    # Preserve a trailing newline if the original had one.
    new_body = "\n".join(out)
    if body.endswith("\n") and not new_body.endswith("\n"):
        new_body += "\n"
    return fm + new_body, n_added


def main() -> int:
    total_files = 0
    changed_files = 0
    total_added = 0
    for scope in SCOPES:
        if not scope.exists():
            continue
        for p in sorted(list(scope.rglob("*.mdx")) + list(scope.rglob("*.md"))):
            total_files += 1
            original = p.read_text(encoding="utf-8")
            new_text, n = process(original)
            if n:
                p.write_text(new_text, encoding="utf-8")
                changed_files += 1
                total_added += n
    print(f"Files scanned:  {total_files}")
    print(f"Files modified: {changed_files}")
    print(f"Captions added: {total_added}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
