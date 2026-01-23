/**
 * Theme Tokens
 * 
 * Defines the design system tokens for colors, spacing, typography,
 * and other visual elements used across the Chromatic Concordance UI.
 */

/**
 * Core Spudverse custom colors
 */
export const SpudverseColors = {
  empathy: "oklch(0.75 0.2 155)",
  logic: "oklch(0.75 0.15 85)",
  concordance: "oklch(0.7 0.15 180)",
  jellybod: "oklch(0.65 0.2 290)",
  void: "oklch(0.12 0.02 260)",
} as const;

/**
 * Light theme color palette
 */
export const LightThemeColors = {
  primary: "oklch(0.8 0.15 180)",
  primaryForeground: "oklch(0.12 0.02 260)",
  background: "oklch(0.98 0.01 180)",
  foreground: "oklch(0.12 0.02 260)",
  card: "oklch(0.95 0.01 180)",
  cardForeground: "oklch(0.12 0.02 260)",
  popover: "oklch(0.98 0.01 180)",
  popoverForeground: "oklch(0.12 0.02 260)",
  secondary: "oklch(0.92 0.02 180)",
  secondaryForeground: "oklch(0.15 0.03 260)",
  muted: "oklch(0.95 0.02 180)",
  mutedForeground: "oklch(0.5 0.02 180)",
  accent: "oklch(0.9 0.03 180)",
  accentForeground: "oklch(0.12 0.02 260)",
  destructive: "oklch(0.65 0.25 25)",
  destructiveForeground: "oklch(0.98 0 0)",
  border: "oklch(0.85 0.02 180)",
  input: "oklch(0.9 0.02 180)",
  ring: "oklch(0.8 0.15 180)",
} as const;

/**
 * Dark theme color palette (default for the app)
 */
export const DarkThemeColors = {
  primary: "oklch(0.8 0.15 180)",
  primaryForeground: "oklch(0.12 0.02 260)",
  background: "oklch(0.08 0.02 260)",
  foreground: "oklch(0.95 0.01 180)",
  card: "oklch(0.12 0.03 260)",
  cardForeground: "oklch(0.95 0.01 180)",
  popover: "oklch(0.12 0.03 260)",
  popoverForeground: "oklch(0.95 0.01 180)",
  secondary: "oklch(0.15 0.03 260)",
  secondaryForeground: "oklch(0.9 0.01 180)",
  muted: "oklch(0.18 0.02 260)",
  mutedForeground: "oklch(0.7 0.02 180)",
  accent: "oklch(0.2 0.04 260)",
  accentForeground: "oklch(0.95 0.01 180)",
  destructive: "oklch(0.65 0.25 25)",
  destructiveForeground: "oklch(0.98 0 0)",
  border: "oklch(0.25 0.03 260)",
  input: "oklch(0.2 0.03 260)",
  ring: "oklch(0.8 0.15 180)",
} as const;

/**
 * Chart colors for data visualization
 */
export const ChartColors = {
  chart1: "oklch(0.85 0.2 155)", // Empathy green
  chart2: "oklch(0.85 0.15 85)", // Logic gold
  chart3: "oklch(0.8 0.15 180)", // Concordance teal
  chart4: "oklch(0.7 0.2 290)", // Jellybod purple
  chart5: "oklch(0.6 0.15 220)", // Additional accent
} as const;

/**
 * Sidebar specific colors
 */
export const SidebarColors = {
  sidebar: "oklch(0.1 0.02 260)",
  sidebarForeground: "oklch(0.95 0.01 180)",
  sidebarPrimary: "oklch(0.8 0.15 180)",
  sidebarPrimaryForeground: "oklch(0.12 0.02 260)",
  sidebarAccent: "oklch(0.15 0.03 260)",
  sidebarAccentForeground: "oklch(0.95 0.01 180)",
  sidebarBorder: "oklch(0.25 0.03 260)",
  sidebarRing: "oklch(0.8 0.15 180)",
} as const;

/**
 * Typography scale
 */
export const Typography = {
  fontDisplay: '"Space Grotesk", system-ui, sans-serif',
  fontBody: '"Inter", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", monospace',
  
  fontSize: {
    xs: "0.75rem",     // 12px
    sm: "0.875rem",    // 14px
    base: "1rem",      // 16px
    lg: "1.125rem",    // 18px
    xl: "1.25rem",     // 20px
    "2xl": "1.5rem",   // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
  },
  
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const;

/**
 * Spacing scale (in rem units)
 */
export const Spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",   // 2px
  1: "0.25rem",      // 4px
  1.5: "0.375rem",   // 6px
  2: "0.5rem",       // 8px
  2.5: "0.625rem",   // 10px
  3: "0.75rem",      // 12px
  3.5: "0.875rem",   // 14px
  4: "1rem",         // 16px
  5: "1.25rem",      // 20px
  6: "1.5rem",       // 24px
  7: "1.75rem",      // 28px
  8: "2rem",         // 32px
  9: "2.25rem",      // 36px
  10: "2.5rem",      // 40px
  11: "2.75rem",     // 44px
  12: "3rem",        // 48px
  14: "3.5rem",      // 56px
  16: "4rem",        // 64px
  20: "5rem",        // 80px
  24: "6rem",        // 96px
  28: "7rem",        // 112px
  32: "8rem",        // 128px
} as const;

/**
 * Border radius scale
 */
export const BorderRadius = {
  none: "0",
  sm: "calc(1rem - 4px)",
  md: "calc(1rem - 2px)",
  lg: "1rem",
  xl: "calc(1rem + 4px)",
  "2xl": "1.5rem",
  "3xl": "2rem",
  full: "9999px",
} as const;

/**
 * Animation durations (in seconds)
 */
export const AnimationDuration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  breathe: 4, // For pulsing/breathing effects
  orbit: 20,  // For orbital animations
  rotate: 60, // For continuous rotation
} as const;

/**
 * Z-index scale for layering
 */
export const ZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

/**
 * Complete theme object combining all tokens
 */
export const Theme = {
  colors: {
    spudverse: SpudverseColors,
    light: LightThemeColors,
    dark: DarkThemeColors,
    chart: ChartColors,
    sidebar: SidebarColors,
  },
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  animation: AnimationDuration,
  zIndex: ZIndex,
} as const;

/**
 * Type exports for theme values
 */
export type SpudverseColorKey = keyof typeof SpudverseColors;
export type ChartColorKey = keyof typeof ChartColors;
export type ThemeColorKey = keyof typeof LightThemeColors;
export type FontSize = keyof typeof Typography.fontSize;
export type FontWeight = keyof typeof Typography.fontWeight;
export type SpacingKey = keyof typeof Spacing;
export type BorderRadiusKey = keyof typeof BorderRadius;
