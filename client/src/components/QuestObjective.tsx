import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { QuestPhase } from "@/pages/Home";

interface QuestObjectiveProps {
  currentPhase: QuestPhase;
  empathyCharge: number;
  logicCharge: number;
  concordanceLevel: number;
  onAction: () => void;
  onWeave: () => void;
}

const objectives = {
  intro: {
    title: "Quest: The Empathy Matrix",
    description: "Re-synchronize the cultural data flow between realms to restore the link between recovery stability and skill potential.",
    objective: "Speak with Jelly-Prime to begin",
  },
  potato: {
    title: "Phase 1: Empathy Harvest",
    description: "Absorb the foundational stability data from Potato Planet by pulsing in time with the planet's heartbeat.",
    objective: "Charge empathy to 100%",
  },
  schultz: {
    title: "Phase 2: Logic Infusion",
    description: "Navigate the logic gates of Schultz World and infuse the Recommendation Engine with your empathy charge.",
    objective: "Charge logic to 100%",
  },
  synapse: {
    title: "Phase 3: Chromatic Concordance",
    description: "Weave the green empathy and golden logic together to create the harmonious teal data-stream.",
    objective: "Complete the concordance",
  },
  complete: {
    title: "Quest Complete!",
    description: "The Empathy Matrix has been recalibrated. The connection between recovery and potential is restored.",
    objective: "Rewards claimed",
  },
};

const phaseColors = {
  intro: "oklch(0.65 0.2 290)",
  potato: "oklch(0.75 0.2 155)",
  schultz: "oklch(0.75 0.15 85)",
  synapse: "oklch(0.7 0.15 180)",
  complete: "oklch(0.7 0.15 180)",
};

export function QuestObjective({
  currentPhase,
  empathyCharge,
  logicCharge,
  concordanceLevel,
  onAction,
  onWeave,
}: QuestObjectiveProps) {
  const content = objectives[currentPhase];
  const color = phaseColors[currentPhase];

  const getProgress = () => {
    switch (currentPhase) {
      case "potato":
        return empathyCharge;
      case "schultz":
        return logicCharge;
      case "synapse":
        return concordanceLevel;
      case "complete":
        return 100;
      default:
        return 0;
    }
  };

  const progress = getProgress();

  return (
    <motion.div
      className="glass-panel rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={currentPhase}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
        <h3 
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-display)", color }}
        >
          {content.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        {content.description}
      </p>

      {/* Objective */}
      <div className="bg-muted/30 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Current Objective</span>
          <span className="text-xs font-mono" style={{ color }}>{progress}%</span>
        </div>
        <p className="text-sm font-medium text-foreground">{content.objective}</p>
        
        {/* Progress Bar */}
        {currentPhase !== "intro" && currentPhase !== "complete" && (
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {currentPhase === "synapse" && empathyCharge >= 100 && logicCharge >= 100 && concordanceLevel < 100 && (
        <Button
          onClick={onWeave}
          className="w-full"
          variant="outline"
          style={{
            backgroundColor: `color-mix(in oklch, ${color} 20%, transparent)`,
            color: color,
            borderColor: `color-mix(in oklch, ${color} 30%, transparent)`,
          }}
        >
          <motion.span
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            Weave the Concordance
          </motion.span>
        </Button>
      )}

      {(currentPhase === "potato" && empathyCharge >= 100) && (
        <Button
          onClick={onAction}
          className="w-full"
          variant="outline"
          style={{
            backgroundColor: `color-mix(in oklch, oklch(0.75 0.2 155) 20%, transparent)`,
            color: "oklch(0.75 0.2 155)",
            borderColor: `color-mix(in oklch, oklch(0.75 0.2 155) 30%, transparent)`,
          }}
        >
          Travel to Schultz World
        </Button>
      )}

      {(currentPhase === "schultz" && logicCharge >= 100) && (
        <Button
          onClick={onAction}
          className="w-full"
          variant="outline"
          style={{
            backgroundColor: `color-mix(in oklch, oklch(0.75 0.15 85) 20%, transparent)`,
            color: "oklch(0.75 0.15 85)",
            borderColor: `color-mix(in oklch, oklch(0.75 0.15 85) 30%, transparent)`,
          }}
        >
          Enter the Synapse
        </Button>
      )}

      {/* Technical Info */}
      <div className="mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">API ROUTE</span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {currentPhase === "potato" && "recovery/stability"}
            {currentPhase === "schultz" && "ai-ml/recommend"}
            {currentPhase === "synapse" && "game/concordance"}
            {currentPhase === "intro" && "twin/simulate"}
            {currentPhase === "complete" && "user/rewards"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
