/**
 * prism-cartographer — Wave Q keel
 * Role: Empathy Matrix cartographer for Chromatic Concordance.
 * Does not touch affirm/challenge loops. Does not read secrets.
 */
export const WAVE_ID = "Q-keel-20261007";
export const FIGURE_ID = "prism-cartographer";

export type HueChannel = "crimson" | "amber" | "violet" | "teal";

export interface MatrixNode {
  id: string;
  hue: HueChannel;
  empathy: number;
}

export interface KeelMark {
  waveId: string;
  figureId: string;
  nodeCount: number;
  keel: string;
  refusedSecrets: true;
}

const HUE_WEIGHT: Record<HueChannel, number> = {
  crimson: 3,
  amber: 5,
  violet: 7,
  teal: 11,
};

export function chartKeel(nodes: MatrixNode[]): KeelMark {
  if (nodes.length === 0) {
    throw new Error("prism-cartographer refuses an empty matrix");
  }
  const seen = new Set<string>();
  let acc = 0;
  for (const node of nodes) {
    if (!node.id || seen.has(node.id)) {
      throw new Error(`duplicate or blank node id: ${node.id}`);
    }
    seen.add(node.id);
    if (node.empathy < 0 || node.empathy > 1 || Number.isNaN(node.empathy)) {
      throw new Error(`empathy out of range for ${node.id}`);
    }
    if (!(node.hue in HUE_WEIGHT)) {
      throw new Error(`unknown hue ${node.hue}`);
    }
    acc += HUE_WEIGHT[node.hue] * Math.round(node.empathy * 100);
  }
  return {
    waveId: WAVE_ID,
    figureId: FIGURE_ID,
    nodeCount: nodes.length,
    keel: `keel:${FIGURE_ID}:${nodes.length}:${acc}`,
    refusedSecrets: true,
  };
}
