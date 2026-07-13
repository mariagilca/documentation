#!/usr/bin/env python3
"""List on-screen Chrome windows with their CGWindowID, size, position and title.
Used to find the window to feed to `screencapture -l<id>`.
Requires: pyobjc-framework-Quartz  (pip install pyobjc-framework-Quartz)
"""
import Quartz

opt = Quartz.kCGWindowListOptionAll | Quartz.kCGWindowListExcludeDesktopElements
for w in Quartz.CGWindowListCopyWindowInfo(opt, Quartz.kCGNullWindowID):
    if 'Chrome' not in (w.get('kCGWindowOwnerName', '') or ''):
        continue
    b = w.get('kCGWindowBounds', {})
    name = w.get('kCGWindowName', '') or ''
    print(w.get('kCGWindowNumber'),
          '| layer', w.get('kCGWindowLayer'),
          '| %dx%d @ %d,%d' % (int(b.get('Width', 0)), int(b.get('Height', 0)),
                               int(b.get('X', 0)), int(b.get('Y', 0))),
          '| title=', repr(name))
