/**
 * pigment-cartographer — Wave Q glaze
 * Repo: DubjamMusic/chromatic-concordance-ui
 * Primary path: shared/pigmentCartographer.ts
 *
 * Job: empathy pigment mapper.
 * Knowledge: a tile is charted only when hue, empathy band, and
 * omniverse link are present and the hue is a 6-digit hex.
 * Does not rewrite the Empathy Matrix UI and does not merge.
 */

export const WAVE_ID = "Q-glaze-20261009";
export const FIGURE_ID = "pigment-cartographer";

const HEX = /^#[0-9a-fA-F]{6}$/;
const BANDS = ["calm", "focus", "strain", "surge"] as const;
export type EmpathyBand = (typeof BANDS)[number];

export type PigmentTile = {
  hue: string;
  band: EmpathyBand;
  omniverseLink: string;
};

export function chartPigment(tile: Partial<PigmentTile> | null | undefined) {
  if (!tile) {
    return { waveId: WAVE_ID, figureId: FIGURE_ID, pass: false, reason: "missing-tile" };
  }
  if (!tile.hue || !HEX.test(tile.hue)) {
    return { waveId: WAVE_ID, figureId: FIGURE_ID, pass: false, reason: "hue-invalid" };
  }
  if (!tile.band || !BANDS.includes(tile.band)) {
    return { waveId: WAVE_ID, figureId: FIGURE_ID, pass: false, reason: "band-invalid" };
  }
  if (!tile.omniverseLink || !tile.omniverseLink.startsWith("omniverse://")) {
    return { waveId: WAVE_ID, figureId: FIGURE_ID, pass: false, reason: "link-invalid" };
  }
  return {
    waveId: WAVE_ID,
    figureId: FIGURE_ID,
    role: "empathy pigment mapper",
    pass: true,
    reason: "tile-charted",
    hue: tile.hue.toLowerCase(),
    band: tile.band,
  };
}

export function selfCheck() {
  const ok = chartPigment({
    hue: "#7C5CFF",
    band: "focus",
    omniverseLink: "omniverse://concordance/empathy",
  });
  const bad = chartPigment({ hue: "purple", band: "focus", omniverseLink: "omniverse://x" });
  if (!ok.pass || bad.pass) throw new Error("pigment-cartographer self-check failed");
  return { figureId: FIGURE_ID, waveId: WAVE_ID, checks: 2, pass: true as const };
}
