/**
 * Game State Interfaces
 * 
 * Defines the game state structures for quest progress, user metrics,
 * and gameplay interactions in the Chromatic Concordance system.
 */

import type { QuestPhase, QuestStatus, RecoveryStatus } from "./nodes";

/**
 * User's core recovery metrics
 */
export interface UserMetrics {
  id: number;
  userId: number;
  daysSober: number;
  xp: number;
  questsCompleted: number;
  stabilityIndex: string; // Decimal as string
  recoveryStatus: RecoveryStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Quest progress tracking for a specific quest
 */
export interface QuestProgress {
  id: number;
  userId: number;
  questId: string;
  questName: string;
  phase: QuestPhase;
  empathyCharge: number; // 0-100
  logicCharge: number; // 0-100
  concordanceLevel: number; // 0-100
  matrixHealth: number; // 0-100
  status: QuestStatus;
  startedAt: Date;
  completedAt?: Date;
  updatedAt: Date;
}

/**
 * Types of ML predictions
 */
export type PredictionType = 
  | "success-probability" 
  | "recovery-trajectory" 
  | "engagement-score" 
  | "recommendation";

/**
 * ML prediction result
 */
export interface MLPrediction {
  id: number;
  userId: number;
  questId: string;
  predictionType: PredictionType;
  inputMetrics: string; // JSON string of input metrics
  prediction: string; // JSON string of prediction result
  confidence: string; // Decimal as string
  createdAt: Date;
}

/**
 * Types of quest rewards
 */
export type RewardType = "xp" | "ability" | "cosmetic" | "badge";

/**
 * Quest reward structure
 */
export interface QuestReward {
  id: number;
  userId: number;
  questId: string;
  rewardType: RewardType;
  rewardName: string;
  rewardValue?: number;
  description?: string;
  claimedAt: Date;
}

/**
 * Complete game state snapshot
 */
export interface GameState {
  userMetrics: UserMetrics;
  questProgress: QuestProgress;
  predictions: MLPrediction[];
  rewards: QuestReward[];
  timestamp: Date;
}

/**
 * Insertable types (without auto-generated fields)
 */
export interface InsertUserMetrics extends Omit<UserMetrics, "id" | "createdAt" | "updatedAt"> {}
export interface InsertQuestProgress extends Omit<QuestProgress, "id" | "startedAt" | "updatedAt"> {}
export interface InsertMLPrediction extends Omit<MLPrediction, "id" | "createdAt"> {}
export interface InsertQuestReward extends Omit<QuestReward, "id" | "claimedAt"> {}

/**
 * Update types (all fields optional)
 */
export type UpdateUserMetrics = Partial<InsertUserMetrics>;
export type UpdateQuestProgress = Partial<InsertQuestProgress>;
