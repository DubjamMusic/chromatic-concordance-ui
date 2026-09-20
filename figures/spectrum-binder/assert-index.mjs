#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const card = JSON.parse(readFileSync(join(root, 'figures/spectrum-binder/matrix-index.json'), 'utf8'));

if (card.figureId !== 'spectrum-binder') throw new Error('bad figureId');
if (card.surfaces.length < 6) throw new Error('need 6+ surfaces');
const banned = ['planner', 'executor', 'monitor', 'data_agent'];
if (banned.some((t) => card.figureId.includes(t))) throw new Error('banned token');

let ok = 0;
for (const s of card.surfaces) {
  if (s.path.includes('/ui/')) throw new Error('ui primitive leaked: ' + s.path);
  if (!existsSync(join(root, s.path))) throw new Error('missing ' + s.path);
  ok += 1;
}
console.log(`ok spectrum-binder ${ok}/${card.surfaces.length}`);
