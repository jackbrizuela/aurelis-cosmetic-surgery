# Aurelis neumorphic demo handoff

## Status

Rebuilt October 2026 from the v1 concept. Content and information architecture were kept; the visual world, layout and motion were replaced. Not deployed. Current addition: Jack’s supplied line-art video replaces the rejected code-motion sample. It plays muted once, then lands into Home using the same final frame. Earlier code samples are preserved but not used for the entrance. Existing In clinic / Video call walkthroughs, Articles and full first-consultation guide remain; shared navigation and route metadata are preserved. No real calling service or booking delivery. Current entrance provenance, replay/accessibility behavior and limits: LIVING-CONTOUR.md.

## Original redesign foundation — October 21, 2026

Jack approved a pale grey neumorphic redesign based on 45.jpg and 46.jpg. The material, typography and layout were replaced; all treatment content and the local consultation flow are preserved. The design stays light under dark system appearance. System fonts replace loaded Archivo. The initial hero pointer tilt was removed in the consolidated minimalist pass; the portrait now stays still. Rapid category/doctor changes ignore stale pending updates. DESIGN.md describes the current system. No new dependencies were added. The later consolidated pass adds one tall generated portrait.

## Palette, area switching and image framing refinement

Jack requested switchable treatment areas, the exact five-colour 47.jpg palette and less aggressive photo crops. The menu now renders only the chosen area. Photo frames follow the served images’ natural ratios on desktop and phone; no source photo was regenerated or replaced. See DESIGN.md for palette roles.

## Separate-page revision — October 21, 2026

The approved six-page composition is implemented with native browser history and opaque settling transitions, with reduced-motion support. Full photo proportions, treatment switches and the shared booking sheet remain. All six pages use the exact five greys from 47.jpg, following Jack’s correction. The added pastel page themes are removed. No new dependency or backend. Direct paths require an SPA fallback on any future host. The live local preview is not a public deployment.

## Shared app card — October 21, 2026

Jack approved one raised outer housing for header, navigation and page content, with the screenshot’s footer kept outside and unchanged. Full photo frames and tactile controls remain. Desktop uses a centred shell; phones use a narrower shell with stacked content and the existing menu sheet. Route logic and booking behavior are unchanged.

## Navigation and depth correction — October 21, 2026

A constant-height card with scrollable main prevents route-dependent resizing. The content stays opaque during a small settling motion, removing the fade-to-blank. Scrollbar tracks are hidden, with scrolling retained. Control faces now use the surrounding grey material and paired external highlights/shadows, matching 46.jpg more closely. Five grey tokens, footer, content and booking data remain. Questions balancing is implemented in the consolidated pass below.

## Preserved functionality

- Six pages: Home, Treatments, Your visit, Doctors, Clinics and Questions. The original consultation starter, educational content, profiles, clinic details, FAQs and closing invitation are all retained.
- The treatment menu displays one area at a time: Face / Breast / Body under Surgical, Skin / Injectables / Contour under Non-surgical. Counts, keyboard controls and all original content are retained; details expand in place. Stem cell information shows three topics.
- Consultation requests use three steps: interest; details (contact, In clinic / Video call, clinic only for In clinic, preferred day/time); review with local Send/Done preview. Both demo formats use Monday–Saturday request windows. Video preference is not verified service availability or a calling integration. On phones the sheet can be dragged down to dismiss.
- Motion: interruptible springs for the segmented control and booking sheet; opaque route settling and native internal scrolling. The old global Lenis/scroll-trigger behavior is removed.
- The earlier v2 rebuild removed the three.js ribbon and added the inline icon sprite, spring helper and image script. The current redesign uses system fonts; the old Archivo font is not loaded.
- Light sculpted materials with the five-colour grey reference palette are used in every system appearance.

## Must be supplied or verified before going live

