# Tower Trials

A retro-style vertical platformer built with TypeScript and HTML5 Canvas for VibeOS.

## Features

- Procedurally generated towers
- Climb, stomp enemies, and survive
- Score system and multiple difficulties

## Controls

- Arrows / A-D — Move
- Space — Jump
- Enter — Start
- R — Restart
- ⚙️ — Open settings

## Run Locally

```bash
cd tower-trials
npm install
npm run dev
```

## Build For VibeOS

```bash
npm run build
```

The static output is placed in `tower-trials/dist` and can be served as-is.

## Run Tests

The project uses [Playwright](https://playwright.dev/) for basic browser testing.

```bash
npm test
```
