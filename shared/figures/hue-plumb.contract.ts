/**
 * Wave Q plumb — hue-plumb
 * Repo: chromatic-concordance-ui
 * Role: empathy-hue plumb. Names the only hues the Empathy Matrix may paint.
 * Knowledge required: client UI already mocks the matrix; this file does not
 * edit components and does not replace chroma-warden's Wave K axle tile contract.
 * No env reads, no key material, no omniverse credentials.
 * Primary path: shared/figures/hue-plumb.contract.ts
 */
export const WAVE_ID = "Q-plumb-20261002" as const;
export const FIGURE_ID = "hue-plumb" as const;
export const ROLE = "empathy-hue-plumb" as const;

export const ALLOWED_HUES = ["amber", "violet", "teal"] as const;
export type AllowedHue = (typeof ALLOWED_HUES)[number];

const SECRET_KEYS = ["apikey", "api_key", "secret", "token", "password"];

export interface HuePlumb {
  waveId: typeof WAVE_ID;
  figureId: typeof FIGURE_ID;
  hue: AllowedHue;
  opacity: number;
}

export function plumbHue(hue: string, opacity: number): HuePlumb {
  if (!(ALLOWED_HUES as readonly string[]).includes(hue)) {
    throw new Error(`hue-plumb rejected hue: ${hue}`);
  }
  if (!Number.isFinite(opacity) || opacity < 0.1 || opacity > 1) {
    throw new Error("opacity must be a number from 0.1 to 1");
  }
  return {
    waveId: WAVE_ID,
    figureId: FIGURE_ID,
    hue: hue as AllowedHue,
    opacity,
  };
}

export function rejectsSecrets(payload: Record<string, unknown>): boolean {
  return Object.keys(payload).some((key) =>
    SECRET_KEYS.includes(key.toLowerCase().replace(/[-\s]/g, "_")),
  );
}

/** Measurable self-check. Expected: ok=true, secretBlocked=true. */
export function selfCheck(): { ok: boolean; secretBlocked: boolean } {
  const plumbed = plumbHue("teal", 0.6);
  return {
    ok: plumbed.hue === "teal" && plumbed.opacity === 0.6,
    secretBlocked: rejectsSecrets({ password: "not-a-real-value", hue: "amber" }),
  };
}
