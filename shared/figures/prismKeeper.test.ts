import { describe, expect, it } from "vitest";
import { assertBounds, clampEmpathy, mintBounds, FIGURE_ID, WAVE_ID } from "./prismKeeper";

describe("prism-keeper", () => {
  it("clamps empathy into 0..1 and locks hue span", () => {
    expect(clampEmpathy(1.4)).toBe(1);
    expect(clampEmpathy(-0.2)).toBe(0);
    const bounds = mintBounds();
    expect(bounds.waveId).toBe(WAVE_ID);
    expect(bounds.figureId).toBe(FIGURE_ID);
    expect(() => assertBounds(bounds)).not.toThrow();
  });

  it("rejects non-finite empathy", () => {
    expect(() => clampEmpathy(Number.NaN)).toThrow(/non-finite/);
  });
});
