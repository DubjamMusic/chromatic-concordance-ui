# prism-cartographer

Wave `Q-keel-20261007`. One figure, one primary path.

- Role: Empathy Matrix cartographer
- Repo: chromatic-concordance-ui
- Primary path: `shared/figures/prismCartographer.ts`
- Knowledge required: hue channels (crimson/amber/violet/teal), empathy in [0,1], Omniverse link nodes, no secret values
- Responsibilities: reject empty or duplicate nodes, emit a keel checksum, refuse secret material
- Check: `node shared/figures/prismCartographer.check.mjs` expects `PASS keel:prism-cartographer:3:1610`
- Merge policy: PR only. Chair holds the gate.
