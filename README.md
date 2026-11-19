# Mahir Tajwar Chowdhury · portfolio v2

A single-page portfolio laid out on a dark cutting mat: a name-tag sticker, an engineering drawing, project folders, a 3D parts bin, a certificate stack and a shipping-label contact form.

Design doc and wireframes: [`docs/design/`](docs/design/).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run lint
```

Deploys to Vercel as a static Vite app (`vercel.json`).

## Editing content

All copy and data lives in **`src/data/content.js`**: bio, skills, roles, builds, 3D archive, awards, gallery and timeline.

### Placeholders to replace

| What | Where |
|---|---|
| Bio paragraphs | `person.bio` in `src/data/content.js` (remove the "Placeholder bio" note in `src/sections/About.jsx`) |
| FabriCUe / Space Ducky photos | Add images, then replace `<PhotoPlaceholder>` in `src/sections/Builds.jsx` |
| Archive model details (year, event, role, notes) | `archive` in `src/data/content.js`, and set `placeholder: false`. The lorem notes are in `src/sections/Archive.jsx` |
| Hackathon certificate images | Add a `cert` to the hackathon rows in `awards` |

## Assets

Photos and certificates are WebP files generated from the v1 originals:

```bash
node scripts/optimize-assets.mjs ../mahir-tajwar-chowdhury/src/assets
```

The 3D models in `src/assets/models` were compressed with `gltf-transform optimize --compress meshopt --texture-compress webp`, so they decode locally without a CDN. They only load when the Archive section comes into view (on phones, only after tapping "Load 3D model").

## Stack

Vite · React 19 · motion · react-three-fiber + drei (lazy-loaded) · plain CSS with custom properties. Fonts: Big Shoulders Stencil Display and Archivo, plus the original name-tag handwriting fonts.
