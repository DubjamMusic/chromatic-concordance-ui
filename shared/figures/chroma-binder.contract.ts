/**
 * chroma-binder — Wave Q forge 20261013
 * Primary path: shared/figures/chroma-binder.contract.ts
 * Role: Bind chromatic layers in the Empathy Matrix without key collisions.
 * Knowledge: UI layer stacking, color-space isolation, no secret keys.
 * Responsibilities: reject duplicate hue slots, allow only named layers.
 * Test: import { selfCheck } from this file; expect { bound: true, collisions: 0 }
 */

export const FIGURE_ID = 'chroma-binder' as const;
export const WAVE_ID = 'Q-forge-20261013' as const;

const ALLOWED_LAYERS = ['empathy', 'omniverse', 'matrix'] as const;

export function bindLayers(layers: string[]): { bound: boolean; collisions: number } {
  const seen = new Set<string>();
  let collisions = 0;
  for (const layer of layers) {
    if (!ALLOWED_LAYERS.includes(layer as any)) continue;
    if (seen.has(layer)) collisions++;
    else seen.add(layer);
  }
  return { bound: collisions === 0 && seen.size === ALLOWED_LAYERS.length, collisions };
}

export function selfCheck() {
  const result = bindLayers(['empathy', 'omniverse', 'matrix']);
  const bad = bindLayers(['empathy', 'empathy', 'matrix']);
  return {
    pass: result.bound && result.collisions === 0 && !bad.bound && bad.collisions > 0,
    bound: result.bound,
    collisions: result.collisions,
  };
}
