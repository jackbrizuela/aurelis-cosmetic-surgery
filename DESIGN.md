# Aurelis — quiet pages and a consultation guide

Jack approved six app-like pages and the consolidated 49.jpg/50.jpg minimalist material and booking revision on October 21, 2026. His subsequent correction keeps the exact five greys from 47.jpg across every page; the added pastel direction is superseded. The previous long-scroll structure is superseded. Keep the sculpted raised/recessed material, system fonts, complete content and corrected photo proportions.

## Navigation and composition

- Home /: current headline, introduction, interest selector, consultation action and left-facing Living Contour artwork in the existing 4:3 frame.
- Treatments /treatments: three main categories, six treatment-area switches, selected rows and full expandable details. All 22 original items remain reachable.
- Your visit /your-visit: a modest consultation-photo inset in the masthead, switchable In clinic / Video call formats, four open stages across desktop and their shared request/guide actions underneath. Phones stack the complete stages. Numbers are flat text, without discs, gradients or shadows.
- Doctors /doctors: illustrative-profile disclosure, full portrait, selected biography and all three selectors.
- Clinics /clinics: Makati/BGC selectors reveal one complete location gallery at a time. Full-ratio photo above its centered name, four facts and location-aware request/directions. Image decoding completes before the whole selected panel changes; rapid selections retain the latest choice.
- Articles /articles: a numbered, typography-led guide feature and excerpt without the repeated consultation photo. /articles/first-aesthetic-consultation retains its720px reading column, full article, disclosure, sources and actions.
- Questions /questions: all four existing questions and answers are visible in a flat two-column editorial spread, with a centered consultation invitation below. Phones read the four answers in order; there are no accordion controls.

One raised app card contains the header, navigation, consultation action and active page. The header shares the same uninterrupted material; underlines and structural dividers are removed. Page, clinician, location and closing outer housings are removed; recessed photos and tactile controls keep their depth. The compact footer remains outside the card with its existing navigation and disclosures. Its text uses Cloud Veil for contrast against the darker outer backdrop. Only the selected view is visible and keyboard-accessible. The page opens at its top, updates its title and active nav state, and moves focus to the heading. Direct addresses, Back/Forward and legacy section hashes work. On phones the existing menu sheet carries all seven main destinations. Desktop reserves room for the complete external footer and gives the card the remaining height; its width is 92% of the viewport, capped at 1600px. Card geometry stays constant across routes. Longer pages scroll inside main; the external footer remains in the document. Scrollbar tracks are hidden without disabling wheel, touch, trackpad or keyboard scrolling.

## Colour and material

Use only 47.jpg’s five greys for interface colour: Charcoal Noir #2B2B2B for primary text and actions; Ironclad Grey #565656 for secondary text and selected treatment areas; Urban Fog #848484 for stronger lines; Moonlit Silver #B3B3B3 for selected surfaces and fine borders; Cloud Veil #E0E0E0 for the app card and sculpted housings. Ironclad Grey #565656 is the outer website backdrop. Every page and shared dialog inherits these same tokens. White highlights and transparent black shadows supply physical light and depth. Original photography retains its colour. Small control faces share Cloud Veil with the surrounding material, using distinct white upper-left highlights and Moonlit Silver lower-right shadows. Button-like controls are lightly embossed at rest and recessed when selected or pressed. Focus tags are quiet text. Informational icons and the confirmation mark use muted shallow-inset discs; fields remain recessed. Action arrows are plain glyphs within their embossed buttons. Dark gradient blobs are removed.

System sans-serif type uses normal widths and light headings. Home's 4:3 frame uses a centered cover crop of the video still so the artwork fills it; the figure keeps its proportions. Doctor portraits remain 4:5, consultation 3:2 and clinic rooms 16:9, with contain and natural proportions. The treatment frame matches its tallest collapsed panel; the new 1:2 surgical portrait and intentional skin/ampoule detail crops fill it. Original photographs remain intact. Content begins farther below the shared navigation: 36px main top padding on desktop and 34px on phones. Desktop windows up to800px high use32px top/12px bottom padding to keep collapsed content and the footer fitting.

## Motion and access

Page content switches immediately, stays fully opaque and settles by 5px over 220ms. The header and card do not move or resize on navigation. Repeated clicks on the active page skip the animation; rapid navigation cancels the previous movement. Reduced motion switches content directly. The global smooth-scroll controller and scroll-driven visit decoration were removed because navigation now changes pages.

