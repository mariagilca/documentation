"""SaaS Track 1: deterministic normalizer for the saas-platforms section.

Mechanical, idempotent fixes:
  - Replace `OpenLM SLM` with `OpenLM Cloud Broker` (or drop the dual-component sentence
    and emit only Cloud Broker).
  - Strip Google Docs tracker URLs (`https://www.google.com/url?q=…&sa=D&...`) by
    extracting and URL-decoding the `q=` parameter.
  - Repair HTML entities in body text: `&gt;` → `>`, `&lt;` → `<`, `&amp;` → `&`.
  - Drop the orphan `Vendor Usage Monitoring` subtitle paragraph immediately under H1.
  - Drop the marketing-filler sentence "This is similar to monitoring other ...".
  - Remove the leaked Google Docs editor comment block (`[a]…`, `[b]…`).
  - Remove the "Image or attachment is not accessible" lines.
  - Fix step-numbering glitches: `1.NoSpace` → `1. NoSpace`; orphan `**` after labels.
  - Fix typos: `Compagny` → `Company`, `Linkedin` → `LinkedIn`, `OpenLM Components:**` → `OpenLM components:`.
  - Drop the legacy `learnMoreLink:` field from frontmatter (matches the engineering-lms decision).

Does NOT (those are Track 4 hand work):
  - Restructure headings.
  - Rewrite procedure steps.
  - Migrate to the unified template.
  - Touch images on disk.

Idempotent.
"""

from __future__ import annotations

import re
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/saas-platforms"


# ---------- Frontmatter -----------------------------------------------------

def drop_learn_more_link(text: str) -> tuple[str, int]:
    new_text = re.sub(r"^learnMoreLink:[^\n]*\n", "", text, flags=re.MULTILINE)
    return new_text, 1 if new_text != text else 0


# ---------- Body fixes ------------------------------------------------------

GOOGLE_REDIRECT_RE = re.compile(
    r"https://www\.google\.com/url\?q=([^&\)\s]+)(?:&[^&\)\s]+)*",
)


def strip_google_redirects(text: str) -> tuple[str, int]:
    """Replace `https://www.google.com/url?q=DEST&...` with the URL-decoded DEST."""
    n = 0

    def repl(m: re.Match) -> str:
        nonlocal n
        n += 1
        try:
            decoded = urllib.parse.unquote(m.group(1))
        except Exception:
            decoded = m.group(1)
        # Some destinations contain a trailing %23section anchor; keep them.
        return decoded

    return GOOGLE_REDIRECT_RE.sub(repl, text), n


def fix_html_entities(text: str) -> tuple[str, int]:
    """Replace `&gt;`, `&lt;`, `&amp;` with their literal characters in body text.
    Skip code blocks and inline code spans to be safe."""
    out_parts: list[str] = []
    n = 0
    in_code_block = False
    i = 0
    lines = text.splitlines(keepends=True)
    for line in lines:
        # Toggle on fenced code block markers
        if line.lstrip().startswith("```"):
            in_code_block = not in_code_block
            out_parts.append(line)
            continue
        if in_code_block:
            out_parts.append(line)
            continue
        # Replace outside code blocks; preserve inline code by splitting on backticks.
        segments = re.split(r"(`[^`]*`)", line)
        rebuilt = []
        for seg in segments:
            if seg.startswith("`") and seg.endswith("`"):
                rebuilt.append(seg)
            else:
                old = seg
                seg = seg.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&")
                if seg != old:
                    n += 1
                rebuilt.append(seg)
        out_parts.append("".join(rebuilt))
    return "".join(out_parts), n


def replace_openlm_slm(text: str) -> tuple[str, int]:
    """Drop `OpenLM SLM`. Where it appears as part of "OpenLM Cloud Broker and OpenLM SLM are required",
    collapse to "OpenLM Cloud Broker, approved in [Broker Hub](...)" pattern."""
    n = 0
    # The full boilerplate line variants.
    patterns = [
        (
            r"OpenLM Components: OpenLM Cloud Broker and OpenLM SLM are required\.\s*",
            "OpenLM components: OpenLM Cloud Broker, approved in [Broker Hub](/cloud/data-collection/broker-hub).",
        ),
        (
            r"OpenLM Components:\*\*?\s*OpenLM Cloud Broker is required for data collection\. You'll also need OpenLM SLM \(Software License Manager\) for basic monitoring\.",
            "OpenLM components: OpenLM Cloud Broker, approved in [Broker Hub](/cloud/data-collection/broker-hub).",
        ),
        (
            r"OpenLM components: OpenLM Cloud Broker and OpenLM SLM are required\. For automation, License Access Control \(LAC\) is optional[^.]*\.",
            "OpenLM components: OpenLM Cloud Broker, approved in [Broker Hub](/cloud/data-collection/broker-hub). For automation, License Access Control (LAC) is optional.",
        ),
    ]
    for pat, replacement in patterns:
        new_text, k = re.subn(pat, replacement, text)
        n += k
        text = new_text
    # Catch-all: any remaining "OpenLM SLM" → "OpenLM Cloud Broker"
    new_text, k = re.subn(r"\bOpenLM SLM\b", "OpenLM Cloud Broker", text)
    n += k
    text = new_text
    return text, n


