import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { QuestPhase } from "@/pages/Home";

interface JellyPrimeDialogProps {
  currentPhase: QuestPhase;
  onDismiss: () => void;
}

const dialogContent = {
  intro: {
    title: "Little Bod...",
    message: `A dissonance corrupts the flow! The Empathy Matrix is misaligned. The foundational stability of Potato Planet—the very soil of recovery—is no longer being correctly translated into potential in Schultz World. The Recommendation Engine has forgotten that a steady hand can learn the most complex code. You must recalibrate the Concordance before the realms drift apart!`,
    action: "Begin the Journey",
  },
  potato: {
    title: "Phase 1: Empathy Harvest",
    message: `You have arrived at Potato Planet. Feel the steady, green heartbeat of the realm. Pulse in time with the planet to absorb the foundational stability data. The Recovery Service awaits your connection.`,
    action: "I Understand",
  },
  schultz: {
    title: "Phase 2: Logic Infusion",
    message: `Excellent! You glow with the green of empathy. Now travel to Schultz World and find the central processing core of the Recommendation Engine. Use your empathy charge to open pathways blocked by cold calculus.`,
    action: "I Understand",
  },
  synapse: {
    title: "Phase 3: Chromatic Concordance",
    message: `You carry both the green empathy of Potato Planet and the golden logic of Schultz World. Now weave them together in the Inter-Realm Synapse. Create the harmonious teal data-stream that will restore the Matrix.`,
    action: "I Understand",
  },
  complete: {
    title: "The Concordance is Restored!",
    message: `You have reminded the machine of the soul within the data. The Empathy Matrix is recalibrated. Go now, Little Bod, and return to your tuberous form. You have served the Omniverse well.`,
    action: "Return",
  },
};

export function JellyPrimeDialog({ currentPhase, onDismiss }: JellyPrimeDialogProps) {
  const content = dialogContent[currentPhase];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center p-6 bg-background/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass-panel rounded-3xl p-6 max-w-2xl w-full glow-jellybod"
      >
        <div className="flex gap-4">
          {/* Jelly-Prime Avatar */}
          <div className="flex-shrink-0">
            <motion.div
              className="w-20 h-20 relative"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <defs>
                  <radialGradient id="jellyPrimeGradient" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="oklch(0.9 0.15 290)" />
                    <stop offset="100%" stopColor="oklch(0.5 0.2 290)" />
                  </radialGradient>
                  <filter id="jellyPrimeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Glow */}
                <motion.ellipse
                  cx="40"
                  cy="45"
                  rx="30"
                  ry="32"
                  fill="oklch(0.7 0.2 290)"
                  opacity={0.3}
                  filter="url(#jellyPrimeGlow)"
                  animate={{
                    rx: [30, 33, 30],
                    ry: [32, 35, 32],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                {/* Body */}
                <motion.ellipse
                  cx="40"
                  cy="45"
                  rx="28"
                  ry="30"
                  fill="url(#jellyPrimeGradient)"
                  animate={{
                    rx: [28, 30, 28, 26, 28],
                    ry: [30, 28, 30, 32, 30],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                
                {/* Highlight */}
                <ellipse cx="32" cy="35" rx="10" ry="12" fill="white" opacity={0.2} />
                
                {/* Eyes */}
                <ellipse cx="32" cy="42" rx="5" ry="6" fill="white" opacity={0.9} />
                <ellipse cx="48" cy="42" rx="5" ry="6" fill="white" opacity={0.9} />
                <circle cx="33" cy="43" r="2.5" fill="oklch(0.2 0.02 260)" />
                <circle cx="49" cy="43" r="2.5" fill="oklch(0.2 0.02 260)" />
                
                {/* Wise expression - slight smile */}
                <path d="M 32 55 Q 40 60 48 55" stroke="oklch(0.2 0.02 260)" strokeWidth="2" fill="none" strokeLinecap="round" />
                
                {/* Crown/Halo effect for wisdom */}
                <motion.ellipse
                  cx="40"
                  cy="15"
                  rx="20"
                  ry="5"
                  fill="none"
                  stroke="oklch(0.8 0.15 290)"
                  strokeWidth="1.5"
                  opacity={0.5}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </svg>
            </motion.div>
            <div className="text-center mt-1">
              <span className="text-xs font-mono text-jellybod">JELLY-PRIME</span>
            </div>
          </div>

          {/* Dialog Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-jellybod mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {content.title}
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed mb-4 italic">
              "{content.message}"
            </p>
            <div className="flex justify-end">
              <Button
                onClick={onDismiss}
                className="bg-jellybod/20 text-jellybod border border-jellybod/30 hover:bg-jellybod/30"
                variant="outline"
              >
                {content.action}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
