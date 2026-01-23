/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// Export shared-core types separately to avoid naming conflicts with drizzle schema
export {
  // Node Types
  type ConcordanceNode,
  type JellybodNode,
  type EmpathyMatrix,
  type QuestPhase,
  type QuestStatus,
  type RecoveryStatus,
  type RealmNodeType,
  type DataColor,
  
  // Relationship Types
  type Relationship,
  type DataStream,
  type RealmConnection,
  type RelationshipNetwork,
  type RelationshipType,
  type RelationshipStrength,
  type FlowDirection,
  
  // Game State Interfaces (prefixed to avoid conflicts)
  type GameState,
  type PredictionType,
  type RewardType,
  type UpdateUserMetrics,
  type UpdateQuestProgress,
  
  // Theme Tokens
  Theme,
  SpudverseColors,
  DarkThemeColors,
  LightThemeColors,
  ChartColors,
  SidebarColors,
  Typography,
  Spacing,
  BorderRadius,
  AnimationDuration,
  ZIndex,
  
  // Type helpers
  type SpudverseColorKey,
  type ChartColorKey,
  type ThemeColorKey,
  type FontSize,
  type FontWeight,
  type SpacingKey,
  type BorderRadiusKey,
} from "@chromatic-concordance/shared-core";
