# PDF Studio

A lightweight, mobile-friendly PDF editor. Node.js serves the app; all PDF processing happens in the browser, so documents are never uploaded.

## Run
```bash
npm install
npm start          # http://localhost:3000   (PORT=8080 npm start to change)
```
Docker: `docker build -t pdf-studio . && docker run -p 3000:3000 pdf-studio`

## Features
- Annotate: text, freehand, highlight, box, ellipse, line, redact, images, drawn signature; move, edit, delete, undo/redo
- Pages: rotate, delete, duplicate, reorder, insert blank, merge, extract, watermark, page numbers, page to PNG
- Installable PWA (works offline after first load), dark/light theme, touch friendly

## Layout
- `server.js`: Express static server (gzip, security headers, serves pdf.js and pdf-lib from node_modules)
- `public/index.html`: the whole UI and editor logic
- `public/sw.js`, `manifest.webmanifest`: offline and install support

## Notes
Text annotations use Latin characters (standard PDF font). Editing a PDF's existing text, form filling, OCR and encryption are not included. Note: on phones, service workers and installation require HTTPS (or localhost).
