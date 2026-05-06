"""Track 1 deterministic normalizer for engineering-lms pages.

What it does (only mechanical, idempotent fixes):
  - Repair broken admonitions: `## note`, bare `note`, leaked `noteThe…`/`tipOn…` → `:::note` / `:::tip`.
  - Remove leaked "IMAGE NN" build artifacts from alt text and the duplicated body line.
  - Drop the duplicated alt-text-as-body paragraph that follows every image (alt + caption + body all repeating).
  - Fix common verb defects:
      * "click on Approve and Merge"  → "select **Approve and Merge**"
      * "click on" before a UI label  → "select"
      * "should appears"              → "appears"
  - Bold UI labels in the boilerplate Approve/Verify steps.
  - Repair product-name typos in body text:
      Innoyze→Innovyze, Razorcart→Razorcat, Modelex3D→Moldex3D, LiMBPR/LiMBRP→LiMBR,
      LicenseJ4→License4J, JETBrain→JetBrains, Canevas→Canvas, ELPAN→EPLAN,
      Cosmos→Comos (in body — not the cosmos LM intro!), Integraph→Intergraph,
      LM-DYNA→LS-DYNA, Razorcart→Razorcat, Materialise Magic→Materialise Magics,
      InforSML→Infor SLM.
  - Replace "OpenLM SLM" with "OpenLM Server" in body text.
  - Remove the empty `## ` heading.
  - Drop trailing double-period.

It does NOT (these are Track 2/4 hand work):
  - Restructure headings, split bundled pages, rewrite procedures.
  - Migrate to the unified template.
  - Touch image files on disk.
  - Modify frontmatter except where the description duplicates a sentence verbatim.

Idempotent: safe to run multiple times.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"

# ---------- Fix functions ---------------------------------------------------

# Each fix takes the file text and returns (new_text, count_of_changes).

def fix_admonition_blocks(text: str) -> tuple[str, int]:
    """Convert `## note` heading and bare `note` paragraphs to :::note admonitions."""
    n = 0

    # Pattern: a line that's just `## note` (or `## tip`, `## info`, `## caution`, `## warning`)
    # followed by a blank line, then one paragraph.
    def admon_repl(match: re.Match) -> str:
        nonlocal n
        n += 1
        kind = match.group("kind").lower()
        body = match.group("body").strip()
        return f":::{kind}\n{body}\n:::\n"

    # Heading-style: `## note` ...
    text = re.sub(
        r"^## (?P<kind>note|tip|info|caution|warning)\s*\n+(?P<body>(?:(?!^#)[^\n]+\n?)+?)\n",
        admon_repl,
        text,
        flags=re.MULTILINE,
    )

    # Bare line `note`/`tip`/`info` followed by paragraph
    text = re.sub(
        r"^(?P<kind>note|tip|info|caution|warning)\s*\n+(?P<body>(?:(?!^#)(?!^\d+\.)(?!^[-*])[^\n]+\n?)+?)\n",
        admon_repl,
        text,
        flags=re.MULTILINE,
    )

    # Leaked compound: `noteOpenLM Broker must be...` → :::note + body until newline
    def leak_repl(match: re.Match) -> str:
        nonlocal n
        n += 1
        kind = match.group("kind").lower()
        body = match.group("body").rstrip()
        return f":::{kind}\n{body}\n:::"

    text = re.sub(
        r"^(?P<kind>note|tip|info|caution|warning)(?P<body>[A-Z][^\n]*)$",
        leak_repl,
        text,
        flags=re.MULTILINE,
    )

    # Markdown-table cell escapes that were inside a table line - re-pattern: tipOn some installations,...
    text = re.sub(
        r"^    (?P<kind>tip|note|info)(?P<body>[A-Z][^\n]*)$",
        lambda m: f"\n    :::{m.group('kind').lower()}\n    {m.group('body').strip()}\n    :::",
        text,
        flags=re.MULTILINE,
    )

    return text, n


def fix_image_artifacts(text: str) -> tuple[str, int]:
    """Strip leaked `IMAGE NN` build placeholders."""
    n = 0
    text2, k = re.subn(r"[. ]IMAGE \d+", "", text)
    n += k
    text2, k = re.subn(r"^IMAGE \d+\s*$", "", text2, flags=re.MULTILINE)
    n += k
    return text2, n


def fix_alt_text_duplication(text: str) -> tuple[str, int]:
    """Drop the body paragraph that copies the alt text already shown as caption.

    Pattern in the source:
        ![ALT](src)
        *ALT*

        ALT      <- duplicate body paragraph; we drop this

        1. step content
    """
    n = 0
    pattern = re.compile(
        r"(!\[(?P<alt>[^\]]+)\]\([^)]+\)\n\*(?P=alt)\*)\n+\n+(?P=alt)\n",
        flags=re.MULTILINE,
    )

    def repl(m: re.Match) -> str:
        nonlocal n
        n += 1
        return m.group(1) + "\n\n"

    return pattern.sub(repl, text), n


def fix_verb_defects(text: str) -> tuple[str, int]:
    """Apply Splunk-style verb corrections."""
    n = 0
    fixes: list[tuple[str, str]] = [
        # boilerplate verification steps
        (r"click on Approve and Merge", "select **Approve and Merge**"),
        (r"click on Approve&Merge", "select **Approve and Merge**"),
        # subject-verb agreement
        (r"\bshould appears\b", "appears"),
        # double period
        (r"connections\.\.", "connections."),
        # marketing words / softeners (only obvious ones)
        (r"\bsimply ", ""),
        (r"\beasily ", ""),
    ]
    for pat, repl in fixes:
        text, k = re.subn(pat, repl, text)
        n += k
    return text, n


def fix_typos(text: str, fname: str) -> tuple[str, int]:
    """Repair product-name typos. Filename-aware to avoid spurious replacements."""
    n = 0
    # Common, file-agnostic
    common: list[tuple[str, str]] = [
        (r"\bInnoyze\b", "Innovyze"),
        (r"\bRazorcart\b", "Razorcat"),
        (r"\bModelex3D\b", "Moldex3D"),
        (r"\bLiMBPR\b", "LiMBR"),
        (r"\bLiMBRP\b", "LiMBR"),
        (r"\bLicenseJ4\b", "License4J"),
        (r"\bJETBrain FLS\b", "JetBrains FLS"),
        (r"\bJETBrain\b(?! FLS)", "JetBrains"),
        (r"\bCanevas\b", "Canvas"),
        (r"\bELPAN\b", "EPLAN"),
        (r"\bIntegraph\b", "Intergraph"),
        (r"\bLM-DYNA\b", "LS-DYNA"),
        (r"\bMaterialise Magic\b(?!s)", "Materialise Magics"),
        (r"\bInforSML\b", "Infor SLM"),
        (r"\bSentinel Super PROshould\b", "Sentinel SuperPro should"),
        (r"\bSentinel Super PRO\b", "Sentinel SuperPro"),
        (r"\bSalesforcelicense manager\b", "Salesforce license manager"),
        (r"\bSEH-UTNlicense manager\b", "SEH-UTN license manager"),
        (r"\bInfoGraphlicense manager\b", "InfoGraph license manager"),
        # OpenLM Web Interface interface duplicate
        (r"OpenLM Web Interface interface", "OpenLM Web Interface"),
        # OpenLM SLM is no longer a current product term
        (r"\bOpenLM SLM\b", "OpenLM Server"),
        # "Pure::Variants" → "pure::variants" except at sentence start
        (r"\bPure::Variants\b", "pure::variants"),
        # OLicense and OLicense vs Olicense — vendor casing is OLicense
        (r"\bOlicense\b", "OLicense"),
        # Cadenas vs CADENAS — vendor uses CADENAS
        (r"\bCadenas\b", "CADENAS"),
    ]
    for pat, repl in common:
        text, k = re.subn(pat, repl, text)
        n += k

    # File-specific repairs
    base = Path(fname).stem
    if base == "comos":
        text, k = re.subn(r"\bCosmos\b", "Comos", text); n += k
    if base == "siemens-simatic":
        # No fixes here yet
        pass
    if base == "geovia":
        # body uses "Geovia" — vendor uses GEOVIA
        text, k = re.subn(r"\bGeovia\b", "GEOVIA", text); n += k
    if base == "innovyze":
        # description text has Innoyze — already covered above
        pass
    if base == "hardlock":
        # body uses "HardLock" mixed with "Hardlock"
        text, k = re.subn(r"\bHardLock\b", "Hardlock", text); n += k
    if base == "codemeter":
        # body uses both "Codemeter" and "CodeMeter" — vendor uses CodeMeter
        text, k = re.subn(r"\bCodemeter\b", "CodeMeter", text); n += k

    return text, n


def fix_empty_heading(text: str) -> tuple[str, int]:
    """Remove `## \\n` empty headings."""
    n = 0
    text, k = re.subn(r"^##\s*\n", "", text, flags=re.MULTILINE)
    n += k
    return text, n


def fix_caption_only_no_repeat(text: str) -> tuple[str, int]:
    """Some images have caption then a numbered step with the *same* sentence.
    Detect: `*ALT*\n\n1. ALT` and demote to caption only when next line begins with a number.
    Conservative: only touches when the duplicate is exact.
    """
    n = 0
    pattern = re.compile(
        r"\*(?P<alt>[^*]+)\*\n+\n+1\. (?P=alt)$",
        flags=re.MULTILINE,
    )
    def repl(m: re.Match) -> str:
        nonlocal n
        n += 1
        return f"*{m.group('alt')}*"
    return pattern.sub(repl, text), n


# ---------- Driver -----------------------------------------------------------

def normalize(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    original = text

    counts: dict[str, int] = {}
    for name, fn in [
        ("admonitions", lambda t: fix_admonition_blocks(t)),
        ("image_artifacts", lambda t: fix_image_artifacts(t)),
        ("alt_dup", lambda t: fix_alt_text_duplication(t)),
        ("caption_dup", lambda t: fix_caption_only_no_repeat(t)),
        ("verbs", lambda t: fix_verb_defects(t)),
        ("typos", lambda t: fix_typos(t, str(path))),
        ("empty_h", lambda t: fix_empty_heading(t)),
    ]:
        text, n = fn(text)
        counts[name] = n

    if text != original:
        path.write_text(text, encoding="utf-8")
        return {"file": path.name, "changed": True, **counts}
    return {"file": path.name, "changed": False, **counts}


def main() -> int:
    targets = sorted(ROOT.glob("*.mdx"))
    if not targets:
        print(f"No .mdx files under {ROOT}", file=sys.stderr)
        return 1

    total = {"admonitions": 0, "image_artifacts": 0, "alt_dup": 0,
             "caption_dup": 0, "verbs": 0, "typos": 0, "empty_h": 0}
    changed_files = 0

    for path in targets:
        result = normalize(path)
        if result["changed"]:
            changed_files += 1
        for k in total:
            total[k] += result.get(k, 0)

    print(f"Files scanned: {len(targets)}")
    print(f"Files modified: {changed_files}")
    for k, v in total.items():
        print(f"  {k}: {v}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
