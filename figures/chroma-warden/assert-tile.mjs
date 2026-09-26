#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const card = JSON.parse(readFileSync(join(here, 'tile.json'), 'utf8'));

if (card.figureId !== 'chroma-warden') throw new Error('bad figureId');
if (card.predecessorNotThisWave === card.figureId) throw new Error('reused predecessor');
if (card.waveId !== '2026-09-26-k-axle') throw new Error('bad waveId');
const banned = ['planner', 'executor', 'monitor', 'data_agent'];
const identity = [card.figureId, card.codename, card.role, ...(card.knowledge || [])]
  .join(' ')
  .toLowerCase();
for (const token of banned) {
  if (identity.includes(token)) throw new Error('banned token ' + token);
}
const w = card.weights;
const s = card.sample;
const total = w.N + w.V + w.S + w.D;
const density =
  Math.pow(
    Math.pow(s.N, w.N) * Math.pow(s.V, w.V) * Math.pow(s.S, w.S) * Math.pow(s.D, w.D),
    1 / total,
  );
const rounded = Math.round(density * 1000) / 1000;
if (rounded !== card.expectedDensity) {
  throw new Error('density mismatch got=' + rounded + ' expected=' + card.expectedDensity);
}
if (card.mergePolicy !== 'pr-only') throw new Error('merge policy must be pr-only');
console.log(`ok chroma-warden density=${rounded}`);
