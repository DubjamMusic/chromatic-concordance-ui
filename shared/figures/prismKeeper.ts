/**
 * prism-keeper — Wave Q bezel.
 * Owns empathy-matrix display bounds only. No network, no secrets.
 */
export const WAVE_ID = "Q-BEZEL-20261006";
export const FIGURE_ID = "prism-keeper";

export type PrismBounds = {
  waveId: typeof WAVE_ID;
  figureId: typeof FIGURE_ID;
  hueMin: 0;
  hueMax: 360;
  empathyFloor: number;
  empathyCeil: number;
};

export function clampEmpathy(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error("prism-keeper rejects non-finite empathy");
  }
  return Math.min(1, Math.max(0, value));
}

export function mintBounds(): PrismBounds {
  return {
    waveId: WAVE_ID,
    figureId: FIGURE_ID,
    hueMin: 0,
    hueMax: 360,
    empathyFloor: 0,
    empathyCeil: 1,
  };
}

export function assertBounds(bounds: PrismBounds): void {
  if (bounds.waveId !== WAVE_ID) throw new Error("wave mismatch");
  if (bounds.figureId !== FIGURE_ID) throw new Error("figure mismatch");
  if (bounds.hueMin !== 0 || bounds.hueMax !== 360) throw new Error("hue span locked");
  if (bounds.empathyFloor !== 0 || bounds.empathyCeil !== 1) {
    throw new Error("empathy span locked to 0..1");
  }
}
