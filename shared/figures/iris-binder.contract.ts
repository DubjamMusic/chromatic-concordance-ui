/**
 * Wave Q prism — iris-binder
 * Repo: chromatic-concordance-ui
 * Role: hue binder for the Empathy Matrix mock.
 * Knowledge required: a hue may bind only to a named matrix node,
 * and only to a hue already used by the concordance palette
 * (violet, amber, cyan, rose). Quest phase enums and drizzle schema
 * stay owned by shared-core and are out of scope.
 * Primary path: shared/figures/iris-binder.contract.ts
 */
export const WAVE_ID = "Q-prism-20261005" as const;
export const FIGURE_ID = "iris-binder" as const;
export const ROLE = "hue-binder" as const;

export const PALETTE = ["violet", "amber", "cyan", "rose"] as const;
export type ConcordanceHue = (typeof PALETTE)[number];

export interface HueBind {
  waveId: typeof WAVE_ID;
  figureId: typeof FIGURE_ID;
  nodeId: string;
  hue: ConcordanceHue;
  bound: true;
}

export function bindHue(nodeId: string, hue: string): HueBind {
  const trimmed = nodeId.trim();
  if (!trimmed) {
    throw new Error("iris-binder requires a named matrix node");
  }
  if (!PALETTE.includes(hue as ConcordanceHue)) {
    throw new Error("hue must be violet, amber, cyan, or rose");
  }
  return {
    waveId: WAVE_ID,
    figureId: FIGURE_ID,
    nodeId: trimmed,
    hue: hue as ConcordanceHue,
    bound: true,
  };
}

export function isBound(bind: HueBind): boolean {
  return (
    bind.figureId === FIGURE_ID &&
    bind.bound === true &&
    PALETTE.includes(bind.hue) &&
    bind.nodeId.length > 0
  );
}

/** Measurable self-check. Expected: pass=true, stray=false, emptyRejected=true. */
export function selfCheck(): { pass: boolean; stray: boolean; emptyRejected: boolean } {
  const bound = bindHue("jellybod-empathy-01", "violet");
  let emptyRejected = false;
  try {
    bindHue("  ", "amber");
  } catch {
    emptyRejected = true;
  }
  return {
    pass: isBound(bound) && bound.hue === "violet",
    stray: PALETTE.includes("lime" as ConcordanceHue),
    emptyRejected,
  };
}
