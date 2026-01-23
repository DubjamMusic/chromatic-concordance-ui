import { motion } from "framer-motion";

interface DataStreamVisualizerProps {
  empathyActive: boolean;
  logicActive: boolean;
  concordanceActive: boolean;
}

export function DataStreamVisualizer({
  empathyActive,
  logicActive,
  concordanceActive,
}: DataStreamVisualizerProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="empathyStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.85 0.2 155)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.85 0.2 155)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.85 0.2 155)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="logicStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.85 0.15 85)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.85 0.15 85)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.85 0.15 85)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="concordanceStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.8 0.15 180)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.8 0.15 180)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.8 0.15 180)" stopOpacity="0" />
          </linearGradient>
          <filter id="streamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Empathy Stream - Left side flowing to center */}
        {empathyActive && (
          <g filter="url(#streamGlow)">
            <motion.path
              d="M 0 150 Q 150 200 300 300 Q 350 350 400 300"
              fill="none"
              stroke="url(#empathyStream)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Flowing particles */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={`empathy-particle-${i}`}
                r="4"
                fill="oklch(0.85 0.2 155)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "linear",
                }}
                style={{
                  offsetPath: "path('M 0 150 Q 150 200 300 300 Q 350 350 400 300')",
                }}
              />
            ))}
          </g>
        )}

        {/* Logic Stream - Right side flowing to center */}
        {logicActive && (
          <g filter="url(#streamGlow)">
            <motion.path
              d="M 800 450 Q 650 400 500 300 Q 450 250 400 300"
              fill="none"
              stroke="url(#logicStream)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Flowing particles */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={`logic-particle-${i}`}
                r="4"
                fill="oklch(0.85 0.15 85)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "linear",
                }}
                style={{
                  offsetPath: "path('M 800 450 Q 650 400 500 300 Q 450 250 400 300')",
                }}
              />
            ))}
          </g>
        )}

        {/* Concordance Stream - Spiral from center */}
        {concordanceActive && (
          <g filter="url(#streamGlow)">
            <motion.path
              d="M 400 300 Q 420 280 450 290 Q 480 300 470 330 Q 460 360 430 350 Q 400 340 410 310 Q 420 280 460 270"
              fill="none"
              stroke="url(#concordanceStream)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Pulsing center */}
            <motion.circle
              cx="400"
              cy="300"
              r="20"
              fill="oklch(0.8 0.15 180)"
              opacity={0.3}
              animate={{
                r: [20, 40, 20],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </g>
        )}

        {/* Background grid lines */}
        <g opacity={0.1}>
          {[100, 200, 300, 400, 500].map((y) => (
            <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} stroke="currentColor" strokeWidth="0.5" />
          ))}
          {[100, 200, 300, 400, 500, 600, 700].map((x) => (
            <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="600" stroke="currentColor" strokeWidth="0.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}