def drop_orphan_h1_subtitle(text: str) -> tuple[str, int]:
    """`# Vendor\nVendor Usage Monitoring\n\n` → `# Vendor\n\n`. The 'Vendor Usage Monitoring'
    paragraph is a leftover from the Google Docs source — the H1 already names the page."""
    pattern = re.compile(
        r"^(# (?P<vendor>[^\n]+))\n(?P=vendor) Usage Monitoring\s*\n",
        flags=re.MULTILINE,
    )
    new_text, n = pattern.subn(lambda m: m.group(1) + "\n", text)
    if n == 0:
        # Variant with extra punctuation/whitespace
        pattern2 = re.compile(
            r"^# (?P<vendor>[A-Za-z0-9 ./()&-]+?)\n(?P<subtitle>[A-Za-z0-9 .,()&-]+ Usage Monitoring)\s*\n",
            flags=re.MULTILINE,
        )
        new_text, n = pattern2.subn(lambda m: f"# {m.group('vendor')}\n", text)
    return new_text, n


def drop_marketing_filler(text: str) -> tuple[str, int]:
    """Drop "This is similar to monitoring other ..." / "similar to monitoring other ..." sentences.
    These are generic comparisons that add no procedural information."""
    n = 0
    # Drop the standalone sentence at the end of an About paragraph.
    new_text = re.sub(
        r"\s*(?:This is s|S)imilar to(?:\s+monitoring)?\s+(?:other\s+)?[^.]*?(?:like|such as)[^.]*\.",
        "",
        text,
    )
    if new_text != text:
        n += 1
        text = new_text
    new_text = re.sub(
        r"\s*This is similar to[^.]+\.",
        "",
        text,
    )
    if new_text != text:
        n += 1
        text = new_text
    return text, n


def drop_gdocs_comments(text: str) -> tuple[str, int]:
    """Drop trailing `[a]…`, `[b]…` Google Docs editor comments."""
    n = 0
    new_text = re.sub(
        r"\n\[[a-z]\][^\n]*(?:\n[^\[\n][^\n]*)*\s*\Z",
        "\n",
        text,
        flags=re.MULTILINE,
    )
    if new_text != text:
        n += 1
        text = new_text
    return text, n


def drop_image_inaccessible(text: str) -> tuple[str, int]:
    """Drop "Image or attachment is not accessible." lines."""
    new_text = re.sub(
        r"^Image or attachment is not accessible\.?\s*\n",
        "",
        text,
        flags=re.MULTILINE,
    )
    n = 1 if new_text != text else 0
    return new_text, n


def fix_step_glitches(text: str) -> tuple[str, int]:
    """Add space after `1.NoSpace`. Drop orphan `**` after `Components:**`."""
    n = 0
    new_text, k = re.subn(r"^(\d+)\.([A-Z])", r"\1. \2", text, flags=re.MULTILINE)
    n += k
    text = new_text
    new_text, k = re.subn(r":\*\*\s+", ": ", text)
    n += k
    text = new_text
    return text, n


def fix_typos(text: str, fname: str) -> tuple[str, int]:
    n = 0
    common: list[tuple[str, str]] = [
        (r"\bCompagny\b", "Company"),
        (r"\bLinkedin\b", "LinkedIn"),
        (r"\bAtlas MongoDb\b", "Atlas MongoDB"),
        (r"OpenLM Web Interface interface", "OpenLM Web Interface"),
    ]
    for pat, rep in common:
        text, k = re.subn(pat, rep, text)
        n += k
    base = Path(fname).stem
    if base == "monday":
        text, k = re.subn(r"\bMonday\.com\b", "monday.com", text); n += k
    return text, n


def drop_blank_runs(text: str) -> tuple[str, int]:
    new_text = re.sub(r"\n{3,}", "\n\n", text)
    return new_text, 1 if new_text != text else 0


# ---------- Driver -----------------------------------------------------------

def normalize(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    original = text

    counts: dict[str, int] = {}
    for name, fn in [
        ("learn_more_link", lambda t: drop_learn_more_link(t)),
        ("google_redirects", lambda t: strip_google_redirects(t)),
        ("html_entities", lambda t: fix_html_entities(t)),
        ("openlm_slm", lambda t: replace_openlm_slm(t)),
        ("orphan_subtitle", lambda t: drop_orphan_h1_subtitle(t)),
        ("marketing_filler", lambda t: drop_marketing_filler(t)),
        ("gdocs_comments", lambda t: drop_gdocs_comments(t)),
        ("image_inaccessible", lambda t: drop_image_inaccessible(t)),
        ("step_glitches", lambda t: fix_step_glitches(t)),
        ("typos", lambda t: fix_typos(t, str(path))),
        ("blank_runs", lambda t: drop_blank_runs(t)),
    ]:
        text, n = fn(text)
        counts[name] = n

    if text != original:
        path.write_text(text, encoding="utf-8")
        return {"file": path.name, "changed": True, **counts}
    return {"file": path.name, "changed": False, **counts}


def main() -> int:
    targets = sorted(ROOT.glob("*.mdx"))
    total = {k: 0 for k in [
        "learn_more_link", "google_redirects", "html_entities", "openlm_slm",
        "orphan_subtitle", "marketing_filler", "gdocs_comments", "image_inaccessible",
        "step_glitches", "typos", "blank_runs",
    ]}
    changed = 0
    for p in targets:
        result = normalize(p)
        if result["changed"]:
            changed += 1
        for k in total:
            total[k] += result.get(k, 0)
    print(f"Files scanned: {len(targets)}")
    print(f"Files modified: {changed}")
    for k, v in total.items():
        print(f"  {k}: {v}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
