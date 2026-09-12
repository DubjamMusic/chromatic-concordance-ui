# Chromatic Concordance

Chromatic Concordance is an interactive capability-readiness workspace prototype. It helps teams map relationships between initiatives, skills, dependencies, evidence, and risks, then turn that map into a clear next-action brief.

The current repository contains an immersive visual prototype and a shared domain model. The product direction is documented in [PRODUCT_DIRECTION.md](./PRODUCT_DIRECTION.md). The visual quest metaphor is retained as an optional workshop/demo mode; it is not a health, recovery, financial, or diagnostic product.

## Current status

- **Prototype:** interactive relationship and readiness visualization
- **Target buyer:** product, operations, enablement, and consulting teams
- **Next beta milestone:** persistent capability maps, transparent readiness indicators, and exportable briefs
- **Important limitation:** prediction and recommendation flows are currently simulated and must not be presented as validated production intelligence

## Development

```bash
npm install
npm run check
npm run test
npm run build
```

## Product scope

See [PRODUCT_DIRECTION.md](./PRODUCT_DIRECTION.md) for the buyer, packaging hypotheses, copy guardrails, and build order.

## Repository hygiene

- Do not commit `.env` files, credentials, database dumps, or generated build artifacts.
- Keep shared domain types in `shared-core` until a versioned package and CI workflow are established.
- Treat all recommendation and prediction output as prototype behavior until it is backed by documented inputs, evaluation, and an explicit limitation state.
