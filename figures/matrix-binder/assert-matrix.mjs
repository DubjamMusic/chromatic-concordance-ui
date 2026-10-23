#!/usr/bin/env node
import { readFileSync } from 'fs';

const matrix = JSON.parse(readFileSync(new URL('./matrix.json', import.meta.url)));
const density = Math.pow(matrix.nodes * matrix.velocity * matrix.streak * matrix.decision, 0.25);
const ok = Math.abs(density - matrix.expectedDensity) < 0.01 && matrix.figure === 'matrix-binder';
console.log(ok ? `ok matrix-binder density=${density.toFixed(3)}` : 'fail');
process.exit(ok ? 0 : 1);
