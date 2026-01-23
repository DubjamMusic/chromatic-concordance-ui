import { motion } from "framer-motion";
import type { QuestPhase } from "@/pages/Home";

interface JellybodAvatarProps {
  empathyCharge: number;
  logicCharge: number;
  concordanceLevel: number;
  currentPhase: QuestPhase;
}

export function JellybodAvatar({
  empathyCharge,
  logicCharge,
  concordanceLevel,
  currentPhase,
}: JellybodAvatarProps) {
  const getGlowColor = () => {
    if (concordanceLevel >= 100) return "oklch(0.8 0.15 180)";
    if (logicCharge >= 100 && empathyCharge >= 100) return "oklch(0.75 0.17 135)";
    if (logicCharge >= 100) return "oklch(0.85 0.15 85)";
    if (empathyCharge >= 100) return "oklch(0.85 0.2 155)";
    return "oklch(0.7 0.2 290)";
  };

  const getBodyGradient = () => {
    const empathyStop = Math.min(empathyCharge, 100);
    const logicStop = Math.min(logicCharge, 100);
    
    if (concordanceLevel >= 100) {
      return "url(#concordanceGradient)";
    }
    if (empathyStop > 0 && logicStop > 0) {
      return "url(#mixedGradient)";
    }
    if (empathyStop > 0) {
      return "url(#empathyGradient)";
    }
    if (logicStop > 0) {
      return "url(#logicGradient)";
    }
    return "url(#neutralGradient)";
  };

  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="120" height="140" viewBox="0 0 120 140">
        <defs>
          <radialGradient id="neutralGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.8 0.2 290)" />
            <stop offset="100%" stopColor="oklch(0.5 0.15 290)" />
          </radialGradient>
          <radialGradient id="empathyGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.9 0.2 155)" />
            <stop offset="100%" stopColor="oklch(0.6 0.15 155)" />
          </radialGradient>
          <radialGradient id="logicGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.9 0.15 85)" />
            <stop offset="100%" stopColor="oklch(0.6 0.12 85)" />
          </radialGradient>
          <radialGradient id="mixedGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.85 0.2 155)" />
            <stop offset="50%" stopColor="oklch(0.75 0.17 120)" />
            <stop offset="100%" stopColor="oklch(0.7 0.15 85)" />
          </radialGradient>
          <radialGradient id="concordanceGradient" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.9 0.15 180)" />
            <stop offset="100%" stopColor="oklch(0.6 0.12 180)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow Effect */}
        <motion.ellipse
          cx="60"
          cy="70"
          rx="45"
          ry="50"
          fill={getGlowColor()}
          opacity={0.3}
          filter="url(#glow)"
          animate={{
            rx: [45, 48, 45],
            ry: [50, 53, 50],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Body */}
        <motion.ellipse
          cx="60"
          cy="70"
          rx="40"
          ry="45"
          fill={getBodyGradient()}
          animate={{
            rx: [40, 42, 40, 38, 40],
            ry: [45, 43, 45, 47, 45],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner Highlight */}
        <ellipse
          cx="50"
          cy="55"
          rx="15"
          ry="18"
          fill="white"
          opacity={0.2}
        />

        {/* Eyes */}
        <motion.g
          animate={{
            y: currentPhase === "complete" ? [0, -2, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            repeat: currentPhase === "complete" ? Infinity : 0,
          }}
        >
          <ellipse cx="45" cy="60" rx="8" ry="10" fill="white" opacity={0.9} />
          <ellipse cx="75" cy="60" rx="8" ry="10" fill="white" opacity={0.9} />
          <motion.circle
            cx="47"
            cy="62"
            r="4"
            fill="oklch(0.2 0.02 260)"
            animate={{
              cx: [47, 48, 47, 46, 47],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="77"
            cy="62"
            r="4"
            fill="oklch(0.2 0.02 260)"
            animate={{
              cx: [77, 78, 77, 76, 77],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        {/* Smile */}
        <motion.path
          d={currentPhase === "complete" ? "M 45 85 Q 60 100 75 85" : "M 45 85 Q 60 92 75 85"}
          stroke="oklch(0.2 0.02 260)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity={0.7}
        />

        {/* Bowler Hat */}
        <g>
          <ellipse cx="60" cy="25" rx="35" ry="8" fill="oklch(0.25 0.02 260)" />
          <rect x="35" y="5" width="50" height="20" rx="10" fill="oklch(0.2 0.02 260)" />
          <rect x="42" y="18" width="36" height="4" fill="oklch(0.35 0.02 260)" />
        </g>

        {/* Charge Indicators */}
        {empathyCharge > 0 && (
          <motion.circle
            cx="25"
            cy="70"
            r="6"
            fill="oklch(0.85 0.2 155)"
            initial={{ scale: 0 }}
            animate={{ scale: 1, opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {logicCharge > 0 && (
          <motion.circle
            cx="95"
            cy="70"
            r="6"
            fill="oklch(0.85 0.15 85)"
            initial={{ scale: 0 }}
            animate={{ scale: 1, opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          />
        )}
      </svg>

      {/* Status Label */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-mono text-muted-foreground">
          {currentPhase === "complete" ? "CONCORDANCE ACHIEVED" : "JELLYBOD AVATAR"}
        </span>
      </div>
    </motion.div>
  );
}
