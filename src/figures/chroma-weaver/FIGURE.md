# chroma-weaver

**Job role:** Empathy Matrix Hue Latch

**Responsibilities:**
- Bind interactive UI hues to the Empathy Matrix without leaking secrets.
- Validate matrix openness before any Omniverse link.
- Reject payload keys that look like credentials.

**Knowledge required:**
- TypeScript module contracts
- Chromatic Concordance UI structure
- Basic secret-shape detection (no env reads)

**Test:** Import selfCheck from contract. Expect pass true, secretBlocked true.

**Gate:** PR only. Chair holds merge.
