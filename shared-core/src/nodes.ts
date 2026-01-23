/**
 * Concordance Node Types
 * 
 * Represents the different types of nodes in the Chromatic Concordance system.
 * These nodes form the building blocks of the Empathy Matrix and Omniverse linking.
 */

/**
 * Core phases of the Chromatic Concordance quest
 */
export type QuestPhase = "intro" | "potato" | "schultz" | "synapse" | "complete";

/**
 * Status of a quest or node
 */
export type QuestStatus = "in-progress" | "completed" | "abandoned";

/**
 * Recovery status levels for user metrics
 */
export type RecoveryStatus = "stable" | "at-risk" | "critical" | "thriving";

/**
 * Types of realm nodes in the Omniverse
 */
export type RealmNodeType = "potato-planet" | "schultz-world" | "synapse" | "void";

/**
 * Data color types used for visualization
 */
export type DataColor = "empathy" | "logic" | "concordance" | "neutral";

/**
 * Represents a node in the Concordance system
 */
export interface ConcordanceNode {
  id: string;
  type: RealmNodeType;
  name: string;
  phase: QuestPhase;
  status: QuestStatus;
  dataColor: DataColor;
  chargeLevel: number; // 0-100
  health: number; // 0-100
  position?: {
    x: number;
    y: number;
    z?: number;
  };
  metadata?: Record<string, unknown>;
}

/**
 * Represents a Jellybod entity in the system
 */
export interface JellybodNode extends ConcordanceNode {
  type: RealmNodeType;
  wobbleIntensity: number; // 0-100
  luminescence: number; // 0-100
  avatarColor?: string;
}

/**
 * Matrix representation showing the state of connections
 */
export interface EmpathyMatrix {
  health: number; // 0-100
  empathyLevel: number; // 0-100
  logicLevel: number; // 0-100
  concordanceLevel: number; // 0-100
  currentPhase: QuestPhase;
  stability: number; // 0-100
}
