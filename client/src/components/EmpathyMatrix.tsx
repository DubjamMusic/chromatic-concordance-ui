import { motion } from "framer-motion";
import type { QuestPhase } from "@/pages/Home";

interface EmpathyMatrixProps {
  empathyLevel: number;
  logicLevel: number;
  concordanceLevel: number;
  matrixHealth: number;
  currentPhase: QuestPhase;
}

export function EmpathyMatrix({
  empathyLevel,
  logicLevel,
  concordanceLevel,
  matrixHealth,
  currentPhase,
}: EmpathyMatrixProps) {
  const isHealthy = matrixHealth >= 80;
  const isDegraded = matrixHealth < 50;

  return (
    <div className="relative w-full max-w-lg aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="matrixCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isHealthy ? "oklch(0.8 0.15 180)" : isDegraded ? "oklch(0.65 0.25 25)" : "oklch(0.7 0.1 260)"} />
            <stop offset="100%" stopColor="oklch(0.08 0.02 260)" />
          </radialGradient>
          <filter id="matrixGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Ring - Matrix Health */}
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="oklch(0.25 0.03 260)"
          strokeWidth="2"
          strokeDasharray="10 5"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "center" }}
        />

        {/* Health Arc */}
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke={isHealthy ? "oklch(0.8 0.15 180)" : isDegraded ? "oklch(0.65 0.25 25)" : "oklch(0.7 0.1 260)"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(matrixHealth / 100) * 1131} 1131`}
          transform="rotate(-90 200 200)"
          filter="url(#matrixGlow)"
          animate={{
            opacity: isDegraded ? [0.5, 1, 0.5] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isDegraded ? Infinity : 0,
          }}
        />

        {/* Empathy Orbit */}
        <motion.g
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        >
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="oklch(0.85 0.2 155)"
            strokeWidth="1"
            opacity={empathyLevel > 0 ? 0.3 : 0.1}
          />
          {empathyLevel > 0 && (
            <motion.circle
              cx="200"
              cy="60"
              r="8"
              fill="oklch(0.85 0.2 155)"
              filter="url(#matrixGlow)"
              animate={{
                r: [8, 10, 8],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.g>

        {/* Logic Orbit */}
        <motion.g
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        >
          <circle
            cx="200"
            cy="200"
            r="110"
            fill="none"
            stroke="oklch(0.85 0.15 85)"
            strokeWidth="1"
            opacity={logicLevel > 0 ? 0.3 : 0.1}
          />
          {logicLevel > 0 && (
            <motion.circle
              cx="200"
              cy="90"
              r="8"
              fill="oklch(0.85 0.15 85)"
              filter="url(#matrixGlow)"
              animate={{
                r: [8, 10, 8],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            />
          )}
        </motion.g>

        {/* Concordance Core */}
        <motion.circle
          cx="200"
          cy="200"
          r="60"
          fill="url(#matrixCore)"
          filter="url(#matrixGlow)"
          animate={{
            r: concordanceLevel >= 100 ? [60, 65, 60] : [60, 62, 60],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner Ring */}
        <circle
          cx="200"
          cy="200"
          r="70"
          fill="none"
          stroke="oklch(0.3 0.03 260)"
          strokeWidth="1"
        />

        {/* Connection Lines */}
        {empathyLevel >= 100 && logicLevel >= 100 && (
          <>
            <motion.line
              x1="200"
              y1="60"
              x2="200"
              y2="130"
              stroke="oklch(0.85 0.2 155)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.line
              x1="200"
              y1="90"
              x2="200"
              y2="130"
              stroke="oklch(0.85 0.15 85)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </>
        )}

        {/* Concordance Weave Effect */}
        {concordanceLevel > 0 && (
          <motion.circle
            cx="200"
            cy="200"
            r="80"
            fill="none"
            stroke="oklch(0.8 0.15 180)"
            strokeWidth="3"
            strokeDasharray={`${(concordanceLevel / 100) * 502} 502`}
            transform="rotate(-90 200 200)"
            filter="url(#matrixGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Phase Labels */}
        <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-xs font-mono">
          {matrixHealth}%
        </text>
        <text x="200" y="220" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">
          MATRIX HEALTH
        </text>
      </svg>

      {/* Realm Labels */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <span className={`text-xs font-mono ${empathyLevel >= 100 ? "text-empathy" : "text-muted-foreground"}`}>
          POTATO PLANET
        </span>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <span className={`text-xs font-mono ${logicLevel >= 100 ? "text-logic" : "text-muted-foreground"}`}>
          SCHULTZ WORLD
        </span>
      </div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <span className={`text-xs font-mono ${currentPhase === "synapse" ? "text-concordance" : "text-muted-foreground"}`}>
          SYNAPSE
        </span>
      </div>
    </div>
  );
}