1. The clinic's real name, logo, addresses, phone numbers and email.
2. Real doctors: consented photos, names, licences and verifiable credentials.
3. Every treatment time, recovery range and session count in `src/data.js`. They are typical ranges from general patient information, not the clinic's own figures.
4. Product availability and local regulatory status for every named product (NCTF, PRX, Rejuran, Botox, fillers, Ultra V, Aqualyx, Lemon Bottle). Lemon Bottle deliberately shows "Discussed at consultation".
5. A booking backend or service with real availability, confirmations and a privacy notice. The current form stores and sends nothing.
6. The footer disclosure and the "Does this demo send or save my details?" answer, once the site is live.
7. Whether video consultations are offered, their availability and limits, and the real booking/call/privacy process. The demo only records a format preference in the on-screen review.

## Known limits

- Page travel/animation is skipped when the visitor prefers reduced motion.
- `pnpm images` needs `sharp`, which `pnpm install` adds.
- Historical checks before the page split, in the local Chromium preview at 1920px, 1440px, 390px and 375px: category counts/details, rapid category changes, keyboard tabs, all doctor selectors, FAQ expansion, mobile menu, booking interest/date validation and summary, drag dismissal, pointer tilt and reduced motion. No horizontal overflow was observed. Vite production build passed. No other browser engine or physical phone was tested.



## Consolidated 49/50 reference pass — October 21, 2026

Implemented after Jack’s explicit approval to complete the whole pass. Quiet inner sections replace floating rows/tags; controls are embossed and stay inset when selected, without hover translation. Questions uses a balanced split on desktop and ordered stack on phones. The treatment photo frame follows the tallest collapsed panel at each width; expanding details does not grow the photo. One new tall surgical portrait was generated; the original remains intact.

Review now offers Send, animates the summary right, shows an explicitly demo-only confirmation, then exposes Done to close. No network send, storage, real slot reservation or backend was added. Close/reopen resets the flow and cancels in-flight travel. docs/TALL-TREATMENT-ASSET.md records the built-in image edit and prompt.

Current verification: all six desktop and phone views retain steady frame dimensions and no horizontal overflow. Treatment groups remain 4/3/3 and 4/2/3 plus three information entries; a 499px image frame matched the largest 498.4px collapsed panel within rounding, and expansion did not resize it. Full desktop Send/Done plus phone reduced-motion flow passed, including validation, focus, close/reset and retained clinic context. Helper assertions cover duplicate sends, cancellation and repeated navigation. Other browser engines, physical phones and real booking transmission remain untested.

## Approved Home art and viewport refinement — October 21, 2026

Replaced only the Home portrait with an original monochrome paper sculpture, saved as assets/originals/rebuild/home-art.png; the original portrait is retained. Responsive 640px/1448px WebP versions preserve the full 4:3 composition. Preload, alt text, social preview and image pipeline use the new asset. See HOME-ART-ASSET.md for the exact built-in prompt.

The outer backdrop is Ironclad Grey; the app card remains Cloud Veil. Desktop uses 24px margins and viewport height, while phone keeps 14px margins. All six routes share the steady frame. Removed underlines and structural separators; preserved keyboard focus, all wording, footer markup, controls and local-only booking logic. The external footer uses light text for contrast. Clinic photos expand proportionally; treatment column caps at 400px and still matches the tallest collapsed panel.

Checked locally in Chromium at 1920×1080, 1440×1000, 1280×800 and 375×812: all six views keep stable frame dimensions, no horizontal overflow; all image sources load. All seven treatment states retain counts 4/3/3, 4/2/3 and 3. At 1440px the image frame is 495px and the largest collapsed panel 494.4px. Send → confirmation → Done still closes, and the confirmation states nothing was sent or stored. Physical phones and other browser engines remain untested.

## Compact desktop composition — October 21, 2026

Approved after Jack corrected the proposed height-only change: width also reduces, and each desktop page must fit the card. Only src/style.css changed in implementation. Above 760px the body grid reserves the complete footer, with a flexible card above; shared width is min(92%, 1600px). No hidden content, zoom/transform scaling, fixed footer overlay, new assets/dependencies or content/interaction changes. Photo ratios, grey material and focus/scroll access remain.

