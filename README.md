# First5 Analytics — V1

A responsive React/Vite frontend for football match statistics research.

## Run locally
1. Install Node.js (18+).
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`

## Build
Run `npm run build`. The production site is generated in `dist/`.

## Deploy on Render
Create a **Static Site** and connect this GitHub repository.
- Build command: `npm install && npm run build`
- Publish directory: `dist`

## Important data note
This V1 is a frontend prototype. The listed fixtures and events are clearly marked demonstration data. No live football API is connected and no probabilities are generated. The next development step is to choose a free data provider, verify whether it exposes event timestamps, and connect it through a backend so API keys are not exposed in the browser.
