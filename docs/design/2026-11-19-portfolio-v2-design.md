# Portfolio v2: design doc

Status: **draft, waiting for Mahir's approval**. Nothing gets built until this is approved.

## Intent

A portfolio for Mahir Tajwar Chowdhury, an Electrical Engineering student at RIT who builds hardware: robotics olympiad bots, drones, and hackathon gadgets. The whole site is a single dark **cutting mat on a workshop bench** that you scroll down. Each section is a real object lying on the mat: a name-tag sticker, an engineering drawing, a parts bin, a stack of certificates, a shipping label.

The site should leave visitors thinking: *this person actually builds physical things, and wins with them.*

Reference: hackville.io (layered paper and stationery props on a green cutting mat). We keep its *structure* (one continuous mat with tactile objects, tape, clips and pins) and change its *mood* from playful pastel to a darker, precise engineer's bench.

## Audience and primary job

1. **Recruiters, internship and co-op screeners.** In about 30 seconds they need to see who he is, what he has built, and what he has won, then reach the resume.
2. **Hackathon teammates, judges and clubs.** They want the project details: the hardware, the hurdles, the links.

## Goals

- The name-tag sticker intro from Home 2 survives as the hero, including tap-to-switch-language.
- Recent hackathon wins (FabriCUe and Space Ducky) are the first projects visitors see. They're the strongest and most current content.
- The six 3D models from v1 stay interactive.
- Awards are easy to read at a glance (counts plus a readable list) with the real certificates one click away.
- Fast: the first screen is interactive in under ~2 s on a normal connection, and total transfer before any 3D loads is under ~1.5 MB.
- Readable: body text is at least 15 px and contrast is at least 4.5:1. v1 had a lot of 8 to 10 px text at 40% white.

## Non-goals

- A CMS or blog.
- A light mode. The site is intentionally dark only.
- Recreating v1's pages one-for-one. v2 is a single long page, plus a resume link.

## Anti-goals (things v1 did that v2 must not)

- Purple dither background, the fake "hacker terminal" sequence, and picsum placeholder images.
- 68 MB of unoptimised assets.
- A full-screen loader on every navigation.

## Look and feel

**Surface.** The cutting mat is near-black green (`--mat #0D1A19`). It has a 10 mm minor grid (`--grid #1A2B29`) and a 50 mm major grid (`--grid-major #27403C`). Printed mat markings (angle lines, a protractor arc, edge rulers with numbers) appear in faded mint (`--print #5E8B80`) at low opacity. A faint vignette and paper-dust noise keep it from looking flat.

**Objects on the mat** (these supply the lighter tones on the dark page):
- Engineering-drawing paper `--paper #E7E4DA` with blueprint-grey lines `--line #8A97A0`.
- Masking tape `--tape #D8CDB0` (semi-transparent, torn ends).
- Kapton tape `--kapton #C98A1E` at 70% (amber, translucent). This is the **primary accent**.
- Label-maker tape: black `#111` with embossed off-white text.
- PCB green `#1F5E3A` and solder grey `#B8BCBF` for props.
- **Signal accent:** heat-shrink orange `--signal #FF5A1F`, used only for the caliper LCD highlight, the active state and the one call to action.

**Type.**
- Display: **Big Shoulders Stencil Display** (800 to 900). Stencil lettering is what you see spray-painted on parts bins and crates.
- Everything else: **Archivo**, a variable font with a width axis. Body text uses the normal width. Spec sheets and labels use Semi-Condensed. Engineering title blocks use Archivo Expanded in small caps.
- The name tag keeps its handwriting fonts from v1.
- Scale: 14 / 16 / 20 / 28 / 44 / 72 / 120 px. Body lines are capped at about 70 characters.

**The bold element:** the hero. When the page opens, the name tag is "slapped" onto the mat: it drops, squashes, settles, and a strip of Kapton tape lays across one corner. The digital caliper on the right edge reads the scroll position in millimetres, and its jaw opens as you scroll. Everything else on the page stays calm.

**Motion rules.** There's one orchestrated load sequence (the slap, then the tape, then the caliper powering on). After that, objects only respond to the user: a slight lift and shadow on hover, the parts-bin drawer sliding out, a certificate pulled from the stack. Everything respects `prefers-reduced-motion`. No scroll-jacking.

## Page structure (single page)

