import { motion } from "framer-motion";
import type { QuestPhase } from "@/pages/Home";

interface PhaseIndicatorProps {
  currentPhase: QuestPhase;
}

const phases = [
  { id: "intro", label: "Intro", color: "oklch(0.65 0.2 290)" },
  { id: "potato", label: "Potato Planet", color: "oklch(0.75 0.2 155)" },
  { id: "schultz", label: "Schultz World", color: "oklch(0.75 0.15 85)" },
  { id: "synapse", label: "Synapse", color: "oklch(0.7 0.15 180)" },
  { id: "complete", label: "Complete", color: "oklch(0.7 0.15 180)" },
] as const;

export function PhaseIndicator({ currentPhase }: PhaseIndicatorProps) {
  const currentIndex = phases.findIndex((p) => p.id === currentPhase);

  return (
    <div className="flex items-center gap-2">
      {phases.map((phase, index) => {
        const isActive = phase.id === currentPhase;
        const isComplete = index < currentIndex;

        return (
          <div key={phase.id} className="flex items-center gap-2">
            <motion.div
              className="relative flex items-center justify-center w-8 h-8 rounded-full border-2"
              style={{
                borderColor: isActive || isComplete ? phase.color : "oklch(0.3 0.02 260)",
                backgroundColor: isActive ? `color-mix(in oklch, ${phase.color} 20%, transparent)` : isComplete ? `color-mix(in oklch, ${phase.color} 10%, transparent)` : "oklch(0.2 0.02 260 / 0.2)",
              }}
              animate={{
                scale: isActive ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
              }}
            >
              {isComplete ? (
                <svg className="w-4 h-4" style={{ color: phase.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span 
                  className="text-xs font-mono"
                  style={{ color: isActive ? phase.color : "oklch(0.6 0.02 260)" }}
                >
                  {index + 1}
                </span>
              )}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: `color-mix(in oklch, ${phase.color} 30%, transparent)` }}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
            {index < phases.length - 1 && (
              <div
                className="w-8 h-0.5"
                style={{
                  backgroundColor: index < currentIndex ? phase.color : "oklch(0.3 0.02 260)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
