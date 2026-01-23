import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JellybodAvatar } from "@/components/JellybodAvatar";
import { EmpathyMatrix } from "@/components/EmpathyMatrix";
import { RealmPanel } from "@/components/RealmPanel";
import { PhaseIndicator } from "@/components/PhaseIndicator";
import { DataStreamVisualizer } from "@/components/DataStreamVisualizer";
import { JellyPrimeDialog } from "@/components/JellyPrimeDialog";
import { QuestObjective } from "@/components/QuestObjective";

export type QuestPhase = "intro" | "potato" | "schultz" | "synapse" | "complete";
export type DataColor = "empathy" | "logic" | "concordance" | "neutral";

const colors = {
  empathy: "oklch(0.75 0.2 155)",
  logic: "oklch(0.75 0.15 85)",
  concordance: "oklch(0.7 0.15 180)",
  jellybod: "oklch(0.65 0.2 290)",
};

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState<QuestPhase>("intro");
  const [empathyCharge, setEmpathyCharge] = useState(0);
  const [logicCharge, setLogicCharge] = useState(0);
  const [concordanceLevel, setConcordanceLevel] = useState(0);
  const [showDialog, setShowDialog] = useState(true);
  const [matrixHealth, setMatrixHealth] = useState(35);

  useEffect(() => {
    if (empathyCharge >= 100 && logicCharge >= 100) {
      setConcordanceLevel(Math.min(100, (empathyCharge + logicCharge) / 2));
    }
  }, [empathyCharge, logicCharge]);

  useEffect(() => {
    if (concordanceLevel >= 100 && currentPhase === "synapse") {
      setMatrixHealth(100);
      setTimeout(() => setCurrentPhase("complete"), 2000);
    }
  }, [concordanceLevel, currentPhase]);

  const handlePhaseAction = () => {
    switch (currentPhase) {
      case "intro":
        setShowDialog(false);
        setCurrentPhase("potato");
        break;
      case "potato":
        if (empathyCharge >= 100) setCurrentPhase("schultz");
        break;
      case "schultz":
        if (logicCharge >= 100) setCurrentPhase("synapse");
        break;
      case "synapse":
        break;
      case "complete":
        break;
    }
  };

  const handleEmpathyPulse = () => {
    if (currentPhase === "potato") {
      setEmpathyCharge((prev) => Math.min(100, prev + 12));
    }
  };

  const handleLogicSolve = () => {
    if (currentPhase === "schultz") {
      setLogicCharge((prev) => Math.min(100, prev + 15));
    }
  };

  const handleWeave = () => {
    if (currentPhase === "synapse" && empathyCharge >= 100 && logicCharge >= 100) {
      setConcordanceLevel((prev) => Math.min(100, prev + 10));
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.empathy} 5%, transparent)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.logic} 5%, transparent)`, animationDelay: "1.5s" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.concordance} 3%, transparent)`, animationDelay: "0.75s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              <span style={{ color: colors.empathy }}>Chromatic</span>{" "}
              <span style={{ color: colors.concordance }}>Concordance</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">The Empathy Matrix Recalibration</p>
          </div>
          <PhaseIndicator currentPhase={currentPhase} />
        </header>

        {/* Main Grid */}
        <main className="flex-1 p-6 grid grid-cols-12 gap-6">
          {/* Left Panel - Realm Status */}
          <aside className="col-span-3 space-y-4">
            <RealmPanel
              realm="potato"
              title="Potato Planet"
              subtitle="Foundation Realm"
              color="empathy"
              charge={empathyCharge}
              isActive={currentPhase === "potato"}
              onPulse={handleEmpathyPulse}
              metrics={[
                { label: "Stability Index", value: "0.72" },
                { label: "Days Sober", value: "120" },
                { label: "Recovery Status", value: "Stable" },
              ]}
            />
            <RealmPanel
              realm="schultz"
              title="Schultz World"
              subtitle="Challenge Realm"
              color="logic"
              charge={logicCharge}
              isActive={currentPhase === "schultz"}
              onPulse={handleLogicSolve}
              metrics={[
                { label: "XP Level", value: "15,000" },
                { label: "Quests Done", value: "45" },
                { label: "Engagement", value: "0.85" },
              ]}
            />
          </aside>

          {/* Center - Empathy Matrix Visualization */}
          <section className="col-span-6 flex flex-col items-center justify-center relative">
            <EmpathyMatrix
              empathyLevel={empathyCharge}
              logicLevel={logicCharge}
              concordanceLevel={concordanceLevel}
              matrixHealth={matrixHealth}
              currentPhase={currentPhase}
            />
            
            {/* Jellybod Avatar */}
            <div className="absolute bottom-8">
              <JellybodAvatar
                empathyCharge={empathyCharge}
                logicCharge={logicCharge}
                concordanceLevel={concordanceLevel}
                currentPhase={currentPhase}
              />
            </div>

            {/* Data Streams */}
            <DataStreamVisualizer
              empathyActive={currentPhase === "potato" || empathyCharge >= 100}
              logicActive={currentPhase === "schultz" || logicCharge >= 100}
              concordanceActive={currentPhase === "synapse" && concordanceLevel > 0}
            />
          </section>

          {/* Right Panel - Quest Info */}
          <aside className="col-span-3 space-y-4">
            <QuestObjective
              currentPhase={currentPhase}
              empathyCharge={empathyCharge}
              logicCharge={logicCharge}
              concordanceLevel={concordanceLevel}
              onAction={handlePhaseAction}
              onWeave={handleWeave}
            />
            
            {/* System Status */}
            <div className="glass-panel rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
                SYSTEM STATUS
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Recovery Service</span>
                  <span className="text-xs font-mono" style={{ color: colors.empathy }}>ONLINE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">AI/ML Layer</span>
                  <span className="text-xs font-mono" style={{ color: colors.logic }}>ONLINE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Recommendation Engine</span>
                  <span 
                    className="text-xs font-mono"
                    style={{ color: matrixHealth < 50 ? "oklch(0.65 0.25 25)" : colors.concordance }}
                  >
                    {matrixHealth < 50 ? "DEGRADED" : "OPTIMAL"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Empathy Matrix</span>
                  <span 
                    className={`text-xs font-mono ${matrixHealth < 50 ? "animate-pulse" : ""}`}
                    style={{ color: matrixHealth < 50 ? "oklch(0.65 0.25 25)" : colors.concordance }}
                  >
                    {matrixHealth}% HEALTH
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Jelly-Prime Dialog */}
      <AnimatePresence>
        {showDialog && (
          <JellyPrimeDialog
            currentPhase={currentPhase}
            onDismiss={() => {
              setShowDialog(false);
              if (currentPhase === "intro") setCurrentPhase("potato");
            }}
          />
        )}
      </AnimatePresence>

      {/* Completion Overlay */}
      <AnimatePresence>
        {currentPhase === "complete" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-3xl p-8 max-w-lg text-center glow-concordance"
            >
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `color-mix(in oklch, ${colors.concordance} 20%, transparent)` }}
              >
                <svg className="w-10 h-10" style={{ color: colors.concordance }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                <span style={{ color: colors.concordance }}>Concordance Restored!</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                The Empathy Matrix is recalibrated. The connection between recovery stability and skill potential has been restored.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `color-mix(in oklch, ${colors.empathy} 10%, transparent)` }}
                >
                  <div className="text-lg font-bold" style={{ color: colors.empathy }}>+15%</div>
                  <div className="text-xs text-muted-foreground">Systemic Attunement</div>
                </div>
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `color-mix(in oklch, ${colors.logic} 10%, transparent)` }}
                >
                  <div className="text-lg font-bold" style={{ color: colors.logic }}>NEW</div>
                  <div className="text-xs text-muted-foreground">Omniverse Insight</div>
                </div>
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `color-mix(in oklch, ${colors.concordance} 10%, transparent)` }}
                >
                  <div className="text-lg font-bold" style={{ color: colors.concordance }}>TEAL</div>
                  <div className="text-xs text-muted-foreground">Data Stream Tint</div>
                </div>
              </div>
              <p className="text-sm italic" style={{ color: colors.jellybod }}>
                "Go now, Little Bod, and return to your tuberous form. You have served the Omniverse well."
                <br />— Jelly-Prime
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
