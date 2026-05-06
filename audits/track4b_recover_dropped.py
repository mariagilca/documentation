"""Track 4b recovery: re-inject content sections that the migration dropped.

The trailing-block regex was too aggressive on files where a substantive section sat
*between* the legacy 'Configure OpenLM Platform' heading and the 'Verifying' heading,
or was duplicated as a top-level `##` after them. We compare each current file to its
git HEAD original and recover any `## headings` whose content is NOT already in the
new file.

The recovered section is inserted before the canonical "Approve … in OpenLM Platform"
block. The reviewer should still read each restored section to confirm it lands in the
right place.
"""

from __future__ import annotations

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"
SKIP = {"index.mdx", "amp.mdx", "arcgis-online.mdx", "flexera-flexnet-flexlm.mdx", "autodesk-cloud.mdx"}

# Boilerplate headings whose content does not need to be preserved.
BOILERPLATE = {
    "requirements",
    "prerequisites",
    "scope",
    "general",
    "monitoring capabilities",
    "monitoring capabilities and features",
    "monitoring capabilities and features",
    "openlm broker configuration",
    "broker configuration",
    "configuring through the broker ui",
    "configuring openlm broker",
    "configure openlm broker",
    "use openlm broker",
    "automatic broker configuration",
    "broker ui configuration",
    "configure openlm platform",
    "openlm configuration",
    "configure openlm server",
    "openlm server configuration",
    "verifying the configuration",
    "verify the integration",
    "approve in openlm platform",
    "manual configuration",
    "manual configuration (broker web ui)",
    "manual broker configuration",
    "broker uss configuration",
    "configuring broker (manual setup)",
    "configuring broker",
    "remote access settings troubleshoot",
    "interfacing with openlm server only",
    "interfacing with openlm server + broker",
    "configure dsls log files",
    "locate the jetbrains fls token",
    "manual configuration",
}


def get_original(rel_path: str) -> str | None:
    try:
        out = subprocess.check_output(
            ["git", "show", f"HEAD:docs/cloud/data-collection/connect-license-managers/engineering-lms/{rel_path}"],
            stderr=subprocess.DEVNULL,
        )
        return out.decode("utf-8")
    except subprocess.CalledProcessError:
        return None


def parse_h2_sections(text: str) -> dict[str, str]:
    """Return a mapping of normalized H2 heading → its body, until the next H2."""
    sections: dict[str, str] = {}
    pattern = re.compile(r"^##\s+(?P<title>[^\n]+?)\s*$", re.MULTILINE)
    matches = list(pattern.finditer(text))
    for i, m in enumerate(matches):
        title = m.group("title").strip().lower()
        # normalize - strip leading "approve" + trailing "in openlm platform" so we
        # treat "Approve XYZ in OpenLM Platform" all as the same boilerplate slot
        if title.startswith("approve ") and title.endswith(" in openlm platform"):
            title = "approve in openlm platform"
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = text[m.end():end].strip()
        sections[title] = body
    return sections


def recover_content_for(p: Path) -> bool:
    rel = p.name
    if rel in SKIP:
        return False

    original = get_original(rel)
    if original is None:
        return False

    current = p.read_text(encoding="utf-8")

    orig_sections = parse_h2_sections(original)
    cur_sections = parse_h2_sections(current)

    # Section is recoverable iff it's in the original, NOT boilerplate, and the
    # content is not already present in the current file.
    to_recover: list[tuple[str, str]] = []
    for title, body in orig_sections.items():
        if title in BOILERPLATE:
            continue
        # Title-with-product (like "approve in openlm platform") is normalized; skip
        if title == "approve in openlm platform":
            continue
        if title in cur_sections:
            continue
        # If the body content is substantial (>200 chars or contains code/list)
        if len(body) < 80:
            continue
        # Find the original heading (preserve casing)
        orig_heading = ""
        for m in re.finditer(r"^##\s+([^\n]+?)\s*$", original, re.MULTILINE):
            if m.group(1).strip().lower() == title:
                orig_heading = m.group(1).strip()
                break
        if not orig_heading:
            orig_heading = title.title()
        to_recover.append((orig_heading, body))

    if not to_recover:
        return False

    # Insert before the canonical Approve heading
    insertion_point = re.search(
        r"^##\s+Approve\s+.+\s+in OpenLM Platform\s*$",
        current,
        re.MULTILINE,
    )
    if not insertion_point:
        return False

    block = ""
    for heading, body in to_recover:
        block += f"\n## {heading}\n\n{body}\n"
    new_text = current[: insertion_point.start()] + block + "\n" + current[insertion_point.start():]
    p.write_text(new_text, encoding="utf-8")
    print(f"Recovered {len(to_recover)} section(s) in {rel}: {[h for h, _ in to_recover]}")
    return True


def main() -> int:
    targets = sorted(ROOT.glob("*.mdx"))
    n = 0
    for p in targets:
        if recover_content_for(p):
            n += 1
    print(f"Recovered content in {n} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
