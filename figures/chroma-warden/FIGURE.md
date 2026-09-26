# CHROMA-WARDEN-26 — Empathy Tile

WAVE_ID: `2026-09-26-k-axle`
Repo: `DubjamMusic/chromatic-concordance-ui`
Merge policy: **pr-only**

## Job
Bind a scored empathy-tile card so the Empathy Matrix and Omniverse links stay the public face without rewriting `client/` or `shared-core/`. This is not spectrum-binder (Wave E ember). New figure, new path, new wave id.

## Responsibilities
- Own `tile.json` only.
- Print a reproducible density to three decimals.
- Keep merge policy pr-only.

## Knowledge required
- Density = (N^wN * V^wV * S^wS * D^wD)^(1 / totalWeight).
- Tile scores the concordance surface; it does not restyle the quest UI.
- Chair holds merge.

## Primary path this wave
`figures/chroma-warden/**` only.

## Out of scope
Do not rewrite `client/`, `server/`, or `PRODUCT_DIRECTION.md` this wave. Quest-UI restyle is a separate issue.
