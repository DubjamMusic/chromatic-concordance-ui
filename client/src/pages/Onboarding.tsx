import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SpudverseColors } from "@chromatic-concordance/shared-core";
import type { RelationshipType, RelationshipStrength, FlowDirection } from "@chromatic-concordance/shared-core";
import { 
  ArrowRight, 
  Network, 
  Heart, 
  Brain, 
  Sparkles, 
  Circle,
  ArrowLeftRight,
  ArrowRightLeft,
  Zap,
  Shield,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const colors = SpudverseColors;

// Relationship type definitions with descriptions
const relationshipTypes: Array<{
  type: RelationshipType;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  useCase: string;
}> = [
  {
    type: "data-stream",
    name: "Data Stream",
    description: "The fundamental data connection between nodes. Transfers information packets with defined bandwidth and latency.",
    color: colors.concordance,
    icon: Network,
    useCase: "Used for real-time data synchronization between Potato Planet and Schultz World"
  },
  {
    type: "empathy-link",
    name: "Empathy Link",
    description: "Emotional resonance connection that enables recovery stability monitoring and empathetic responses.",
    color: colors.empathy,
    icon: Heart,
    useCase: "Monitors user's emotional state and recovery metrics in Potato Planet realm"
  },
  {
    type: "logic-link",
    name: "Logic Link",
    description: "Computational pathway for skill assessment, challenge progression, and performance analytics.",
    color: colors.logic,
    icon: Brain,
    useCase: "Analyzes gameplay patterns and skill development in Schultz World"
  },
  {
    type: "concordance-bond",
    name: "Concordance Bond",
    description: "The synthesis connection that merges empathy and logic data into unified insights and recommendations.",
    color: colors.concordance,
    icon: Sparkles,
    useCase: "Generates personalized recommendations by combining recovery + skill data"
  },
  {
    type: "void-connection",
    name: "Void Connection",
    description: "Mysterious connection to the Void realm. Purpose unknown. Handle with care.",
    color: colors.void,
    icon: Circle,
    useCase: "Reserved for system debugging and emergency failsafe protocols"
  }
];

// Strength indicators
const strengthLevels: Array<{
  level: RelationshipStrength;
  name: string;
  description: string;
  color: string;
}> = [
  {
    level: "weak",
    name: "Weak",
    description: "Initial connection. Low bandwidth, higher latency. May be unstable.",
    color: "oklch(0.6 0.1 25)"
  },
  {
    level: "moderate",
    name: "Moderate", 
    description: "Established connection. Balanced performance. Suitable for most operations.",
    color: "oklch(0.7 0.15 85)"
  },
  {
    level: "strong",
    name: "Strong",
    description: "Robust connection. High bandwidth, low latency. Highly reliable.",
    color: "oklch(0.75 0.2 155)"
  },
  {
    level: "critical",
    name: "Critical",
    description: "System-critical connection. Maximum performance. Cannot be interrupted.",
    color: "oklch(0.8 0.25 330)"
  }
];

// Flow direction types
const flowDirections: Array<{
  direction: FlowDirection;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    direction: "unidirectional",
    name: "Unidirectional",
    description: "Data flows in one direction only. Source → Target.",
    icon: ArrowRight
  },
  {
    direction: "bidirectional",
    name: "Bidirectional",
    description: "Data flows in both directions. Source ↔ Target.",
    icon: ArrowLeftRight
  }
];

