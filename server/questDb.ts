import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import {
  userMetrics,
  questProgress,
  mlPredictions,
  questRewards,
  InsertUserMetrics,
  InsertQuestProgress,
  InsertMLPrediction,
  InsertQuestReward,
} from "../drizzle/schema";

/**
 * Get or create user metrics
 */
export async function getUserMetrics(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(userMetrics)
    .where(eq(userMetrics.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Create default metrics for new user
  const newMetrics: InsertUserMetrics = {
    userId,
    daysSober: 0,
    xp: 0,
    questsCompleted: 0,
    stabilityIndex: "0.00",
    recoveryStatus: "stable",
  };

  await db.insert(userMetrics).values(newMetrics);
  return await db
    .select()
    .from(userMetrics)
    .where(eq(userMetrics.userId, userId))
    .limit(1)
    .then((rows) => rows[0]);
}

/**
 * Update user metrics
 */
export async function updateUserMetrics(
  userId: number,
  updates: Partial<InsertUserMetrics>
) {
  const db = await getDb();
  if (!db) return null;

  await db
    .update(userMetrics)
    .set(updates)
    .where(eq(userMetrics.userId, userId));

  return await getUserMetrics(userId);
}

/**
 * Get or create quest progress
 */
export async function getQuestProgress(userId: number, questId: string) {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(questProgress)
    .where(and(eq(questProgress.userId, userId), eq(questProgress.questId, questId)))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Create new quest progress
  const newProgress: InsertQuestProgress = {
    userId,
    questId,
    questName: "Chromatic Concordance",
    phase: "intro",
    empathyCharge: 0,
    logicCharge: 0,
    concordanceLevel: 0,
    matrixHealth: 35,
    status: "in-progress",
  };

  await db.insert(questProgress).values(newProgress);
  return await db
    .select()
    .from(questProgress)
    .where(and(eq(questProgress.userId, userId), eq(questProgress.questId, questId)))
    .limit(1)
    .then((rows) => rows[0]);
}

/**
 * Update quest progress
 */
export async function updateQuestProgress(
  userId: number,
  questId: string,
  updates: Partial<InsertQuestProgress>
) {
  const db = await getDb();
  if (!db) return null;

  await db
    .update(questProgress)
    .set(updates)
    .where(and(eq(questProgress.userId, userId), eq(questProgress.questId, questId)));

  return await getQuestProgress(userId, questId);
}

/**
 * Save ML prediction
 */
export async function saveMlPrediction(prediction: InsertMLPrediction) {
  const db = await getDb();
  if (!db) return null;

  await db.insert(mlPredictions).values(prediction);
  return prediction;
}

/**
 * Get recent ML predictions for a user and quest
 */
export async function getRecentPredictions(userId: number, questId: string, limit = 5) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(mlPredictions)
    .where(and(eq(mlPredictions.userId, userId), eq(mlPredictions.questId, questId)))
    .limit(limit);
}

/**
 * Add quest reward
 */
export async function addQuestReward(reward: InsertQuestReward) {
  const db = await getDb();
  if (!db) return null;

  await db.insert(questRewards).values(reward);
  return reward;
}

/**
 * Get quest rewards for a user
 */
export async function getQuestRewards(userId: number, questId?: string) {
  const db = await getDb();
  if (!db) return [];

  if (questId) {
    return await db
      .select()
      .from(questRewards)
      .where(and(eq(questRewards.userId, userId), eq(questRewards.questId, questId)));
  }

  return await db
    .select()
    .from(questRewards)
    .where(eq(questRewards.userId, userId));
}
