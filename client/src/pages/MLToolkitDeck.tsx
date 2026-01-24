import { useMemo } from "react";
import { motion } from "framer-motion";
import { SpudverseColors } from "@chromatic-concordance/shared-core";

type Slide = {
  id: string;
  title: string;
  kicker?: string;
  subtitle?: string;
  highlights: string[];
  accent?: keyof typeof SpudverseColors;
};

const slides: Slide[] = [
  {
    id: "intro",
    title: "HustleCodex ML-Toolkit",
    subtitle: "Predictive Analytics Engine — Integration Complete",
    kicker: "v1.0.0 • January 2026 • Executive Summary",
    highlights: [
      "DEEPDIVE Stack now live in production",
      "Real-time predictive insights replace manual analysis",
      "Automated pathways unlock new revenue streams",
    ],
    accent: "concordance",
  },
  {
    id: "gap",
    title: "The Gap in Our Analytics Stack",
    highlights: [
      "Before: Manual Analysis • Avg Insight Delay: 72 hours • Predictive Coverage: 0%",
      "Business Impact: Missed Opportunities • Reactive Decisions • User Churn",
      "Target: Shift to proactive, real-time predictions with automated intervention",
    ],
    accent: "empathy",
  },
  {
    id: "stack",
    title: "What We Built: The DEEPDIVE Stack",
    highlights: [
      "DEEPDIVE Agent: AI orchestrator for command interpretation & pipeline coordination",
      "mlBox Router: tRPC API layer for analysis execution and result delivery",
      "ML Pipeline: Python ensemble (RandomForest + Gradient Boosting) powering predictive analytics",
      "Integration Flow: invoke → route → ensemble inference → return results",
    ],
    accent: "logic",
  },
  {
    id: "value",
    title: "Immediate Business Value",
    highlights: [
      "90% Model Accuracy: reliable intervention strategies & personalized guidance",
      "Automated Revenue Mapping: maps user experience/skills to market value projections",
      "Projected 20% Retention Uplift from proactive, data-driven interventions",
    ],
    accent: "concordance",
  },
  {
    id: "pathway",
    title: "Financial Freedom Pathway (12-Month Projection)",
    highlights: [
      "Revenue ramp: $9,552 (Month 1) → $158,900 (Month 12) • +1,563%",
      "Stages: Base → Adept → Mentor with compounding expertise value",
      "Roles: AI Specialist (high demand, $145k+ avg salary) • Web3 Architect (decentralized, $180/hr potential)",
    ],
    accent: "empathy",
  },
  {
    id: "milestones",
    title: "Immediate Milestones: Q1 2026",
    highlights: [
      "Feb 2026: Launch Revenue Dashboard",
      "Mar 2026: Dual-Track Curriculum for AI Specialists & Web3 Architects",
      "Apr 2026: Real-Time Market Feed via live job market APIs",
      "System Status: Execution Phase Active",
    ],
    accent: "logic",
  },
  {
    id: "roadmap",
    title: "Strategic Roadmap",
    highlights: [
      "Production Rollout: immediate deployment & configuration",
      "Automation Cycle: daily analysis rhythms and continuous insights",
      "Monetization: Financial Freedom Score, Career Path Simulator, Premium Subscriptions",
      "Prompt: EXECUTE_PRODUCTION_DEPLOYMENT?",
    ],
    accent: "concordance",
  },
];

export default function MLToolkitDeck() {
  const colors = SpudverseColors;

  const accentMap = useMemo(
    () => ({
      empathy: colors.empathy,
      logic: colors.logic,
      concordance: colors.concordance,
      jellybod: colors.jellybod,
      "jellybod-glow": colors["jellybod-glow"],
      "concordance-glow": colors["concordance-glow"],
    }),
    [colors],
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.empathy} 6%, transparent)` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[480px] h-[480px] rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.concordance} 5%, transparent)`, animationDelay: "1.4s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.logic} 4%, transparent)`, animationDelay: "0.8s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">HustleCodex • DEEPDIVE Stack</p>
            <h1 className="text-3xl font-bold tracking-tight mt-2" style={{ fontFamily: "var(--font-display)" }}>
              <span style={{ color: colors.concordance }}>ML-Toolkit</span>{" "}
              <span style={{ color: colors.empathy }}>Deck</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">Predictive analytics engine now live in production.</p>
          </div>
          <div className="glass-panel px-4 py-3 rounded-2xl text-right">
            <p className="text-xs text-muted-foreground">Version</p>
            <p className="text-lg font-semibold" style={{ color: colors.logic }}>
              v1.0.0
            </p>
            <p className="text-xs text-muted-foreground">January 2026</p>
          </div>
        </header>

        <div className="grid gap-6">
          {slides.map((slide, idx) => {
            const accentColor = slide.accent ? accentMap[slide.accent] : colors.concordance;
            return (
              <motion.section
                key={slide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 shadow-lg"
                style={{ background: "color-mix(in oklch, #0b1016 80%, transparent)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {slide.kicker && (
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{slide.kicker}</p>
                    )}
                    <h2 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: accentColor, fontFamily: "var(--font-display)" }}>
                      {slide.title}
                    </h2>
                    {slide.subtitle && <p className="text-sm text-muted-foreground mb-3">{slide.subtitle}</p>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                    <span>Slide {idx + 1} / {slides.length}</span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {slide.highlights.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
