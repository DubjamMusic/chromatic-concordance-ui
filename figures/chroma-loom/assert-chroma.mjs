const expected = 8.201;
const density = (8.4 * 8.1 * 7.9 * 8.5) ** 0.25;
if (Math.abs(density - expected) > 0.01) throw new Error('density mismatch');
console.log('ok chroma-loom density=' + density.toFixed(3));