Clinics places smaller photos beside each location’s facts/actions. Doctors brings portrait and bio together and puts the three selectors below the bio. Visit pairs a smaller full photo with the four steps. Treatments keeps its structure with more compact rows. Home art/copy and Questions fit the same steady frame. Phone rules/layout remain unchanged.

Checked all six collapsed pages at 1920×909, 1440×900, 1366×768, 1280×800 and 1024×768: main scrollHeight equals clientHeight, no horizontal overflow, the complete footer stays inside the viewport and the card/header stay steady across navigation. A narrow-desktop 15–19px overflow on the first draft was resolved by compacting Home/menu spacing; the final six-page check passed. All three doctor selections fit and retain their photo thumbnails. Seven treatment states retain counts 4/3/3, 4/2/3 and 3. At 1366×768 the 389px frame matches the largest 388.7px collapsed panel. Expanded detail scrolls internally, retaining the footer and image height. Phone 375×812 remains 347×784 with native vertical scrolling and no horizontal overflow. Production build passed. Physical phones, other browser engines and every possible zoom/short-window size are not certified.

## Four-page continuity and footer restoration — October 21, 2026

Jack accepted Home/Treatments and rejected the other four pages’ detached composition. The approved correction changes only their desktop CSS and the footer’s earlier wider alignment/wordmark. Home and Treatment rules are byte-for-byte preserved; HTML, assets, data, navigation, booking and phone rules are untouched.

Visit and Doctors share Treatment’s left image column/right content origin. Heading positions are identical across Treatments, Visit, Doctors, Clinics and Questions. The doctor stage no longer has a separate centred width; selectors stay beneath the top-aligned bio. Clinics restores two equal photo-over-details columns with modest full-ratio images. Questions moves to the shared top origin, with invitation left and FAQs right. Footer width returns to calc(100% - 48px), wordmark 25px, and all original footer markup remains intact; compact vertical spacing preserves viewport fit.

Final checks: six collapsed pages at 1920×909, 1440×900, 1366×768, 1280×800 and 1024×768 all have main scrollHeight equal to clientHeight, no horizontal overflow, steady card geometry and the complete footer visible. A first-draft 12–23px clinic overflow was corrected by bounding its image size to desktop height; footer wordmark line height removed a 2px narrow-view treatment overflow without changing Treatment rules. All three doctors, both location-aware booking buttons and four expanded FAQs work; expanded FAQs retain internal scrolling. Phone 375×812 geometry and per-page scroll heights match the previous pass exactly. Build passes. Evidence: C:/charlie/work/aurelis-build/page-continuity/review/checks.json and six final desktop screenshots. Other browser engines, physical phones and arbitrary zoom are untested. Jack’s visual acceptance of the four revised pages remains pending.

## Cohesive Visit, Clinics and Questions bodies — October 21, 2026

Implemented the replacement composition plan after Jack’s approval. Scope: index.html adds one neutral body wrapper each for Visit and Questions; src/style.css changes only those three desktop bodies. Original copy/assets, accepted Home/Treatments/Doctors markup/styles, header/footer and interaction code are preserved. The scoped preservation assertion accounts for splitting an existing shared desktop selector while keeping its Doctor declarations identical.

Visit groups its full consultation photo beside four ordered vertical rows. Clinics uses one bounded gallery with equally sized full-ratio photos, compact facts and baseline-aligned actions. Questions has one restrained FAQ column and the existing invitation/action row beneath it. The bodies use balanced placement below the unchanged page titles. Phone wrappers use display:contents, retaining exact prior reading order and layout. No new assets/dependencies/backend.

Checks: all six collapsed desktop views fit at 1920×909, 1440×900, 1366×768, 1280×800 and 1024×768, with full footer visible and no horizontal overflow. The initial clinic draft had 1–3px overflow at two sizes; reducing only gallery vertical padding resolved it. Clinic action baselines match within 0.02px across those sizes. Both booking buttons retain location context. Four expanded FAQs remain reachable through internal scrolling; closed views fit. All six 375×812 phone card dimensions and per-page scroll heights exactly match the prior pass. Build passed; preview errors empty. Physical phones/other engines remain untested. Jack’s acceptance of the new three-body composition is pending. Review screenshots/checks: C:/charlie/work/aurelis-build/cohesive-bodies/review/.

