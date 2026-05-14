# Poker BTI

**Poker Behavior Type Indicator** — a 16-personality test for Texas Hold'em
players. Twelve quick questions reveal which kind of player you really are at
the table.

👉 **Try it online: <https://predatorray.github.io/poker-bti/>**

![Result page screenshot](https://raw.githubusercontent.com/predatorray/poker-bti/assets/screenshot-result.png)

Built as a React + MUI single-page application, designed to be hosted on
GitHub Pages.

## Stack

- React 19 + TypeScript (Create React App)
- MUI 7
- `react-router-dom` 7 (BrowserRouter, prerendered routes for GitHub Pages)
- Lightweight in-house i18n (English + 简体中文)
- Jest + React Testing Library (unit tests)
- Playwright (end-to-end tests, desktop + mobile profiles)

## The four dimensions

| Axis | First pole | Second pole |
|------|------------|-------------|
| **N / M** | **N**it (tight range, lots of folds) | **M**aniac (wide range, any two cards) |
| **S / C** | **S**hover (bet/raise, take initiative) | **C**aller (check/call, see what happens) |
| **G / V** | **G**TO Gremlin (math, frequencies, solvers) | **V**ibes Merchant (reads, intuition) |
| **I / T** | **I**ce (stoic, no tilt) | **T**ilt Monster (chases losses, fires up) |

Sixteen possible codes — e.g. `NSGI` (The Cyborg), `MCVT` (The Action Junkie).

## Local development

```bash
npm install
npm start            # dev server on http://localhost:3000
npm run build        # production bundle
npm test             # unit tests (watch mode)
npm run test:ci      # unit tests (single run)
npm run e2e:install  # one-time: download Playwright Chromium
npm run e2e          # run end-to-end tests
```

## Deploy

The `homepage` field in `package.json` is set for
`https://predatorray.github.io/poker-bti`. To deploy:

```bash
npm run deploy
```

This builds and publishes the bundle to the `gh-pages` branch.
