#!/usr/bin/env node

const { webcrypto } = require('node:crypto');

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

if (typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}

import('vite/bin/vite.js');
