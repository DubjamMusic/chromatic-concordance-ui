# Product Direction: Chromatic Concordance

## Decision

Chromatic Concordance should become a **capability-readiness workspace for AI teams**, not a recovery or health product. The current visual system is a strong differentiator, but the existing copy mixes game fiction, recovery metrics, predictive claims, and career-income projections. That combination is difficult to sell responsibly and makes the product feel unfinished.

## Buyer and use case

The first buyer should be a small-to-mid-sized product, operations, or enablement team that needs to turn scattered signals into a shared view of readiness. The product can help a team map relationships between initiatives, skills, dependencies, risks, and recommended next actions.

A practical first workflow is:

1. Import or enter a team, project, or capability map.
2. Connect nodes with typed relationships such as dependency, evidence, risk, or collaboration.
3. Review a readiness snapshot with transparent indicators and missing evidence.
4. Generate a short action plan and assign follow-up work.
5. Export a shareable brief for a manager, client, or workshop.

## Positioning

> **Chromatic Concordance turns complex capability maps into clear, explainable readiness decisions.**

The visual language remains bioluminescent and memorable, while the product language becomes calm, operational, and evidence-led.

## What to keep

- The bioluminescent visual system and relationship visualization.
- The shared-core package as the seed of a domain model.
- The onboarding relationship taxonomy.
- The quest/progression metaphor as an optional workshop mode, not the main product promise.
- The interactive prototype as a demo and sales asset.

## What to remove or quarantine

- Recovery, sobriety, emotional-state, and health-related metrics.
- Any implication that the product diagnoses, predicts, or improves health outcomes.
- Unverified model-accuracy, retention-uplift, revenue, salary, or financial-freedom claims.
- “Production” language where the implementation is currently simulated or local-only.
- Cross-repository coupling until shared-core has versioning and CI.

## Suggested commercial packaging

| Package | Buyer | Deliverable | Indicative model |
|---|---|---|---|
| Workshop kit | Founder, consultant, team lead | Interactive map, facilitated session, exported readiness brief | Fixed-fee engagement |
| Team workspace | Product or operations team | Persistent maps, roles, history, exports | Per-workspace subscription |
| Embedded intelligence | Larger teams | Integrations, audit trail, custom taxonomy | Annual contract |

These are packaging hypotheses, not promises. Validate them with five customer conversations before building billing or a marketplace listing.

## Build order

1. Rebrand copy and remove risky claims.
2. Add a real readiness snapshot with explicit evidence and confidence labels.
3. Persist maps and relationship edits through the existing tRPC/database layer.
4. Add export/share functionality.
5. Add one narrowly scoped AI assistant that explains gaps and suggests next actions, with source context shown beside every recommendation.
6. Only then spend credits on bespoke visuals, generated demo data, or promotional assets.

## Acceptance criteria for a saleable beta

- A new user understands the product and target buyer within 30 seconds.
- The demo can be completed without health or income claims.
- Every recommendation has visible inputs or an explicit “insufficient evidence” state.
- A user can create, edit, and export a small capability map.
- The README explains setup, product scope, limitations, and the intended buyer.
- Automated checks pass and no generated artifacts or secrets are committed.