| # | Section | Object on the mat | Content |
|---|---------|-------------------|---------|
| 0 | Nav | Label-maker tape strips stuck to the top edge, with a ruler scale under them | About · Builds · Archive · Awards · Contact · **Resume** (signal orange) |
| 1 | Hero | Name-tag sticker (from Home 2), caliper, solder spool, resistors, ESP32 board | "HELLO my name is Mahir Tajwar Chowdhury", tap to switch language, one line on masking tape: *Electrical Engineering @ RIT. I build robots, drones and hackathon hardware.* |
| 2 | About | Polaroid taped to an engineering drawing (A3 sheet with a title block) | Short bio. Title block fields: NAME · DWG NO. · MATERIAL "EE, RIT" · ORIGIN "Bangladesh · Mirzapur Cadet College" · SCALE 1:1. Skills as label-maker tapes (ESP32, Arduino, KiCad, CAD, Python, C++, ROS, Firebase…) |
| 3 | Builds (recent) | One manila project folder per build, with a paper-clipped photo, a BOM, and a "hurdle" sticky note | **FabriCUe** (MakeCU '26, Columbia; 2 prizes: MLH "Build Your Hackathon A-Team" with SpaceX SI, and Best Use of Notability). **Space Ducky** (Tiger Games '26, RIT; Best Solo Game). Links to Devpost and GitHub. |
| 4 | Archive (robotics) | Turntable with the active 3D model, a parts-bin drawer row to pick the model, and a spec sheet | FPV Racing Drone · Robotic Arm · Autonomous Robot · Amateur Rocketry · Line Following Robot · Humanoid Robot |
| 5 | Awards | Inspection-tag counters (Gold 2 / Silver 4 / Bronze 6 / Technical 4 / Hackathon 3), a certificate stack, and a log sheet | Every award as a row (year · event · medal · category · group), with an international/national/hackathon filter. Clicking a row pulls that certificate image from the stack. |
| 6 | Field notes | Contact-sheet photos with masking tape, and a measuring-tape timeline | 16 gallery photos. Timeline: 2019 DUMUN → BdRO 2020–23 → IRO 2020–23 → WRO 2023 & 2025 → Robotics & Programming Club president → RIT → MakeCU / Tiger Games '26 |
| 7 | Contact | Shipping label form, with social links on label-maker tape | Formspree form (same endpoint as v1) with a "send me the resume PDF" checkbox. GitHub · LinkedIn · YouTube · email |

**Mobile (under 768 px).** The caliper becomes a horizontal ruler under the nav that fills as you scroll. Objects stack in one column with small fixed rotations (±3°). The 3D model loads only when you tap "load model", to save data. The parts-bin row scrolls sideways.

## Tech approach (recommended)

- **Vite + React 19**, a single page with anchor navigation.
- **react-three-fiber + drei** for the archive section only, lazy-loaded when it comes near the viewport. One shared canvas.
- **motion** (Framer Motion) for the hero sequence and object interactions.
- **Plain CSS with custom properties.** No Tailwind, which keeps the design tokens in one place.
- **Assets:** a build-time script converts the photos and certificates to WebP at 1600 px (plus 600 px thumbnails) using `sharp`, and the GLB models are compressed with `gltf-transform` (meshopt + webp textures). The 19.5 MB `circuit.glb` is dropped.
- The SVG props (caliper, solder spool, resistors, ESP32, tape, binder clip) are drawn by hand as inline SVG, not stock art.
- Deployed on Vercel, as before.

Two other options were considered: Astro (static, fewer JS), and pure HTML with Three.js. Both were rejected because the v1 3D components and name tag are already React and porting them is cheapest.

## Quality floor

Keyboard reachable throughout, visible focus rings (signal orange), alt text on every photo, `prefers-reduced-motion`, no horizontal scroll at 360 px, and a Lighthouse performance score of 90 or more on desktop.

## Defaults I've chosen (correct me)

- **Dropped:** the custom target cursor and the full-screen loader. A cutting mat reads better with a normal cursor, and the hero animation does the loader's job.
- **The site is in English.** The name tag keeps the multi-language switch.
- **The FabriCUe and Space Ducky photos** will be placeholders until Mahir sends real photos.

## Open questions

1. A one-line description for each of the six archive models (which competition, year, his role). Placeholder copy will be clearly marked until then.
2. Photos for FabriCUe and Space Ducky.
3. **Pushing to GitHub:** the Claude GitHub App isn't installed on `tajwarTX/portfolio-v2` yet, so this session can't push. It can build locally in the meantime.
