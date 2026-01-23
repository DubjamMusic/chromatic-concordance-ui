import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User Recovery Metrics - Tracks the core HustleCodex metrics for each user
 * These metrics drive the ML predictions and quest outcomes
 */
export const userMetrics = mysqlTable("userMetrics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  daysSober: int("daysSober").default(0).notNull(),
  xp: int("xp").default(0).notNull(),
  questsCompleted: int("questsCompleted").default(0).notNull(),
  stabilityIndex: decimal("stabilityIndex", { precision: 5, scale: 2 }).default("0.00").notNull(),
  recoveryStatus: mysqlEnum("recoveryStatus", ["stable", "at-risk", "critical", "thriving"]).default("stable").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserMetrics = typeof userMetrics.$inferSelect;
export type InsertUserMetrics = typeof userMetrics.$inferInsert;

/**
 * Quest Progress - Tracks the player's progress through Chromatic Concordance quests
 */
export const questProgress = mysqlTable("questProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questId: varchar("questId", { length: 64 }).notNull(), // e.g., "jellybod-chromatic-concordance"
  questName: varchar("questName", { length: 255 }).notNull(),
  phase: mysqlEnum("phase", ["intro", "potato", "schultz", "synapse", "complete"]).default("intro").notNull(),
  empathyCharge: int("empathyCharge").default(0).notNull(),
  logicCharge: int("logicCharge").default(0).notNull(),
  concordanceLevel: int("concordanceLevel").default(0).notNull(),
  matrixHealth: int("matrixHealth").default(35).notNull(),
  status: mysqlEnum("status", ["in-progress", "completed", "abandoned"]).default("in-progress").notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuestProgress = typeof questProgress.$inferSelect;
export type InsertQuestProgress = typeof questProgress.$inferInsert;

/**
 * ML Predictions - Stores predictions from the HustleCodex ML Toolkit
 * Used to drive quest outcomes and player recommendations
 */
export const mlPredictions = mysqlTable("mlPredictions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questId: varchar("questId", { length: 64 }).notNull(),
  predictionType: mysqlEnum("predictionType", ["success-probability", "recovery-trajectory", "engagement-score", "recommendation"]).notNull(),
  inputMetrics: text("inputMetrics").notNull(), // JSON string of input metrics
  prediction: text("prediction").notNull(), // JSON string of prediction result
  confidence: decimal("confidence", { precision: 5, scale: 4 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MLPrediction = typeof mlPredictions.$inferSelect;
export type InsertMLPrediction = typeof mlPredictions.$inferInsert;

/**
 * Quest Rewards - Tracks rewards earned from completing quests
 */
export const questRewards = mysqlTable("questRewards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questId: varchar("questId", { length: 64 }).notNull(),
  rewardType: mysqlEnum("rewardType", ["xp", "ability", "cosmetic", "badge"]).notNull(),
  rewardName: varchar("rewardName", { length: 255 }).notNull(),
  rewardValue: int("rewardValue").default(0),
  description: text("description"),
  claimedAt: timestamp("claimedAt").defaultNow().notNull(),
});

export type QuestReward = typeof questRewards.$inferSelect;
export type InsertQuestReward = typeof questRewards.$inferInsert;