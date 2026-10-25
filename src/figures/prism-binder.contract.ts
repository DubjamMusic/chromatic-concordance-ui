/**
 * prism-binder — chromatic bind latch for empathy matrix nodes.
 * WAVE_ID: 2026-10-25-q-rift
 * Not a repeat of prior figures (quill-latch, forge-caller, flux-warden, lumen-teller, orbit-mason).
 */

export const FIGURE_ID = "prism-binder";
export const WAVE_ID = "2026-10-25-q-rift";

const BANNED = ["planner", "executor", "monitor", "data_agent", "planner-alpha", "executor-beta"];

export function bindNode(nodeId: string, figureId: string): { bound: boolean; leak: boolean } {
  if (BANNED.includes(figureId.toLowerCase())) {
    return { bound: false, leak: true };
  }
  return { bound: true, leak: false };
}

export function selfCheck(): { pass: boolean; bound: boolean; leakBlocked: boolean } {
  const ok = bindNode("empathy-matrix-1", FIGURE_ID);
  const banned = bindNode("test", "planner");
  return {
    pass: ok.bound && !ok.leak && !banned.bound && banned.leak,
    bound: ok.bound,
    leakBlocked: banned.leak,
  };
}

// Expected selfCheck: { pass: true, bound: true, leakBlocked: true }
