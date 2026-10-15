import { readFileSync } from 'node:fs';
const card = JSON.parse(readFileSync(new URL('./prism.json', import.meta.url)));
const density = (card.nodes ** 0.25 * card.velocity ** 0.25 * card.streak ** 0.25 * card.decision ** 0.25);
const ok = Math.abs(density - card.expectedDensity) < 0.001 && card.figure === 'prism-weaver' && card.gate === 'pr-only';
console.log(ok ? `ok ${card.figure} density=${density.toFixed(3)}` : `fail density=${density}`);
process.exit(ok ? 0 : 1);
