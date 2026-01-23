import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type RealmColor = "empathy" | "logic" | "concordance";

interface Metric {
  label: string;
  value: string;
}

interface RealmPanelProps {
  realm: "potato" | "schultz";
  title: string;
  subtitle: string;
  color: RealmColor;
  charge: number;
  isActive: boolean;
  onPulse: () => void;
  metrics: Metric[];
}

const colorValues = {
  empathy: "oklch(0.75 0.2 155)",
  logic: "oklch(0.75 0.15 85)",
  concordance: "oklch(0.7 0.15 180)",
};

export function RealmPanel({
  realm,
  title,
  subtitle,
  color,
  charge,
  isActive,
  onPulse,
  metrics,
}: RealmPanelProps) {
  const colorValue = colorValues[color];

  return (
    <motion.div
      className="glass-panel rounded-2xl p-4 border"
      style={{
        borderColor: isActive ? `color-mix(in oklch, ${colorValue} 30%, transparent)` : "transparent",
        boxShadow: isActive ? `0 0 20px color-mix(in oklch, ${colorValue} 40%, transparent), 0 0 40px color-mix(in oklch, ${colorValue} 20%, transparent)` : "none",
      }}
      animate={{
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 
            className="font-semibold"
            style={{ fontFamily: "var(--font-display)", color: colorValue }}
          >
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div 
          className={`w-3 h-3 rounded-full ${isActive ? "animate-pulse" : ""}`}
          style={{ backgroundColor: isActive ? colorValue : "oklch(0.3 0.02 260)" }}
        />
      </div>

      {/* Charge Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">
            {realm === "potato" ? "Empathy Charge" : "Logic Charge"}
          </span>
          <span className="text-xs font-mono" style={{ color: colorValue }}>{charge}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: colorValue }}
            initial={{ width: 0 }}
            animate={{ width: `${charge}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2 mb-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{metric.label}</span>
            <span className="text-xs font-mono text-foreground">{metric.value}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      {isActive && charge < 100 && (
        <Button
          onClick={onPulse}
          className="w-full"
          variant="outline"
          style={{
            backgroundColor: `color-mix(in oklch, ${colorValue} 10%, transparent)`,
            color: colorValue,
            borderColor: `color-mix(in oklch, ${colorValue} 30%, transparent)`,
          }}
        >
          {realm === "potato" ? "Pulse with Planet" : "Solve Logic Gate"}
        </Button>
      )}

      {charge >= 100 && (
        <div 
          className="text-center py-2 rounded-lg"
          style={{ backgroundColor: `color-mix(in oklch, ${colorValue} 10%, transparent)` }}
        >
          <span 
            className="text-xs font-semibold"
            style={{ color: colorValue }}
          >
            {realm === "potato" ? "EMPATHY HARVESTED" : "LOGIC INFUSED"}
          </span>
        </div>
      )}
    </motion.div>
  );
}
