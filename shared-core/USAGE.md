# Using Shared-Core Package in Other Repositories

This guide explains how to use the `@chromatic-concordance/shared-core` package in other repositories like Nexus, Prestige Console, and Concept Game.

## Installation Methods

### Method 1: Local File Reference (Development)

In your project's `package.json`:

```json
{
  "dependencies": {
    "@chromatic-concordance/shared-core": "file:../path/to/chromatic-concordance-ui/shared-core"
  }
}
```

Then run:
```bash
npm install
```

### Method 2: Git Repository Reference

```json
{
  "dependencies": {
    "@chromatic-concordance/shared-core": "git+https://github.com/DubjamMusic/chromatic-concordance-ui.git#main:shared-core"
  }
}
```

### Method 3: NPM Package (Future)

Once published to NPM:

```bash
npm install @chromatic-concordance/shared-core
```

## TypeScript Configuration

Update your `tsconfig.json` to include the package:

```json
{
  "compilerOptions": {
    "paths": {
      "@chromatic-concordance/shared-core": ["./node_modules/@chromatic-concordance/shared-core/src"]
    }
  }
}
```

## Usage Examples

### Importing Types

```typescript
// Node Types
import {
  ConcordanceNode,
  JellybodNode,
  EmpathyMatrix,
  QuestPhase,
  DataColor,
} from "@chromatic-concordance/shared-core";

// Relationship Types
import {
  Relationship,
  DataStream,
  RelationshipNetwork,
} from "@chromatic-concordance/shared-core";

// Game State
import {
  GameState,
  QuestProgress,
  UserMetrics,
} from "@chromatic-concordance/shared-core";

// Theme Tokens
import {
  Theme,
  SpudverseColors,
  Typography,
  Spacing,
} from "@chromatic-concordance/shared-core";
```

### Using in React Components

```typescript
import React from "react";
import { QuestPhase, SpudverseColors } from "@chromatic-concordance/shared-core";

interface QuestDisplayProps {
  phase: QuestPhase;
  empathyLevel: number;
}

export const QuestDisplay: React.FC<QuestDisplayProps> = ({ phase, empathyLevel }) => {
  return (
    <div style={{ color: SpudverseColors.empathy }}>
      Current Phase: {phase}
      Empathy Level: {empathyLevel}
    </div>
  );
};
```

### Using in Node.js Backend

```typescript
import {
  QuestProgress,
  UserMetrics,
  GameState,
} from "@chromatic-concordance/shared-core";

// Type-safe API responses
interface QuestApiResponse {
  progress: QuestProgress;
  metrics: UserMetrics;
}

async function getQuestData(userId: number): Promise<QuestApiResponse> {
  // Your API logic here
  return {
    progress: {...},
    metrics: {...},
  };
}
```

### Using Theme in CSS-in-JS

```typescript
import { SpudverseColors, Typography, Spacing } from "@chromatic-concordance/shared-core";

const styles = {
  container: {
    backgroundColor: SpudverseColors.void,
    color: SpudverseColors.empathy,
    fontFamily: Typography.fontDisplay,
    fontSize: Typography.fontSize.xl,
    padding: Spacing[4],
  },
  empathyText: {
    color: SpudverseColors.empathy,
  },
  logicText: {
    color: SpudverseColors.logic,
  },
  concordanceText: {
    color: SpudverseColors.concordance,
  },
};
```

### Type Guards

```typescript
import { QuestPhase, QuestStatus } from "@chromatic-concordance/shared-core";

function isQuestComplete(phase: QuestPhase): boolean {
  return phase === "complete";
}

function canProgressToNextPhase(
  currentPhase: QuestPhase,
  empathyLevel: number,
  logicLevel: number
): boolean {
  switch (currentPhase) {
    case "intro":
      return true;
    case "potato":
      return empathyLevel >= 50;
    case "schultz":
      return logicLevel >= 50;
    case "synapse":
      return empathyLevel >= 100 && logicLevel >= 100;
    case "complete":
      return false;
  }
}
```

## Integration with Vite/Webpack

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@chromatic-concordance/shared-core": path.resolve(
        __dirname,
        "node_modules/@chromatic-concordance/shared-core/src"
      ),
    },
  },
});
```

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      "@chromatic-concordance/shared-core": path.resolve(
        __dirname,
        "node_modules/@chromatic-concordance/shared-core/src"
      ),
    },
  },
};
```

## Development Workflow

### Local Development with Multiple Repos

1. Clone both repositories side by side:
   ```bash
   /projects
     /chromatic-concordance-ui
     /nexus
   ```

2. Link the package in your project:
   ```bash
   cd /projects/nexus
   npm install file:../chromatic-concordance-ui/shared-core
   ```

3. When changes are made to shared-core:
   ```bash
   cd /projects/chromatic-concordance-ui/shared-core
   npm run build
   ```

4. Rebuild your consuming project:
   ```bash
   cd /projects/nexus
   npm run build
   ```

### Using npm link (Alternative)

```bash
# In the shared-core directory
cd /projects/chromatic-concordance-ui/shared-core
npm link

# In your consuming project
cd /projects/nexus
npm link @chromatic-concordance/shared-core
```

## Best Practices

1. **Always import from the package root**
   ```typescript
   // Good
   import { QuestPhase } from "@chromatic-concordance/shared-core";
   
   // Avoid
   import { QuestPhase } from "@chromatic-concordance/shared-core/dist/nodes";
   ```

2. **Use type imports when possible**
   ```typescript
   import type { QuestPhase, UserMetrics } from "@chromatic-concordance/shared-core";
   ```

3. **Keep theme tokens centralized**
   - Use SpudverseColors for consistent colors
   - Use Typography tokens for fonts and sizes
   - Use Spacing tokens for consistent spacing

4. **Version consistency**
   - Keep all repos using the same version of shared-core
   - Update all repos when breaking changes are made

## Troubleshooting

### Module not found errors

If you get "Cannot find module" errors:

1. Check that the package is properly installed:
   ```bash
   npm list @chromatic-concordance/shared-core
   ```

2. Verify the TypeScript paths in `tsconfig.json`

3. Clear your build cache:
   ```bash
   rm -rf node_modules/.cache
   rm -rf dist
   npm install
   ```

### Type errors after updates

1. Rebuild the shared-core package:
   ```bash
   cd shared-core
   npm run build
   ```

2. Reinstall in consuming project:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Build errors in production

Make sure to build shared-core before building your project:

```json
{
  "scripts": {
    "prebuild": "cd node_modules/@chromatic-concordance/shared-core && npm run build",
    "build": "vite build"
  }
}
```

## Contributing

When adding new types to shared-core:

1. Add the type definition in the appropriate file (nodes.ts, relationships.ts, game-state.ts, or theme.ts)
2. Export it from `src/index.ts`
3. Build the package: `npm run build`
4. Update the README.md with usage examples
5. Test in the consuming repositories
6. Commit and push changes

## Support

For issues or questions, please open an issue on the GitHub repository.
