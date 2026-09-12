import { motion } from "framer-motion";
import { SpudverseColors } from "@chromatic-concordance/shared-core";

type Accent = "empathy" | "logic" | "concordance";

type Slide = {
  id: string;
  title: string;
  kicker?: string;
  subtitle?: string;
  highlights: string[];
  accent?: Accent;
};

const slides: Slide[] = [
  {
    id: "intro",
    title: "Capability Readiness Brief",
    subtitle: "A transparent decision-support prototype for AI teams",
    kicker: "Prototype • Product direction • Evidence-led",
    highlights: [
      "Map capabilities, dependencies, evidence, and risks",
      "Surface gaps and next actions with visible context",
      "Export a concise brief for a team or client workshop",
    ],
    accent: "concordance",
  },
  {
    id: "gap",
    title: "The Gap in Our Analytics Stack",
    highlights: [
      "Before: fragmented notes, spreadsheets, and unclear ownership",
      "Business impact: slow decisions, duplicated work, and hidden dependencies",
      "Target: one shared map with explicit evidence and follow-up actions",
    ],
    accent: "empathy",
  },
  {
    id: "stack",
    title: "What We Built: The DEEPDIVE Stack",
    highlights: [
      "Relationship model: typed connections between capabilities and initiatives",
      "Readiness view: transparent indicators for evidence, risk, and ownership",
      "Action layer: turn identified gaps into a short, reviewable next-action list",
      "Integration path: map → explain → decide → export",
    ],
    accent: "logic",
  },
  {
    id: "value",
    title: "Immediate Business Value",
    highlights: [
      "Shared language: align product, operations, and enablement conversations",
      "Explainability: show the evidence behind every readiness signal",
      "Practical output: leave a workshop with a brief and owned next steps",
    ],
    accent: "concordance",
  },
  {
    id: "pathway",
    title: "Capability Growth Pathway",
    highlights: [
      "Stages: baseline → evidence → practice → review",
      "Each stage records what is known, what is missing, and who owns the next step",
      "No financial or career outcome is inferred from the map",
    ],
    accent: "empathy",
  },
  {
    id: "milestones",
    title: "Immediate beta milestones",
    highlights: [
      "Milestone 1: persistent capability and relationship maps",
      "Milestone 2: exportable readiness brief with evidence labels",
      "Milestone 3: narrowly scoped AI suggestions with source context",
      "System status: prototype; validation required before production claims",
    ],
    accent: "logic",
  },
  {
    id: "roadmap",
    title: "Strategic Roadmap",
    highlights: [
      "Validate: five buyer conversations and one paid workshop",
      "Build: persistence, permissions, export, and an audit-friendly history",
      "Package: workshop kit first, team workspace second, embedded intelligence later",
      "Prompt: REVIEW_EVIDENCE_AND_NEXT_ACTIONS",
    ],
    accent: "concordance",
  },
];

export default function MLToolkitDeck() {
  const colors = SpudverseColors;

  const accentMap: Record<Accent, string> = {
    empathy: colors.empathy,
    logic: colors.logic,
    concordance: colors.concordance,
  };

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