The existing spring tab indicator, treatment detail expansion, decoded, opaque doctor image swaps and gesture-driven booking sheet remain. The Home artwork stays still after the Living Contour welcome. Jack rejected the code-motion sample; the entrance now plays his supplied ten-second line-art video, then lands its final frame into Home. The same extracted final frame supplies the static artwork. First arrival plays once; internal navigation/history do not replay; Home refresh replays and inner-page refresh does not. Reduced motion or unavailable session storage shows the site directly. Skip/Escape, resizing and route changes finish safely; timeout recovery keeps the page accessible if initialization fails. Native dialogs keep their focus trap; route changes close an open sheet and focus the destination heading. Keyboard navigation, more-contrast outlines and reduced-transparency treatment remain. Asset and implementation detail: docs/LIVING-CONTOUR.md.

The accepted HyperFrames thought-bubble film supplies the entrance and its clean final frame supplies Home. The gray stage fills the viewport. Uniform cover framing stays on wide screens; tall/narrow screens cap film width at twice viewport width, center it vertically and pan with room for the thoughts beside her. The wordmark fades before the first bubble. The final handoff matches Home's centered cover crop without stretching. Home/card proportions remain unchanged. Source/edit details: video/thought-bubbles and docs/LIVING-CONTOUR.md.

## Demonstration boundary

The three-step consultation form is shared by every page. It retains interest/format/location context and validation, then displays a local summary. Details offers In clinic / Video call; Clinic is hidden and disabled for video and omitted from its summary. The Visit video action preselects Video call; clinic actions preselect In clinic and their location. Closing resets those defaults. Nothing is sent or stored. One taller generated treatment portrait and one original Home artwork were added. No framework, dependency, backend or public deployment was added. A future static host must serve index.html for these application paths.


## Approved minimalist pass

49.jpg supplies quiet interior sections and 50.jpg supplies moulded embossed-to-pressed controls. Inner rows, FAQ sections and focus tags no longer float. Buttons stay in place on hover; selected nav, categories, area controls, doctor selectors and radio choices stay pressed without changing dimensions. The exact five greys and external footer remain.

The treatment image frame matches the largest collapsed panel across every category/area at the current width. Expanded details do not resize it. A newly extended 1:2 surgical portrait preserves the profile in that taller frame; the skin detail and ampoules use intentional detail crops. No other source photo is replaced.

The local review step offers Send. Summary slides right, a Demo request sent confirmation enters, then the button becomes Done and closes the modal. Nothing is transmitted or stored. Duplicate sends are disabled; close/reopen cancels and resets; reduced motion skips travel. The action row keeps its position. Asset provenance/prompt: docs/TALL-TREATMENT-ASSET.md.

## Approved art and spacious desktop refinement — October 21, 2026

This earlier 24px-edge composition is superseded by the compact desktop fit below. The frame remains fixed across routes; native internal scrolling retains access on shorter screens. Home balances its existing copy/actions against larger 4:3 art. Clinic photographs expand with their equal columns without changing their 16:9 proportions. Treatment imagery stays capped at a 400px column and follows the longest collapsed list. Phone margins, compact menu and stacked content remain. All link underlines and row/header/FAQ/clinic/footer/summary separators are removed, while keyboard focus outlines remain. Artwork source, exact prompt and built-in generation mode: docs/HOME-ART-ASSET.md.

## Approved compact desktop fit — October 21, 2026

Jack corrected both dimensions: reduce width as well as height and make every page fit the resulting card. Above 760px, the body uses two grid rows: flexible app card, then the complete footer. The card uses min(92%, 1600px) width; the footer restores its earlier wider span, calc(100% - 48px), with a 25px wordmark; 20px top and 12px bottom space remains. Header and main padding are compact. Footer copy/navigation are unchanged and remain outside. Native main scrolling is retained for expanded details, shorter windows and enlarged text.

Home keeps its artwork at 4:3 and constrains its size by available viewport height, with tighter copy/action spacing. Treatments keeps its approved structure, all category/area controls and full content, using denser collapsed rows; its photo still matches the largest collapsed panel. Your visit uses the Treatment image-column width, with four steps on the right. Doctors uses that same left photo column, with biography/focus and selectors on the right. Clinics has two equal columns with modest 16:9 photos above their facts/actions. Questions has a top-aligned heading/invitation at left and FAQs at right. No asset, content, palette, interaction or phone layout is replaced.

## Approved composition continuity correction — October 21, 2026

