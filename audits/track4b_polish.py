"""Final polish pass.

Cleans residual artefacts that survived the migration and recovery passes:
  1. Empty H3 headings ("### Foo\n\n##" with no content between).
  2. Legacy "### Verifying the configuration" blocks that survived inside recovered
     sections — the canonical "## Verify the integration" exists later, so drop them.
  3. Free-floating "Note: It can take up to 3 minutes…" lines that were created during
     content recovery (older boilerplate); the canonical :::note already exists.
  4. The "- Open Broker UI" bullet that should be the first numbered step.
  5. Add blank line after `## Heading` lines that are immediately followed by content.

Idempotent.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"
SKIP = {"index.mdx", "amp.mdx", "arcgis-online.mdx", "flexera-flexnet-flexlm.mdx", "autodesk-cloud.mdx"}


def remove_empty_h3(body: str) -> tuple[str, bool]:
    """Drop `### Foo` followed only by whitespace until the next `## ` or end."""
    new_body = re.sub(
        r"\n###\s+[^\n]+\n+(?=##\s)",
        "\n",
        body,
    )
    return new_body, new_body != body


def remove_legacy_verifying_block(body: str) -> tuple[str, bool]:
    """Drop `### Verifying the configuration` blocks when the canonical
    `## Verify the integration` exists later."""
    has_canonical = re.search(r"^##\s+Verify the integration\s*$", body, re.MULTILINE)
    if not has_canonical:
        return body, False
    new_body = re.sub(
        r"\n###\s+Verifying the configuration\s*\n.*?(?=\n##\s)",
        "\n",
        body,
        flags=re.DOTALL,
    )
    return new_body, new_body != body


def remove_legacy_3min_note(body: str) -> tuple[str, bool]:
    """Drop free-floating `Note: It can take up to 3 minutes…` lines."""
    new_body = re.sub(
        r"\n+(?:>\s*)?Note:\s*It can take up to 3 minutes[^\n]*\n",
        "\n",
        body,
    )
    return new_body, new_body != body


def fix_bullet_should_be_step(body: str) -> tuple[str, bool]:
    """Inside a `## Configure OpenLM Broker` (or sub-section), if the *first* item is a
    bullet `- Open Broker UI…` followed by `1. …` numbered steps, promote the bullet to step 1."""
    pattern = re.compile(
        r"(##(?:#)?\s+(?:Configure OpenLM Broker|Automatic Broker configuration|Manual configuration|Manual Broker configuration|Configuring through the Broker UI|Add manually|Option \d+ — [^\n]+)\s*\n+(?:[^\n]*\n)*?)"
        r"-\s+(Open (?:the )?Broker UI[^\n]*)\n+(?=\n*1\.)",
    )
    def repl(m: re.Match) -> str:
        return m.group(1) + "1. " + m.group(2) + "\n\n"
    new_body = pattern.sub(repl, body)
    return new_body, new_body != body


def add_blank_after_heading(body: str) -> tuple[str, bool]:
    """`## Foo\n| header |` → `## Foo\n\n| header |`."""
    new_body = re.sub(
        r"^(##\s+[^\n]+)\n(?=[^\n#])",
        r"\1\n\n",
        body,
        flags=re.MULTILINE,
    )
    return new_body, new_body != body


def collapse_blank_lines(body: str) -> tuple[str, bool]:
    new_body = re.sub(r"\n{3,}", "\n\n", body)
    return new_body, new_body != body


def main() -> int:
    n = 0
    for p in sorted(ROOT.glob("*.mdx")):
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8")
        original = text

        fm_match = re.match(r"^---\n.*?\n---\n", text, re.DOTALL)
        if not fm_match:
            continue
        fm = text[: fm_match.end()]
        body = text[fm_match.end():]

        body, _ = remove_empty_h3(body)
        body, _ = remove_legacy_verifying_block(body)
        body, _ = remove_legacy_3min_note(body)
        body, _ = fix_bullet_should_be_step(body)
        body, _ = add_blank_after_heading(body)
        body, _ = collapse_blank_lines(body)

        text = fm + body
        if text != original:
            p.write_text(text, encoding="utf-8")
            n += 1

    print(f"Polish pass: changed {n} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
