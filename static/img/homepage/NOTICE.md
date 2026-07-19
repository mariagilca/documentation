# Homepage artwork provenance

The painted swoop artwork in this directory (`hero/*.png`, `swoops/*.png`) and
the tiling grain texture (`noise.png`) are derived from the
[swift-org-website](https://github.com/swiftlang/swift-org-website) project
(`assets/images/landing-page/`), which is licensed under the
**Apache License, Version 2.0**.

Modifications: the paintings were re-tinted from Swift's orange/pink palette to
the OpenLM blue/violet palette with a per-pixel hue remap (warm hues rotated
+186°, pinks −70°, violets and neutrals unchanged, saturation trimmed to 94%).
Pixel dimensions are unchanged. The Swift bird logo is **not** used anywhere;
the docking mark in the hero animation is the OpenLM "O" glyph drawn from
`static/img/openlm-logo.svg` vector paths at runtime.

The hero entrance and scroll-swoop animation code
(`src/components/HomepageHero/heroAnimation.js`, `scrollSwoops.js`) and the
section layout CSS are ports of the same project's `hero.js` / `landing.js` /
landing-page stylesheets — see the attribution headers in those files.

Swift and the Swift logo are trademarks of Apple Inc. This site is not
affiliated with or endorsed by Apple Inc. or the Swift project.
