/**
 * Example Usage of Shared Core Package
 * 
 * This file demonstrates how to import and use types from the shared-core package
 * across different parts of the application.
 */

// ============================================================================
// Import Examples
// ============================================================================

// Node Types
import {
  ConcordanceNode,
  JellybodNode,
  EmpathyMatrix,
  QuestPhase,
  QuestStatus,
  RecoveryStatus,
  RealmNodeType,
  DataColor,
} from "@chromatic-concordance/shared-core";

// Relationship Types
import {
  Relationship,
  DataStream,
  RealmConnection,
  RelationshipNetwork,
  RelationshipType,
  RelationshipStrength,
  FlowDirection,
} from "@chromatic-concordance/shared-core";

// Game State Interfaces
import {
  GameState,
  QuestProgress,
  UserMetrics,
  MLPrediction,
  QuestReward,
  PredictionType,
  RewardType,
} from "@chromatic-concordance/shared-core";

// Theme Tokens
import {
  Theme,
  SpudverseColors,
  DarkThemeColors,
  LightThemeColors,
  ChartColors,
  Typography,
  Spacing,
  BorderRadius,
  AnimationDuration,
} from "@chromatic-concordance/shared-core";

// ============================================================================
// Usage Examples
// ============================================================================

// Example 1: Creating a Concordance Node
const exampleNode: ConcordanceNode = {
  id: "node-potato-1",
  type: "potato-planet",
  name: "Potato Wisdom Node",
  phase: "potato",
  status: "in-progress",
  dataColor: "empathy",
  chargeLevel: 65,
  health: 80,
  position: { x: 100, y: 200, z: 0 },
  metadata: {
    description: "A node representing the Potato Planet realm",
  },
};

// Example 2: Creating a Jellybod Node
const exampleJellybod: JellybodNode = {
  id: "jellybod-player-1",
  type: "void",
  name: "Player Jellybod",
  phase: "intro",
  status: "in-progress",
  dataColor: "concordance",
  chargeLevel: 0,
  health: 100,
  wobbleIntensity: 50,
  luminescence: 75,
  avatarColor: SpudverseColors.jellybod,
};

// Example 3: Creating a Data Stream
const exampleDataStream: DataStream = {
  id: "stream-potato-to-schultz",
  type: "data-stream",
  sourceNodeId: "node-potato-1",
  targetNodeId: "node-schultz-1",
  strength: "strong",
  dataColor: "empathy",
  flowDirection: "unidirectional",
  bandwidth: 85,
  latency: 50,
  active: true,
  particleCount: 100,
  flowRate: 30,
  visualEffect: "bioluminescent",
};

// Example 4: Creating Quest Progress
const exampleQuestProgress: QuestProgress = {
  id: 1,
  userId: 123,
  questId: "jellybod-chromatic-concordance",
  questName: "Chromatic Concordance",
  phase: "potato",
  empathyCharge: 65,
  logicCharge: 45,
  concordanceLevel: 55,
  matrixHealth: 80,
  status: "in-progress",
  startedAt: new Date(),
  updatedAt: new Date(),
};

// Example 5: Using Theme Colors
const styledComponent = {
  backgroundColor: DarkThemeColors.background,
  color: DarkThemeColors.foreground,
  empathyColor: SpudverseColors.empathy,
  logicColor: SpudverseColors.logic,
  concordanceColor: SpudverseColors.concordance,
  fontFamily: Typography.fontDisplay,
  fontSize: Typography.fontSize.xl,
  padding: Spacing[4],
  borderRadius: BorderRadius.lg,
};

// Example 6: Type-safe phase transitions
const getNextPhase = (currentPhase: QuestPhase): QuestPhase => {
  const phaseOrder: QuestPhase[] = ["intro", "potato", "schultz", "synapse", "complete"];
  const currentIndex = phaseOrder.indexOf(currentPhase);
  return phaseOrder[Math.min(currentIndex + 1, phaseOrder.length - 1)];
};

// Example 7: Creating a complete game state
const exampleGameState: GameState = {
  userMetrics: {
    id: 1,
    userId: 123,
    daysSober: 30,
    xp: 1500,
    questsCompleted: 5,
    stabilityIndex: "0.85",
    recoveryStatus: "stable",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  questProgress: exampleQuestProgress,
  predictions: [],
  rewards: [],
  timestamp: new Date(),
};

// Example 8: Relationship Network
const exampleNetwork: RelationshipNetwork = {
  nodes: ["node-potato-1", "node-schultz-1", "node-synapse-1"],
  relationships: [exampleDataStream],
  totalBandwidth: 85,
  averageLatency: 50,
  networkHealth: 90,
};

console.log("Shared core types are working correctly!");
