import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const card = JSON.parse(readFileSync(join(__dirname, 'spectrum.json'), 'utf8'));

const banned = new Set(card.banned);
if (banned.has(card.figure)) throw new Error('banned figure id');

const N = card.nodes, V = card.velocity, S = card.streak, D = card.decision;
const dens = Math.pow(N * V * S * D, 0.25);
const rounded = Math.round(dens * 1000) / 1000;
if (Math.abs(rounded - card.expectedDensity) > 0.001) {
  throw new Error(`density mismatch: got ${rounded}, expected ${card.expectedDensity}`);
}

if (card.gate !== 'pr-only') throw new Error('gate must be pr-only');

console.log(`ok spectrum-binder density=${rounded}`);
process.exit(0);
