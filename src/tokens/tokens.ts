/**
 * tokens.ts — typed reference catalogue for all design tokens.
 *
 * Maps token names to their CSS custom property names and notes.
 * Use this in tooling, AI codegen, charts, canvas renders, and
 * anything that needs to reference token names in TypeScript.
 *
 * ⚠ Rule: `value` fields in primitives are the source-of-truth HEX.
 *   Semantic tokens have NO value fields — actual computed values
 *   live exclusively in src/tokens/index.css.
 *   Never import this file inside a component.
 */

// ─── Primitives ───────────────────────────────────────────────────────────────

export const primitives = {
  color: {
    purple: {
      900: { var: '--color-purple-900', value: '#2D1B69', note: 'Deep brand purple — navbar, overlays' },
      700: { var: '--color-purple-700', value: '#6D28D9', note: 'Hover on solid purple — one step darker than 600' },
      600: { var: '--color-purple-600', value: '#7C3AED', note: 'Core brand purple — primary, active states, focus rings' },
      400: { var: '--color-purple-400', value: '#A78BFA', note: 'Light purple — dark mode active tints' },
      300: { var: '--color-purple-300', value: '#C4B5FD', note: 'Lighter purple — dark mode secondary foreground' },
      100: { var: '--color-purple-100', value: '#EDE9FE', note: 'Purple tint surface — light mode active-bg, badges' },
    },
    orange: {
      500: { var: '--color-orange-500', value: '#F97316', note: 'Brand accent — gradient end, used sparingly' },
      100: { var: '--color-orange-100', value: '#FFEDD5', note: 'Orange tint surface' },
    },
    neutral: {
      950: { var: '--color-neutral-950', value: '#0A0A0A', note: 'Near-black — action button fill in light mode' },
      900: { var: '--color-neutral-900', value: '#1A1A2E', note: 'Near-black foreground — has slight navy' },
      700: { var: '--color-neutral-700', value: '#4B5563', note: 'Mid-tone text' },
      500: { var: '--color-neutral-500', value: '#6B7280', note: 'Muted text, placeholders' },
      400: { var: '--color-neutral-400', value: '#9CA3AF', note: 'Muted text on dark surfaces' },
      300: { var: '--color-neutral-300', value: '#D1D5DB', note: 'Light dividers' },
      200: { var: '--color-neutral-200', value: '#E5E7EB', note: 'Borders, dividers, input stroke' },
      100: { var: '--color-neutral-100', value: '#ECECEC', note: 'Light mode hover/highlight surface' },
      white: { var: '--color-white', value: '#FFFFFF', note: 'Pure white' },
    },
    warm: {
      50:     { var: '--color-warm-50',     value: '#F6F6F4', note: 'App background in light mode' },
      100:    { var: '--color-warm-100',    value: '#F3F3F1', note: 'Panel/card surface — light mode' },
      200:    { var: '--color-warm-200',    value: '#EBEAE6', note: 'Muted surface — hover fills, disabled wells' },
      border: { var: '--color-warm-border', value: '#E8E8E5', note: 'Structural borders and input strokes — light mode' },
    },
    dark: {
      950:   { var: '--color-dark-950',   value: '#232426', note: 'Dark mode base background' },
      900:   { var: '--color-dark-900',   value: '#2A2B2E', note: 'Dark mode card/panel surface' },
      800:   { var: '--color-dark-800',   value: '#323438', note: 'Dark mode secondary/muted surface' },
      700:   { var: '--color-dark-700',   value: '#3A3C40', note: 'Dark mode border color' },
      border:{ var: '--color-dark-border',                  note: 'Alias of dark-700 — use this in components, not the step' },
    },
    status: {
      error:      { var: '--color-error',      value: '#EF4444', note: 'Destructive actions, failed states' },
      errorLight: { var: '--color-error-light', value: '#B91C1C', note: 'Destructive text on light surfaces (dark red)' },
      errorDark:  { var: '--color-error-dark',  value: '#FCA5A5', note: 'Destructive text on dark surfaces (muted red)' },
      error50:    { var: '--color-error-50',    value: '#FEF2F2', note: 'Destructive subtle bg (light mode)' },
      error100:   { var: '--color-error-100',   value: '#FEE2E2', note: 'Destructive subtle hover (light mode)' },
      error200:   { var: '--color-error-200',   value: '#FCA5A5', note: 'Destructive border (light mode)' },
      success:    { var: '--color-success',     value: '#22C55E', note: 'Passed checks, active, completed' },
      warning:    { var: '--color-warning',     value: '#F59E0B', note: 'Warnings, pending, degraded' },
    },
  },
} as const

// ─── Semantic ─────────────────────────────────────────────────────────────────
// Variable names only. Computed values live in src/tokens/index.css.
// Reading a value at runtime: getComputedStyle(document.documentElement).getPropertyValue('--token-name')

