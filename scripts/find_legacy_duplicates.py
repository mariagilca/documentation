#!/usr/bin/env python3
"""
Scan docs/legacy recursively, extract document titles (frontmatter `title`,
first H1, or filename fallback), then compute case-insensitive fuzzy
similarities to identify potential duplicates.

Outputs:
- scripts/legacy_duplicates_report.txt (human-readable)
- scripts/legacy_duplicates.csv (path1,path2,score,title1,title2)
"""
from __future__ import annotations
import re
from pathlib import Path
from difflib import SequenceMatcher
import csv

ROOT = Path(__file__).resolve().parents[1]  # repo/docs root
LEGACY = ROOT / 'docs' / 'legacy'


def extract_title(text: str) -> str | None:
    # Remove BOM
    if text.startswith('\ufeff'):
        text = text.lstrip('\ufeff')

    # Frontmatter
    fm = None
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if m:
        fm = m.group(1)
        text_wo_fm = text[m.end():]
    else:
        text_wo_fm = text

    if fm:
        for line in fm.splitlines():
            s = line.strip()
            if s.lower().startswith('title:'):
                val = s.split(':', 1)[1].strip().strip('"\'')
                if val:
                    return val
        for line in fm.splitlines():
            s = line.strip()
            if s.lower().startswith('sidebar_label:'):
                val = s.split(':', 1)[1].strip().strip('"\'')
                if val:
                    return val

    # ATX H1
    m = re.search(r"^#\s+(.+)$", text_wo_fm, re.M)
    if m:
        return m.group(1).strip()

    # Setext H1
    m = re.search(r"^(?P<t>[^\n].*?)\n=+\s*$", text_wo_fm, re.M)
    if m:
        return m.group('t').strip()

    return None


def main():
    files: list[Path] = []
    for p in LEGACY.rglob('*'):
        if p.is_file() and p.suffix.lower() in {'.md', '.mdx'} and p.name != '_category_.json':
            files.append(p)

    records = []
    for p in files:
        try:
            text = p.read_text(encoding='utf-8', errors='ignore')
        except Exception:
            continue
        title = extract_title(text) or p.stem.replace('-', ' ').replace('_', ' ')
        norm = re.sub(r"\s+", ' ', title).strip().lower()
        records.append({'path': str(p), 'title': title, 'norm': norm})

    pairs: list[tuple[float, dict, dict]] = []
    for i in range(len(records)):
        a = records[i]['norm']
        for j in range(i + 1, len(records)):
            b = records[j]['norm']
            if abs(len(a) - len(b)) > max(10, int(0.5 * max(len(a), len(b)))):
                continue
            s = SequenceMatcher(None, a, b).ratio()
            if s >= 0.90:
                pairs.append((s, records[i], records[j]))

    pairs.sort(key=lambda x: (-x[0], x[1]['path'], x[2]['path']))

    out_txt = ROOT / 'scripts' / 'legacy_duplicates_report.txt'
    out_csv = ROOT / 'scripts' / 'legacy_duplicates.csv'
    out_txt.parent.mkdir(parents=True, exist_ok=True)

    with out_txt.open('w', encoding='utf-8') as f:
        f.write(f"Found {len(records)} docs, {len(pairs)} high-similarity pairs (>=0.90)\n\n")
        for s, r1, r2 in pairs:
            f.write(f"{s:.3f} | '{r1['title']}'\n")
            f.write(f"    - {r1['path']}\n")
            f.write(f"    - {r2['path']}\n\n")

    with out_csv.open('w', encoding='utf-8', newline='') as f:
        w = csv.writer(f)
        w.writerow(['score', 'path_1', 'path_2', 'title_1', 'title_2'])
        for s, r1, r2 in pairs:
            w.writerow([f"{s:.3f}", r1['path'], r2['path'], r1['title'], r2['title']])

    print(f"Report written to: {out_txt}\nCSV written to: {out_csv}")


if __name__ == '__main__':
    main()