Home and Treatments are Jack’s accepted anchors. Their CSS rules and markup are unchanged. The four other desktop views now share Treatment’s main heading origin and left-column measure: 25% with a 28px gap, or 24%/22px on narrower desktops. Visit uses the full 3:2 photo on the left and the four steps on the right. Doctors uses the full 4:5 portrait at left and top-aligned biography/selector rows at right, without a detached centred stage. Clinics uses two equal columns, each with a modest full-ratio image above its information/actions; image width caps at 360px and responds to shorter desktop height. Questions starts at the same top edge, with invitation at left and FAQs at right. Phone rules remain unchanged.

The footer’s earlier wide alignment and 25px wordmark are restored. Its existing navigation, disclosure and copyright stay unchanged. Compact vertical spacing still reserves the whole footer within the viewport. No new content, image, dependency or interaction behavior was added.

## Approved cohesive three-body revision — October 21, 2026

This replaces the Visit/Clinics/Questions body arrangements above. Their accepted headings, header, card and footer remain fixed. Home, Treatments and Doctors are unchanged. All original wording/assets remain.

Visit is one bounded 1080px split group: full 3:2 photo at left, four compact vertical process rows at right. Each row groups number, title and full description. Clinics is one balanced gallery up to 1040px wide with a deliberate 40px gap; full 16:9 photos fill both columns, names/addresses sit directly below, hours/contact share compact columns and action rows share a baseline. Gallery width responds to short desktop height. Questions is one 900px reading column with all four native accordion entries; the complete consultation invitation follows below as one horizontal text/action row. Each body balances vertically in the space beneath its unchanged title.

Two neutral HTML wrappers group Visit and Questions. Their display:contents phone state preserves existing reading order, layout and scroll heights; desktop CSS creates the bounded bodies. No extra panels, new assets, dependency, decorative effects or interaction code.

## Final clinic balance and asset continuity — October 21, 2026

Both clinic fact grids have the same four entries: address, hours, phone and email. Makati gains the existing placeholder email; BGC gains the existing placeholder phone. Desktop uses a true 2×2 grid with no spanning first entry. Phones stack all four entries. Gallery vertical padding is slightly smaller to retain short-desktop fit; all other approved compositions remain.

Global asset opacity fades are removed: Home artwork stays visible on entrance, doctor/treatment images stay fully opaque, and treatment area changes use transform-only settling. A shared image decode helper prepares a replacement offscreen before committing it. Doctor portrait/bio/selected button and treatment photo/content/tab states commit together only when ready. Older requests cannot overwrite the latest selection. Failed decode keeps the existing asset/state and permits retry. Existing dialog/Send motion and text entrance remain.

## Approved copy and video preference — October 21, 2026

Visitor copy across all six pages, 22 educational entries, FAQs, profiles, form states, alt text and metadata follows the approved COPY-AND-FLOW-REVIEW deck. Request a consultation describes the action accurately. Step numbers are flat informational text; clickable controls retain their material. Existing clinical ranges, asset ratios, no-blink decoding, navigation and outside footer placement remain. No real call, appointment, transmission or storage is implemented.

## Treatment and Doctor section spacing — October 23, 2026

The photo-and-details blocks sit 36px below their page introductions on desktop. Their photo-to-content gap is 44px, reducing to 32px below 1181px width. This targets the content sections Jack highlighted, rather than adding more navigation padding. Images, content, controls, card/footer sizing and phone layouts remain unchanged.

## Approved content-led compositions — October 23, 2026

This supersedes the earlier Visit/Clinics/Articles/Questions arrangements. Jack approved the researched chat diagrams: horizontal journey, selected-location gallery, typographic article feature and fully readable Q&A spread. Home, Treatments, Doctors, the article reading page, shared card/header/footer, palette, entrance and motion rules remain intact. No new assets, fake article entries, framework or dependency.

Visit's full3:2 photo sits beside its introduction, above the four-step journey; desktop width grows with the viewport from280px to440px, capped at340px on windows up to800px tall. Those shorter desktops use32px journey gaps to retain action/footer fit. Phone photo sizing and stacking remain unchanged. Formats and request defaults remain. Clinics preserves both16:9 photographs, full four-fact sets and corresponding booking/directions, with one displayed panel selected by two pressed-state buttons. Articles reserves the consultation photo for Visit and gives the real guide title visual emphasis. Questions preserves every answer, showing all four without expansion; short desktop windows put the closing invitation text on one line above its button to retain footer fit. Phone layouts stack naturally and preserve full text.

Original copies, implementation assertions, clinic failure/race checks, viewport observations and screenshots: C:/charlie/work/aurelis-build/editorial-compositions. These checks establish the implementation; Jack's visual acceptance remains open. No public deployment or vault writes.