## Four clinic facts and global asset-blink correction — October 21, 2026

Added the existing placeholder email to Makati and the existing placeholder phone to BGC, producing identical address/hours/phone/email 2×2 fact grids. No real contact or service claim was invented. Phone facts remain stacked. Removed the first-fact spanning rule and tightened only gallery outer padding to keep the added fact within narrower desktop frames.

The blink came from explicit opacity-zero swapping classes and timeouts. A shared readyImage helper now decodes offscreen; doctor portrait/profile/selection and treatment photo/panel/tab commit atomically after readiness. Current imagery remains visible while loading. Stale results are ignored; decode failures preserve the old state and allow retry. Removed image swapping fades and Home artwork entrance fade; treatment area settling is transform-only. No global stylesheet disable, new dependency, new image, data/backend or dialog/Send behavior change.

Verification: assert checks against the actual swap functions cover delayed decode, latest-request wins, atomic doctor update, failure preservation/retry, repeat selection and treatment commit. Browser checked all three doctor assets and all three category assets as loaded, fully opaque, with opaque parents; rapid doctor selection and treatment keyboard Home/End passed. Four entries per clinic form two equal columns. The clinic page fits without overflow at 1920×909, 1440×900, 1366×768, 1280×800 and 1024×768, with full footer visible and aligned action rows. 375×812 phone shows four stacked facts per location with no horizontal overflow. Build passes; preview errors empty. Physical phones and other engines untested. Evidence: C:/charlie/work/aurelis-build/final-polish/verify-swaps.mjs and review/checks.json.

## Approved copy and video-request pass — October 21, 2026

Rewrote the six pages, educational summaries/shared details, profiles/FAQs, request form and messages, dynamic phone strings, image alternatives and document/share titles from the approved copy deck. Preserved the clinical numeric ranges and all 22 entries. Visit adds a video invitation below its existing full-ratio photo; its non-clickable numbers are flat. The shared modal passes opener format/location context, hides/disables Clinic for video, restores it when switching back and includes Format plus separate preferred day/time in review. Closing/reopening resets the flow. Existing Send/Done, image decode/no-blink behavior, palette, navigation and footer placement remain. No new dependency, generated asset, calling service, backend or public release.


## Visit explanation and first article — October 21, 2026

Implemented the approved full page/article plan with the copywriting and SEO Audit skills. The Visit switch changes only its four steps and matching request default; the photo stays opaque. Articles reuses the consultation photo; the full guide uses one reading column, honest heynuff demo authorship/date, five sections and linked ASPS/NHS sources. Added Articles to header, mobile menu and footer; active state, direct URLs, history/focus and title/description/share text cover both new paths. The accepted grey material, card/footer, assets and local-only Send/Done remain.

Runtime metadata in this local app does not establish public-launch crawl/index readiness. A real host must serve correct direct-URL content/metadata and a verified public canonical. Clinical review, real video operations, public deployment and ranking/traffic results are outside this addition.

Checked the actual implementation with assertions for eight routes, metadata restoration/history, parent Articles selection, both walkthrough states, article headings/sources and preservation of the accepted page/form markup. Browser checks cover 32 desktop measurements across five sizes, all eight phone views, both request defaults, article direct entry/Back/Forward, keyboard scrolling to its closing action and reduced-motion video selection. Closed desktop views fit with the full footer visible; the article intentionally scrolls. No horizontal overflow or browser errors observed. Production build passes (9 modules; CSS 46.55kB, JS 31.17kB). Evidence: C:/charlie/work/aurelis-build/articles-video-explainer/review/. Physical devices and other browser engines remain unchecked; this is a local implementation for Jack's review.
