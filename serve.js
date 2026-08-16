#!/usr/bin/env node
/* ══════════════════════════════════════════════
   HALCYON — zero-dependency static server.

   Range requests matter here: the four chapters scrub video by
   setting currentTime from scroll position, and a browser will only
   report a clip as seekable if the server answers Range requests
   with 206 Partial Content. Python's http.server does not, which
   silently pins every scrub to frame zero.

   Usage:  node serve.js [port]
   ══════════════════════════════════════════════ */
'use strict';

const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');
const url  = require('node:url');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8799;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.txt':  'text/plain; charset=utf-8',
};

function send(res, code, headers, body) {
  res.writeHead(code, headers);
  if (body) res.end(body); else res.end();
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(url.parse(req.url).pathname);
  } catch {
    return send(res, 400, { 'Content-Type': 'text/plain' }, 'Bad request');
  }

  if (pathname.endsWith('/')) pathname += 'index.html';

  // resolve inside ROOT only
  const filePath = path.join(ROOT, path.normalize(pathname));
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    return send(res, 403, { 'Content-Type': 'text/plain' }, 'Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      return send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not found');
    }

    const ext  = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const size = stat.size;

    const base = {
      'Content-Type': type,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
      'Last-Modified': stat.mtime.toUTCString(),
    };

    const range = req.headers.range;

    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
      if (!m) {
        return send(res, 416, { ...base, 'Content-Range': `bytes */${size}` });
      }

      let start, end;
      if (m[1] === '') {
        // suffix range: last N bytes
        const n = parseInt(m[2], 10);
        if (isNaN(n)) return send(res, 416, { ...base, 'Content-Range': `bytes */${size}` });
        start = Math.max(0, size - n);
        end   = size - 1;
      } else {
        start = parseInt(m[1], 10);
        end   = m[2] === '' ? size - 1 : parseInt(m[2], 10);
      }

      if (isNaN(start) || isNaN(end) || start > end || start >= size) {
        return send(res, 416, { ...base, 'Content-Range': `bytes */${size}` });
      }
      end = Math.min(end, size - 1);

      res.writeHead(206, {
        ...base,
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': end - start + 1,
      });
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, { ...base, 'Content-Length': size });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  NORTHLIGHT — portfolio\n  http://127.0.0.1:${PORT}\n`);
  console.log('  Range requests enabled (required for the scroll-scrub chapters).');
  console.log('  Ctrl-C to stop.\n');
});