export const semantic = {
  // Core surfaces
  /** Page/app background */
  background:            { var: '--background' },
  /** Default text colour */
  foreground:            { var: '--foreground' },
  /** Card/panel surface */
  card:                  { var: '--card' },
  cardForeground:        { var: '--card-foreground' },
  /** Popover/dropdown/tooltip surface */
  popover:               { var: '--popover' },
  popoverForeground:     { var: '--popover-foreground' },

  // Brand
  /** Brand purple — active tabs, focus rings, feature CTAs */
  primary:               { var: '--primary' },
  primaryForeground:     { var: '--primary-foreground' },
  /** Purple-tinted surface — filters, chips, badges */
  secondary:             { var: '--secondary' },
  /** purple-600 light / purple-100 dark — near-white lavender on dark surfaces */
  secondaryForeground:   { var: '--secondary-foreground' },
  /** Inline link / link-variant button text. purple-600 light, purple-100 dark. */
  link:                  { var: '--link' },
  /** Orange — decorative highlights, gradient end. Not for interactive states. */
  accent:                { var: '--accent' },
  accentForeground:      { var: '--accent-foreground' },

  // Muted
  /** Hover fills, disabled wells, suppressed areas */
  muted:                 { var: '--muted' },
  /** Secondary text, labels, placeholders */
  mutedForeground:       { var: '--muted-foreground' },

  // Destructive
  destructive:           { var: '--destructive' },
  destructiveForeground: { var: '--destructive-foreground' },
  /** Text colour inside destructive surfaces */
  destructiveText:       { var: '--destructive-text' },
  /** Soft/tinted destructive button background */
  destructiveSubtle:     { var: '--destructive-subtle' },
  destructiveSubtleHover:{ var: '--destructive-subtle-hover' },
  destructiveBorder:     { var: '--destructive-border' },

  // Borders / inputs / ring
  /** Structural dividers and outlines */
  border:                { var: '--border' },
  /** Form field border */
  input:                 { var: '--input' },
  /** Keyboard focus ring — brand purple */
  ring:                  { var: '--ring' },

  // Action — high-contrast CTA (black in light, white in dark)
  /** High-contrast primary CTA fill */
  action:                { var: '--action' },
  actionForeground:      { var: '--action-foreground' },

  // Surface hierarchy
  surfaceBase:           { var: '--surface-base' },
  /** Sidebar/panel surface */
  surfacePanel:          { var: '--surface-panel' },
  /** Subtle nested surface */
  surfaceSubtle:         { var: '--surface-subtle' },
  /** Floating elevated surface */
  surfaceElevated:       { var: '--surface-elevated' },
  /** Hover overlay */
  surfaceHover:          { var: '--surface-hover' },
  /** Selected/active overlay */
  surfaceActive:         { var: '--surface-active' },

  // Workspace layout semantics
  workspaceCanvas:       { var: '--workspace-canvas' },
  workspaceSidebar:      { var: '--workspace-sidebar' },
  workspaceToolbar:      { var: '--workspace-toolbar' },
  documentSurface:       { var: '--document-surface' },

  // Active states
  /** Active item background */
  activeBg:              { var: '--active-bg' },
  /** Active item foreground/text */
  activeFg:              { var: '--active-fg' },
} as const

// ─── Brand ────────────────────────────────────────────────────────────────────

export const brand = {
  navbar:   { var: '--color-brand-navbar',   note: 'Sidebar/navbar background — deep purple' },
  primary:  { var: '--color-brand-primary',  note: 'Primary brand purple' },
  accent:   { var: '--color-brand-accent',   note: 'Orange accent — use sparingly' },
  gradient: { var: '--color-brand-gradient', note: 'Orange→purple gradient for the logomark and hero moments' },
} as const

// ─── Radius ───────────────────────────────────────────────────────────────────

export const radius = {
  none: { var: '--radius-none', value: '0' },
  sm:   { var: '--radius-sm',   value: '0.25rem', px: 4,  note: 'Subtle rounding — tags, small chips' },
  md:   { var: '--radius-md',   value: '0.5rem',  px: 8,  note: 'Standard UI — buttons, inputs' },
  lg:   { var: '--radius-lg',   value: '0.75rem', px: 12, note: 'Container rounding — cards, panels' },
  xl:   { var: '--radius-xl',   value: '1rem',    px: 16, note: 'Large surfaces — dialogs, modals' },
  full: { var: '--radius-full', value: '9999px',  note: 'Pills — avoid in chrome layer' },
} as const

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadow = {
  sm:       { var: '--shadow-sm',       note: 'Subtle lift' },
  md:       { var: '--shadow-md',       note: 'Moderate elevation — dropdowns, popovers' },
  lg:       { var: '--shadow-lg',       note: 'High elevation — modals, dialogs' },
  xl:       { var: '--shadow-xl',       note: 'Maximum elevation — toasts' },
  elevated: { var: '--shadow-elevated', note: 'Floating panel lift' },
  floating: { var: '--shadow-floating', note: 'Floating panel lift, stronger' },
} as const

