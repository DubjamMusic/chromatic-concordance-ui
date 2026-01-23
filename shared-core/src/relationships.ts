/**
 * Relationship Types
 * 
 * Defines the different types of relationships and connections
 * between nodes in the Chromatic Concordance system.
 */

import type { DataColor, RealmNodeType } from "./nodes";

/**
 * Types of relationships between nodes
 */
export type RelationshipType = 
  | "data-stream" 
  | "empathy-link" 
  | "logic-link" 
  | "concordance-bond"
  | "void-connection";

/**
 * Strength of a relationship
 */
export type RelationshipStrength = "weak" | "moderate" | "strong" | "critical";

/**
 * Direction of data flow in a relationship
 */
export type FlowDirection = "unidirectional" | "bidirectional";

/**
 * Represents a relationship between two nodes in the Concordance system
 */
export interface Relationship {
  id: string;
  type: RelationshipType;
  sourceNodeId: string;
  targetNodeId: string;
  strength: RelationshipStrength;
  dataColor: DataColor;
  flowDirection: FlowDirection;
  bandwidth: number; // 0-100, represents data flow capacity
  latency: number; // milliseconds
  active: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Represents a data stream flowing between realms
 */
export interface DataStream extends Relationship {
  type: "data-stream";
  particleCount: number;
  flowRate: number; // particles per second
  visualEffect?: "bioluminescent" | "pulsing" | "shimmering";
}

/**
 * Represents the connection configuration between two realms
 */
export interface RealmConnection {
  sourceRealm: RealmNodeType;
  targetRealm: RealmNodeType;
  relationships: Relationship[];
  isStable: boolean;
  lastSyncTimestamp?: Date;
}

/**
 * Network of all relationships in the system
 */
export interface RelationshipNetwork {
  nodes: string[]; // Array of node IDs
  relationships: Relationship[];
  totalBandwidth: number;
  averageLatency: number;
  networkHealth: number; // 0-100
}
