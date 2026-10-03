#!/usr/bin/env node
/**
 * Wave S crest — iris-scribe
 * Repo: DubjamMusic/chromatic-concordance-ui
 * Role: empathy hue ledger. Record a named hue band for the Concordance
 * canvas without rewriting the Empathy Matrix view.
 * Knowledge: chroma-warden (Wave K) and spectrum-binder (Wave E) are
 * predecessors, not this figure. Boardroom enum tokens are banned.
 * Primary path: roster/s-crest/iris-scribe.mjs
 * Merge policy: pr-only. Chair holds the gate.
 */
const WAVE_ID = "S-crest-20261003";
const FIGURE_ID = "iris-scribe";
const BANNED = ["planner", "executor", "monitor", "data_agent", "planner-alpha", "executor-beta"];
const HUE_BANDS = ["amber", "violet", "teal", "crimson"];

const card = {
  figureId: FIGURE_ID,
  codename: "IRIS-SCRIBE-03",
  waveId: WAVE_ID,
  repo: "DubjamMusic/chromatic-concordance-ui",
  role: "empathy-hue-ledger",
  duty: "Stamp one hue band onto the Concordance ledger without touching the matrix view.",
  knowledge: [
    "Empathy Matrix view stays frozen this wave",
    "chroma-warden owns the tile contract from Wave K",
    "spectrum-binder owns the earlier index from Wave E",
  ],
  predecessorNotThisWave: "chroma-warden",
  sample: { N: 8.2, V: 8.4, S: 7.6, D: 8.6 },
  weights: { N: 0.3, V: 0.2, S: 0.2, D: 0.3 },
  expectedDensity: 8.232,
  mergePolicy: "pr-only",
};

function density(sample, weights) {
  const total = weights.N + weights.V + weights.S + weights.D;
  const raw =
    sample.N ** weights.N *
    sample.V ** weights.V *
    sample.S ** weights.S *
    sample.D ** weights.D;
  return Math.round(raw ** (1 / total) * 1000) / 1000;
}

function stampHue(band) {
  if (!HUE_BANDS.includes(band)) {
    throw new Error("iris-scribe accepts amber, violet, teal, crimson");
  }
  const identity = [card.figureId, card.role, card.duty, ...card.knowledge].join(" ").toLowerCase();
  for (const token of BANNED) {
    if (identity.includes(token)) throw new Error("banned token " + token);
  }
  const scored = density(card.sample, card.weights);
  if (scored !== card.expectedDensity) {
    throw new Error("density mismatch got=" + scored);
  }
  if (card.mergePolicy !== "pr-only") throw new Error("merge policy must be pr-only");
  if (card.predecessorNotThisWave === card.figureId) throw new Error("reused predecessor");
  return { waveId: WAVE_ID, figureId: FIGURE_ID, band, density: scored, ready: true };
}

const result = stampHue("violet");
console.log(
  `ok iris-scribe density=${result.density} band=${result.band} ready=${result.ready}`,
);
