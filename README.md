# Crafty

Crafty is a small React website for exploring One District One Product (ODOP) handicrafts and their Geographical Indication (GI) reference details. It includes a browser-side image colour comparison as an educational indicator.

## Live demo

Visit Crafty: https://vercel-stage-bice.vercel.app

> The photo check is not an AI model, an authenticity certificate, or a substitute for checking official GI records. It compares average image colour with a simple category palette and cannot verify materials, weave, maker, or origin.

## Features

- Browse 23 craft records, including their state, district, description, GI number, and registration year.
- Search by craft, district, or state; filter by state, district, craft type, and GI tag.
- Read individual craft pages and practical craft observation tips.
- Upload a JPG or PNG under 5 MB, select a craft, and compare broad colour cues.
- Save favourite crafts and scan summaries in browser `localStorage`.
- Switch between light and dark themes.
- Try a local demo sign-in form. Account details are stored in this browser and are not protected by a server; do not use a real password.

## Built with

- React 18 and React Router
- Vite 6
- Tailwind CSS 3
- Zod validation
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The generated static site is written to `dist/`. The `vercel.json` file rewrites page requests to the React entry point so client-side routes work when deployed.

## Main routes

| Path | Page |
| --- | --- |
| `/` | Home and photo colour check |
| `/library` | Craft catalogue |
| `/craft/:id` | Craft details |
| `/about` | Project background and limitations |
| `/tips` | Craft observation tips |
| `/account` | Local demo sign-in and registration |

## Project structure

```text
src/
  App.jsx                    Page layouts and routes
  main.jsx                   React entry point and providers
  index.css                  Tailwind directives and global styles
  contexts/ThemeContext.jsx  Light/dark theme context
  data/crafts.json           Craft reference records
  hooks/useCraftScan.js      Upload validation and colour comparison
  hooks/useLocalStorage.js   Browser persistence helper
  schemas/imageUploadSchema.js Zod image-upload rules
```
