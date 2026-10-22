# Tall treatment portrait

Created with the built-in image generation tool on October 21, 2026, after Jack approved the complete 49/50 reference pass. This is generated demonstration photography, not a real patient or result.

- Edit reference: `public/assets/menu-surgical-1000.webp` (preserved).
- Original new output: `assets/originals/rebuild/menu-surgical-tall.png`, 887 × 1774, 1:2.
- Served copy: `public/assets/menu-surgical-tall-887.webp`, converted with the bundled Sharp runtime without cropping or changing proportions. The project's declared Sharp package was not installed; no project dependency was added.
- Use: tall surgical treatment frame. The frame matches the longest collapsed menu panel at the current layout width; expanded details do not enlarge it.
- Skin and stem-cell photographs remain the original assets with intentional detail framing. No other photograph was regenerated.

Final built-in edit prompt:

> Edit target: supplied cosmetic-clinic portrait. Extend/recompose this as an exceptionally tall narrow editorial photograph, aspect ratio 1:2 (width:height), for a website's full-height treatment-menu column. Preserve the same adult woman's face, realistic skin, dark swept-back bun, calm right-facing profile, soft daylight, clean pale neutral background and tasteful professional cosmetic-clinic mood. Show her complete head with breathing room, long neck, shoulders and upper torso in a simple ivory sleeveless top, centered with room on both sides so the entire profile and bun survive a narrow vertical crop. The face should sit in the upper third with relaxed torso continuing naturally down to the bottom of the photograph, rather than a huge zoomed face. Full photo fills the canvas; no border, no UI, no typography, no collage, no medical procedure or tools, no logos. Preserve natural anatomy and photograph quality. Generate the tall composition; do not merely add blank bars.

The new source is included in scripts/images.config.json as menu-surgical-tall with ratio 1:2 and width 887, so the normal pnpm images command can regenerate the served file once the project’s declared Sharp dependency is installed. No source photo needs to be replaced.
