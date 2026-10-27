import { readFileSync } from 'node:fs';
const card = JSON.parse(readFileSync(new URL('./binder.json', import.meta.url), 'utf8'));
if (card.figureId !== 'chromalink-binder') throw new Error('id mismatch');
if (Math.abs(card.expectedDensity - 8.214) > 0.001) throw new Error('density drift');
console.log('ok chromalink-binder density=8.214');
