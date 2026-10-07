/** Runnable check. No network. No secrets. node shared/figures/prismCartographer.check.mjs */
const HUE_WEIGHT = { crimson: 3, amber: 5, violet: 7, teal: 11 };

function chartKeel(nodes) {
  if (!nodes.length) throw new Error("empty");
  const seen = new Set();
  let acc = 0;
  for (const node of nodes) {
    if (!node.id || seen.has(node.id)) throw new Error("dup");
    seen.add(node.id);
    if (node.empathy < 0 || node.empathy > 1) throw new Error("range");
    acc += HUE_WEIGHT[node.hue] * Math.round(node.empathy * 100);
  }
  return `keel:prism-cartographer:${nodes.length}:${acc}`;
}

const sample = [
  { id: "empathy-core", hue: "violet", empathy: 0.8 },
  { id: "omniverse-link", hue: "teal", empathy: 0.5 },
  { id: "quest-hue", hue: "amber", empathy: 1 },
];
const keel = chartKeel(sample);
const expected = "keel:prism-cartographer:3:1610";
if (keel !== expected) {
  console.error("FAIL", keel, "!=", expected);
  process.exit(1);
}
let threw = false;
try {
  chartKeel([]);
} catch {
  threw = true;
}
if (!threw) {
  console.error("FAIL empty matrix was accepted");
  process.exit(1);
}
console.log("PASS", keel);
