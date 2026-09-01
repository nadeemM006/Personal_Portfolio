# Portfolio

React + TypeScript + Tailwind CSS + GSAP portfolio, built around a
"drafting table" concept — a blueprint grid as real layout structure, and
a draggable 3D instrument in the hero as the one signature motion moment.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

`npm run build` outputs static files to `dist/` — deploy that folder to
Vercel, Netlify, GitHub Pages, or any static host.

## Where to customize

- `src/components/Nav.tsx` — your name in the logo
- `src/components/Hero.tsx` — headline, subhead, CTA text
- `src/data/projects.ts` — your real case studies (title, summary, stack, year)
- `src/components/About.tsx` — bio paragraph and skills lists
- `src/components/Contact.tsx` — email and social links
- `tailwind.config.js` — color palette (`graphite`, `paper`, `amber`, `teal`, `rust`) and fonts
- `src/components/RotatingDial.tsx` — the six facets in the hero instrument

## Stack

React 18, TypeScript, Vite, Tailwind CSS, GSAP (ScrollTrigger for the
case-study reveal). Fonts: Fraunces (display) and IBM Plex Sans / Mono,
loaded from Google Fonts in `index.html`.
