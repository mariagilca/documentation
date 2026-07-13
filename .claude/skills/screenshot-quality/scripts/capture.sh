#!/bin/bash
# Capture ONE clean 2x screenshot of the Chrome window whose active-tab title starts
# with $MARKER, then decorate it. NO `computer` tool actions must run before this
# (Claude's orange glow/cursor appear only after a computer mouse/screenshot action).
#
# Usage:
#   OUTDIR=/abs/path/to/static/img/<area> MARKER=ZZCAP PY=/path/to/venv/bin/python \
#     ./capture.sh <image-name>
#
# Prereqs: macOS Screen Recording granted to your terminal; Stage Manager OFF;
#          $PY has pyobjc-framework-Quartz + Pillow. Set a unique title marker on the
#          target tab first, e.g.  document.title = 'ZZCAP ' + document.title
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
MARKER="${MARKER:-ZZCAP}"
: "${OUTDIR:?set OUTDIR to the target image directory}"
PY="${PY:-python3}"
name="${1:?usage: capture.sh <image-name>}"
mkdir -p "$OUTDIR"

for try in 1 2 3 4; do
  osascript >/dev/null 2>&1 <<EOF
tell application "Google Chrome" to activate
tell application "System Events" to set frontmost of process "Google Chrome" to true
delay 0.4
tell application "Google Chrome"
  repeat with w in windows
    repeat with i from 1 to count of tabs of w
      if (title of item i of tabs of w) starts with "$MARKER" then
        set active tab index of w to i
        set index of w to 1
        set bounds of w to {0, 29, 1440, 929}
      end if
    end repeat
  end repeat
end tell
EOF
  sleep 0.7
  WID=$("$PY" "$DIR/winid.py" | grep "$MARKER" | awk '{for(i=1;i<=NF;i++) if($i ~ /^[0-9]+x[0-9]+$/){split($i,a,"x"); if(a[1]+0>1000){print $1; exit}}}')
  [ -z "${WID:-}" ] && { sleep 0.6; continue; }
  raw="$(mktemp -t rawshot).png"
  if screencapture -x -o -l"$WID" "$raw" 2>/dev/null && [ -s "$raw" ]; then
    "$PY" "$DIR/decorate.py" "$raw" "$OUTDIR/$name.png"
    rm -f "$raw"
    exit 0
  fi
  rm -f "$raw"
  sleep 0.6
done
echo "capture failed for $name" >&2
exit 1
