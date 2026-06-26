#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const viteBin = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
const preloader = path.join(process.cwd(), 'scripts', 'polyfill-crypto.cjs');

const result = spawnSync(
  process.execPath,
  ['--require', preloader, viteBin, ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: process.env,
  },
);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 0);
