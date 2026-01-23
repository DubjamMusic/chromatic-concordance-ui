import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  getUserMetrics,
  updateUserMetrics,
  getQuestProgress,
  updateQuestProgress,
  saveMlPrediction,
  getRecentPredictions,
  addQuestReward,
  getQuestRewards,
} from "./questDb";

/**
 * Quest Router - Handles all quest-related operations and ML Toolkit integration
 */
export const questRouter = router({
  /**
   * Get user's current metrics
   */
  getMetrics: protectedProcedure.query(async ({ ctx }) => {
    return await getUserMetrics(ctx.user.id);
  }),

  /**
   * Update user metrics (e.g., after completing a phase)
   */
  updateMetrics: protectedProcedure
    .input(
      z.object({
        daysSober: z.number().optional(),
        xp: z.number().optional(),
        questsCompleted: z.number().optional(),
        stabilityIndex: z.string().optional(),
        recoveryStatus: z.enum(["stable", "at-risk", "critical", "thriving"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await updateUserMetrics(ctx.user.id, input);
    }),

  /**
   * Get quest progress for the Chromatic Concordance quest
   */
  getQuestProgress: protectedProcedure
    .input(z.object({ questId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await getQuestProgress(ctx.user.id, input.questId);
    }),

  /**
   * Update quest progress (e.g., charge levels, phase transitions)
   */
  updateQuestProgress: protectedProcedure
    .input(
      z.object({
        questId: z.string(),
        phase: z.enum(["intro", "potato", "schultz", "synapse", "complete"]).optional(),
        empathyCharge: z.number().optional(),
        logicCharge: z.number().optional(),
        concordanceLevel: z.number().optional(),
        matrixHealth: z.number().optional(),
        status: z.enum(["in-progress", "completed", "abandoned"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { questId, ...updates } = input;
      return await updateQuestProgress(ctx.user.id, questId, updates);
    }),

  /**
   * Invoke ML Toolkit to get success probability prediction
   * This simulates calling the HustleCodex ML Toolkit's /twin/simulate endpoint
   */
  predictSuccessProbability: protectedProcedure
    .input(
      z.object({
        questId: z.string(),
        daysSober: z.number(),
        xp: z.number(),
        questsCompleted: z.number(),
        stabilityIndex: z.number(),
        chosenPath: z.enum(["route-alpha", "route-beta"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // In a real implementation, this would call the HustleCodex ML Toolkit
      // For now, we'll simulate a prediction based on the metrics
      const { daysSober, xp, questsCompleted, stabilityIndex, chosenPath } = input;

      // Simulated ML prediction logic
      const baseSuccessRate = Math.min(100, stabilityIndex * 100);
      const xpBonus = Math.min(20, (xp / 1000) * 20);
      const questBonus = Math.min(15, (questsCompleted / 50) * 15);

      let successProbability = baseSuccessRate + xpBonus + questBonus;

      // Route-specific adjustments
      if (chosenPath === "route-alpha") {
        // Stability-focused route
        successProbability = Math.min(100, successProbability + 10);
      } else {
        // Market-focused route (higher risk, higher reward)
        successProbability = Math.max(0, successProbability - 15);
      }

      const prediction = {
        userId: ctx.user.id,
        questId: input.questId,
        predictionType: "success-probability" as const,
        inputMetrics: JSON.stringify({
          daysSober,
          xp,
          questsCompleted,
          stabilityIndex,
          chosenPath,
        }),
        prediction: JSON.stringify({
          successProbability: Math.round(successProbability),
          recommendedPath: successProbability > 60 ? chosenPath : "route-alpha",
          confidence: 0.85,
        }),
        confidence: "0.85",
      };

      await saveMlPrediction(prediction);

      return {
        successProbability: Math.round(successProbability),
        recommendedPath: successProbability > 60 ? chosenPath : "route-alpha",
        confidence: 0.85,
      };
    }),

  /**
   * Get recent ML predictions for a quest
   */
  getRecentPredictions: protectedProcedure
    .input(z.object({ questId: z.string(), limit: z.number().default(5) }))
    .query(async ({ ctx, input }) => {
      return await getRecentPredictions(ctx.user.id, input.questId, input.limit);
    }),

  /**
   * Complete a quest phase and award rewards
   */
  completePhase: protectedProcedure
    .input(
      z.object({
        questId: z.string(),
        phase: z.enum(["intro", "potato", "schultz", "synapse", "complete"]),
        xpReward: z.number().default(0),
        rewardName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Update quest progress
      await updateQuestProgress(ctx.user.id, input.questId, {
        phase: input.phase,
        status: input.phase === "complete" ? "completed" : "in-progress",
        completedAt: input.phase === "complete" ? new Date() : undefined,
      });

      // Update user metrics
      const currentMetrics = await getUserMetrics(ctx.user.id);
      if (currentMetrics) {
        await updateUserMetrics(ctx.user.id, {
          xp: (currentMetrics.xp || 0) + input.xpReward,
          questsCompleted:
            input.phase === "complete"
              ? (currentMetrics.questsCompleted || 0) + 1
              : currentMetrics.questsCompleted,
        });
      }

      // Award reward if applicable
      if (input.xpReward > 0) {
        await addQuestReward({
          userId: ctx.user.id,
          questId: input.questId,
          rewardType: "xp",
          rewardName: input.rewardName || `${input.phase} Phase Completion`,
          rewardValue: input.xpReward,
        });
      }

      return {
        success: true,
        message: `Phase ${input.phase} completed!`,
      };
    }),

  /**
   * Get all rewards for a quest
   */
  getRewards: protectedProcedure
    .input(z.object({ questId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return await getQuestRewards(ctx.user.id, input.questId);
    }),

  /**
   * Award a special ability or cosmetic reward
   */
  awardSpecialReward: protectedProcedure
    .input(
      z.object({
        questId: z.string(),
        rewardType: z.enum(["ability", "cosmetic", "badge"]),
        rewardName: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await addQuestReward({
        userId: ctx.user.id,
        questId: input.questId,
        rewardType: input.rewardType,
        rewardName: input.rewardName,
        description: input.description,
      });
    }),
});
