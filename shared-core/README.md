# Shared Core Package

Shared TypeScript package for models and types used across Chromatic Concordance UI, Nexus, Prestige Console, and Concept Game repositories.

## Installation

```bash
npm install @chromatic-concordance/shared-core
```

## Usage

```typescript
import { 
  // Node types
  ConcordanceNode, 
  JellybodNode, 
  EmpathyMatrix,
  QuestPhase,
  
  // Relationship types
  Relationship,
  DataStream,
  RelationshipNetwork,
  
  // Game state
  GameState,
  QuestProgress,
  UserMetrics,
  
  // Theme tokens
  Theme,
  SpudverseColors,
  Typography,
  Spacing,
} from "@chromatic-concordance/shared-core";
```

## Exports

### Node Types
- `ConcordanceNode` - Base interface for concordance system nodes
- `JellybodNode` - Jellybod entity interface
- `EmpathyMatrix` - Matrix state representation
- `QuestPhase` - Quest phase type
- `QuestStatus` - Quest status type
- `RecoveryStatus` - Recovery status levels
- `RealmNodeType` - Realm node types
- `DataColor` - Data visualization colors

### Relationship Types
- `Relationship` - Base relationship interface
- `DataStream` - Data stream relationship
- `RealmConnection` - Realm connection configuration
- `RelationshipNetwork` - Complete network structure
- `RelationshipType` - Types of relationships
- `RelationshipStrength` - Relationship strength levels
- `FlowDirection` - Data flow directions

### Game State Interfaces
- `GameState` - Complete game state snapshot
- `QuestProgress` - Quest progress tracking
- `UserMetrics` - User recovery metrics
- `MLPrediction` - ML prediction results
- `QuestReward` - Quest reward structure
- `PredictionType` - ML prediction types
- `RewardType` - Reward types

### Theme Tokens
- `Theme` - Complete theme object
- `SpudverseColors` - Core Spudverse colors
- `DarkThemeColors` - Dark theme palette
- `LightThemeColors` - Light theme palette
- `ChartColors` - Chart visualization colors
- `SidebarColors` - Sidebar specific colors
- `Typography` - Typography scale and fonts
- `Spacing` - Spacing scale
- `BorderRadius` - Border radius scale
- `AnimationDuration` - Animation timing constants
- `ZIndex` - Z-index layering scale

## Development

```bash
# Build the package
npm run build

# Watch mode for development
npm run dev

# Type check
npm run check
```

## License

MIT
