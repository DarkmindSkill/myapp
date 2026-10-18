'use strict';
const express = require('express');
const compression = require('compression');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

// Locate an installed package directory (works with hoisted or nested node_modules).
const pkgDir = (name) => {
  try { return path.dirname(require.resolve(`${name}/package.json`)); }
  catch { return path.join(__dirname, 'node_modules', name); }
};

app.disable('x-powered-by');
app.use(compression());
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "worker-src 'self' blob:",
      "connect-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; '),
  });
  next();
});

// PDF engines are served from node_modules, so the app works fully offline/self-hosted.
const longCache = { maxAge: '7d', immutable: true };
app.use('/vendor/pdfjs', express.static(path.join(pkgDir('pdfjs-dist'), 'build'), longCache));
app.use('/vendor/pdf-lib', express.static(path.join(pkgDir('pdf-lib'), 'dist'), longCache));

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders(res, file) {
    if (/\.(html|webmanifest)$|sw\.js$/.test(file)) res.set('Cache-Control', 'no-cache');
  },
}));

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`PDF Studio running at http://localhost:${PORT}`));
