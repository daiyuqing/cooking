# CodeMirror 6 Demo

A small, self-contained CodeMirror 6 playground built with Vite and TypeScript.

## Features

- Editable CodeMirror 6 editor with `basicSetup` UX (line numbers, history, search, folding, bracket matching, and more)
- Syntax highlighting for **JavaScript** and **Python**
- One Dark theme
- Language switcher and sample-code reset button
- Responsive page chrome around the editor

## Requirements

- Node.js 18+ (recommended)
- npm 9+

## Install and run

From this directory:

```bash
cd codemirror-demo
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Other scripts

```bash
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
```

## Project layout

```
codemirror-demo/
├── index.html
├── package.json
├── src/
│   ├── main.ts      # editor setup
│   ├── style.css    # page styles
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```