// ─── Motion ───────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    fast:   { var: '--duration-fast',   value: '120ms', note: 'Micro-interactions, icon swaps' },
    normal: { var: '--duration-normal', value: '180ms', note: 'Default — most transitions' },
    slow:   { var: '--duration-slow',   value: '320ms', note: 'Complex layouts, accordions' },
  },
  easing: {
    in:    { var: '--ease-in',     note: 'Elements leaving the screen' },
    out:   { var: '--ease-out',    note: 'Elements entering the screen' },
    inOut: { var: '--ease-in-out', note: 'Elements that stay on screen and move' },
  },
  /** Shorthand multi-property transitions. Use in components via [transition:var(--transition-fast)]. */
  transition: {
    fast:   { var: '--transition-fast',   note: 'bg, border, color, opacity, transform — 120ms. Default for interactive controls.' },
    normal: { var: '--transition-normal', note: 'bg, border, transform, opacity — 180ms. Panels, popovers, layout shifts.' },
  },
} as const

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  size: {
    xs:    { var: '--font-size-xs',      value: '0.75rem'    },
    sm:    { var: '--font-size-sm',      value: '0.875rem'   },
    base:  { var: '--font-size-base',    value: '1rem'       },
    lg:    { var: '--font-size-lg',      value: '1.125rem'   },
    xl:    { var: '--font-size-xl',      value: '1.25rem'    },
    '2xl': { var: '--font-size-2xl',     value: '1.5rem'     },
    '3xl': { var: '--font-size-3xl',     value: '1.875rem'   },
    uiXs:  { var: '--font-size-ui-xs',   value: '0.6875rem'  },
    uiSm:  { var: '--font-size-ui-sm',   value: '0.8125rem'  },
    uiBase:{ var: '--font-size-ui-base', value: '0.9375rem'  },
  },
  weight: {
    normal:   { var: '--font-weight-normal',   value: '400' },
    medium:   { var: '--font-weight-medium',   value: '500' },
    semibold: { var: '--font-weight-semibold', value: '600' },
    bold:     { var: '--font-weight-bold',     value: '700' },
  },
  lineHeight: {
    tight:   { var: '--line-height-tight',   value: '1.25' },
    normal:  { var: '--line-height-normal',  value: '1.5'  },
    relaxed: { var: '--line-height-relaxed', value: '1.75' },
  },
  letterSpacing: {
    tight:  { var: '--letter-spacing-tight',  value: '-0.02em' },
    normal: { var: '--letter-spacing-normal', value: '-0.01em' },
  },
} as const

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  '0-5': { var: '--space-0-5', value: '0.125rem', px: 2  },
  1:     { var: '--space-1',   value: '0.25rem',  px: 4  },
  '1-5': { var: '--space-1-5', value: '0.375rem', px: 6  },
  2:     { var: '--space-2',   value: '0.5rem',   px: 8  },
  '2-5': { var: '--space-2-5', value: '0.625rem', px: 10 },
  3:     { var: '--space-3',   value: '0.75rem',  px: 12 },
  4:     { var: '--space-4',   value: '1rem',     px: 16 },
  5:     { var: '--space-5',   value: '1.25rem',  px: 20 },
  6:     { var: '--space-6',   value: '1.5rem',   px: 24 },
  8:     { var: '--space-8',   value: '2rem',     px: 32 },
  10:    { var: '--space-10',  value: '2.5rem',   px: 40 },
  12:    { var: '--space-12',  value: '3rem',     px: 48 },
  16:    { var: '--space-16',  value: '4rem',     px: 64 },
} as const

// ─── Layout ───────────────────────────────────────────────────────────────────

export const layout = {
  sidebarWidth:  { var: '--sidebar-width',  value: '260px' },
  topbarHeight:  { var: '--topbar-height',  value: '44px'  },
  composerWidth: { var: '--composer-width', value: '520px' },
} as const

// ─── Controls ─────────────────────────────────────────────────────────────────

export const control = {
  xs: { var: '--control-xs', value: '24px' },
  sm: { var: '--control-sm', value: '32px' },
  md: { var: '--control-md', value: '40px' },
  lg: { var: '--control-lg', value: '48px' },
} as const

export const icon = {
  xs: { var: '--icon-xs', value: '12px' },
  sm: { var: '--icon-sm', value: '14px' },
  md: { var: '--icon-md', value: '16px' },
  lg: { var: '--icon-lg', value: '20px' },
} as const

// ─── Z-index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  base:     { var: '--z-0',        value: 0    },
  raised:   { var: '--z-10',       value: 10   },
  dropdown: { var: '--z-dropdown', value: 1000 },
  sticky:   { var: '--z-sticky',   value: 1100 },
  overlay:  { var: '--z-overlay',  value: 1200 },
  modal:    { var: '--z-modal',    value: 1300 },
  toast:    { var: '--z-toast',    value: 1400 },
} as const
