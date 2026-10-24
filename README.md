# Raiyaan | Portfolio

Personal portfolio of Abdul Raiyaan, a Computer Science student at Taylor's University focused on AI, automation and web development.

## What's inside

- **Hero** with draggable objects, including a Taylor's University ID card
- **About** with an ASCII-art portrait that reveals on scroll
- **Case files**, a project carousel (Orbit, VaXease, NaviSense, SkyZen, FindBack, UniResource Hub) that opens a brief for each project
- **Degree in progress** with current coursework
- **Stack**, an interactive wireframe sphere of tools and technologies
- **Experience and results**: internship, hackathons and CTFs
- **Sketchbook** with a letter to my future self
- **Off-screen**, **Latest on LinkedIn** and **Contact**

## Tech stack

- Vite 5 and React 18
 components (`@designcodeio/threeui`), with local patches under `src/tui`
- Plain HTML, CSS and JavaScript for the page layout and scroll motion

## Getting started

```bash
npm install
npm run dev
```

The `.npmrc` sets `legacy-peer-deps=true`, so a plain `npm install` works.

## Build

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Use these settings (they are also in `vercel.json`):
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add a custom domain in the Vercel project settings.

`vercel.json` also sets basic security headers.

## Project structure

```
index.html        page markup, styles and scroll/motion script
src/main.jsx      mounts the React components (dock, water, carousel, wireframe, sketchbook)
src/tui/          ThreeUI component sources (patched)
src/sb/           sketchbook pages and fonts
public/           favicon
vercel.json       deploy config and security headers
```

## Accessibility

Scroll animations and the background effect are turned off for visitors who have `prefers-reduced-motion` enabled.

## Contact

- Email: raiyaantops@gmail.com
- LinkedIn: [linkedin.com/in/abdulraiyaan](https://linkedin.com/in/abdulraiyaan)
- GitHub: [github.com/ABDULRAIYAAN](https://github.com/ABDULRAIYAAN)

## License

All rights reserved. Content, design and project write-ups belong to Abdul Raiyaan. Third-party components remain under their own licences (ThreeUI is MIT).