export default function Onboarding() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [hoveredType, setHoveredType] = useState<RelationshipType | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.concordance} 5%, transparent)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: `color-mix(in oklch, ${colors.empathy} 5%, transparent)`, animationDelay: "1.5s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between border-b border-border/50">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              <span style={{ color: colors.concordance }}>Welcome to</span>{" "}
              <span style={{ color: colors.empathy }}>Chromatic Concordance</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Understanding Relationships in the System</p>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="types">Relationship Types</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="w-6 h-6" style={{ color: colors.concordance }} />
                      What are Relationships?
                    </CardTitle>
                    <CardDescription>
                      The foundation of the Chromatic Concordance system
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground">
                      Relationships are the connections that bind together the nodes in our system. 
                      They enable data flow, emotional resonance, and computational pathways between 
                      different realms and entities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div 
                        className="p-4 rounded-lg glass-panel"
                        style={{ borderLeft: `3px solid ${colors.empathy}` }}
                      >
                        <Heart className="w-8 h-8 mb-2" style={{ color: colors.empathy }} />
                        <h3 className="font-semibold mb-1">Empathy</h3>
                        <p className="text-sm text-muted-foreground">
                          Monitor recovery stability and emotional well-being
                        </p>
                      </div>
                      <div 
                        className="p-4 rounded-lg glass-panel"
                        style={{ borderLeft: `3px solid ${colors.logic}` }}
                      >
                        <Brain className="w-8 h-8 mb-2" style={{ color: colors.logic }} />
                        <h3 className="font-semibold mb-1">Logic</h3>
                        <p className="text-sm text-muted-foreground">
                          Analyze skills, performance, and progression
                        </p>
                      </div>
                      <div 
                        className="p-4 rounded-lg glass-panel"
                        style={{ borderLeft: `3px solid ${colors.concordance}` }}
                      >
                        <Sparkles className="w-8 h-8 mb-2" style={{ color: colors.concordance }} />
                        <h3 className="font-semibold mb-1">Concordance</h3>
                        <p className="text-sm text-muted-foreground">
                          Synthesize insights into personalized recommendations
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle>Why Relationships Matter</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 mt-1 shrink-0" style={{ color: colors.empathy }} />
                      <div>
                        <p className="font-medium">Holistic Recovery Support</p>
                        <p className="text-sm text-muted-foreground">
                          By connecting recovery metrics with gameplay data, we provide better support
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 mt-1 shrink-0" style={{ color: colors.logic }} />
                      <div>
                        <p className="font-medium">Adaptive Challenge Scaling</p>
                        <p className="text-sm text-muted-foreground">
                          System adjusts difficulty based on your current state and capabilities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 mt-1 shrink-0" style={{ color: colors.concordance }} />
                      <div>
                        <p className="font-medium">Personalized Recommendations</p>
                        <p className="text-sm text-muted-foreground">
                          AI-powered insights combine all data streams for optimal guidance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Types Tab */}
            <TabsContent value="types" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {relationshipTypes.map((rel, index) => {
                  const Icon = rel.icon;
                  const isHovered = hoveredType === rel.type;
                  
                  return (
                    <motion.div
                      key={rel.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredType(rel.type)}
                      onMouseLeave={() => setHoveredType(null)}
                    >
                      <Card 
                        className={`glass-panel h-full transition-all duration-300 ${
                          isHovered ? 'scale-105 shadow-lg' : ''
                        }`}
                        style={{ 
                          borderTop: `3px solid ${rel.color}`,
                          ...(isHovered && { 
                            boxShadow: `0 0 20px ${rel.color}40` 
                          })
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <div 
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `color-mix(in oklch, ${rel.color} 20%, transparent)` }}
                            >
                              <Icon className="w-6 h-6" style={{ color: rel.color }} />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {rel.type}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{rel.name}</CardTitle>
                          <CardDescription>{rel.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div 
                            className="p-3 rounded-lg text-sm"
                            style={{ backgroundColor: `color-mix(in oklch, ${rel.color} 10%, transparent)` }}
                          >
                            <p className="font-medium mb-1" style={{ color: rel.color }}>Use Case:</p>
                            <p className="text-xs text-muted-foreground">{rel.useCase}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" style={{ color: colors.logic }} />
                      Relationship Strength
                    </CardTitle>
                    <CardDescription>
                      Indicates the robustness and reliability of a connection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strengthLevels.map((strength) => (
                        <div 
                          key={strength.level}
                          className="flex items-start gap-4 p-3 rounded-lg glass-panel"
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `color-mix(in oklch, ${strength.color} 20%, transparent)` }}
                          >
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: strength.color }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold" style={{ color: strength.color }}>
                                {strength.name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {strength.level}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{strength.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowRightLeft className="w-5 h-5" style={{ color: colors.concordance }} />
                      Flow Direction
                    </CardTitle>
                    <CardDescription>
                      Defines how data moves through the relationship
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {flowDirections.map((flow) => {
                        const Icon = flow.icon;
                        return (
                          <div 
                            key={flow.direction}
                            className="p-4 rounded-lg glass-panel"
                          >
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                              style={{ backgroundColor: `color-mix(in oklch, ${colors.concordance} 20%, transparent)` }}
                            >
                              <Icon className="w-6 h-6" style={{ color: colors.concordance }} />
                            </div>
                            <h3 className="font-semibold mb-1">{flow.name}</h3>
                            <p className="text-sm text-muted-foreground">{flow.description}</p>
                            <Badge variant="secondary" className="text-xs mt-2">
                              {flow.direction}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle>Other Properties</CardTitle>
                    <CardDescription>
                      Additional characteristics that define relationship behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Bandwidth</h4>
                        <p className="text-sm text-muted-foreground">
                          Measured 0-100, represents data flow capacity. Higher is better.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Latency</h4>
                        <p className="text-sm text-muted-foreground">
                          Measured in milliseconds, represents response time. Lower is better.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Active Status</h4>
                        <p className="text-sm text-muted-foreground">
                          Boolean flag indicating if the relationship is currently transmitting data.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Data Color</h4>
                        <p className="text-sm text-muted-foreground">
                          Visual indicator: empathy (teal), logic (yellow), concordance (cyan), neutral (gray).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Examples Tab */}
            <TabsContent value="examples" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle>Real-World Relationship Example</CardTitle>
                    <CardDescription>
                      How relationships work in practice during gameplay
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Example 1 */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors.empathy }}
                        />
                        <h3 className="font-semibold">Empathy Link: Potato Planet → Empathy Matrix</h3>
                      </div>
                      <div className="pl-5 space-y-2 text-sm">
                        <p><span className="font-medium">Type:</span> empathy-link</p>
                        <p><span className="font-medium">Strength:</span> strong</p>
                        <p><span className="font-medium">Flow:</span> unidirectional (Potato Planet sends data)</p>
                        <p><span className="font-medium">Bandwidth:</span> 85/100</p>
                        <p><span className="font-medium">Latency:</span> 12ms</p>
                        <p className="text-muted-foreground italic">
                          This connection transmits your recovery stability metrics, days sober count, 
                          and emotional state indicators to the central Empathy Matrix for analysis.
                        </p>
                      </div>
                    </div>

                    {/* Example 2 */}
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors.logic }}
                        />
                        <h3 className="font-semibold">Logic Link: Schultz World ↔ AI/ML System</h3>
                      </div>
                      <div className="pl-5 space-y-2 text-sm">
                        <p><span className="font-medium">Type:</span> logic-link</p>
                        <p><span className="font-medium">Strength:</span> critical</p>
                        <p><span className="font-medium">Flow:</span> bidirectional (data exchange)</p>
                        <p><span className="font-medium">Bandwidth:</span> 95/100</p>
                        <p><span className="font-medium">Latency:</span> 8ms</p>
                        <p className="text-muted-foreground italic">
                          Your gameplay data (XP, quests completed, engagement) flows to the AI system, 
                          which returns skill predictions and optimal challenge recommendations.
                        </p>
                      </div>
                    </div>

                    {/* Example 3 */}
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors.concordance }}
                        />
                        <h3 className="font-semibold">Concordance Bond: Combined Data → Recommendations</h3>
                      </div>
                      <div className="pl-5 space-y-2 text-sm">
                        <p><span className="font-medium">Type:</span> concordance-bond</p>
                        <p><span className="font-medium">Strength:</span> strong</p>
                        <p><span className="font-medium">Flow:</span> bidirectional</p>
                        <p><span className="font-medium">Bandwidth:</span> 90/100</p>
                        <p><span className="font-medium">Latency:</span> 15ms</p>
                        <p className="text-muted-foreground italic">
                          The synthesis connection merges empathy and logic streams to generate 
                          personalized recommendations that balance recovery support with skill development.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-panel border-l-4" style={{ borderLeftColor: colors.void }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" style={{ color: colors.void }} />
                      Important Note
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Relationships are dynamic and can change strength based on system load, 
                      network conditions, and data flow patterns. The system automatically 
                      optimizes connections to maintain optimal performance and reliability.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link href="/">
              <Button size="lg" className="gap-2">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="p-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>Chromatic Concordance • The Empathy Matrix Recalibration System</p>
        </footer>
      </div>
    </div>
  );
}
