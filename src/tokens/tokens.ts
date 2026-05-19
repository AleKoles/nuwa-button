/**
 * tokens.ts — typed constants for all design tokens in this system.
 *
 * These mirror the CSS custom properties in `tokens/index.css`.
 * Use these when you need token names or values in TypeScript/JS (e.g. in
 * charts, canvas renders, animations, or AI-generated component suggestions).
 *
 * Rule: components should consume tokens via Tailwind utilities, not by
 * importing from this file. This file is for tooling and metadata only.
 */

// ─── Primitive — Brand Colors ────────────────────────────────────────────────

export const primitives = {
  color: {
    purple: {
      900: { var: '--color-purple-900', value: '#2D1B69', note: 'Deep brand purple — navbar, dark surfaces' },
      600: { var: '--color-purple-600', value: '#7C3AED', note: 'Core brand purple — primary actions' },
      100: { var: '--color-purple-100', value: '#EDE9FE', note: 'Light purple tint — secondary bg, badges' },
    },
    orange: {
      500: { var: '--color-orange-500', value: '#F97316', note: 'Brand accent — CTAs, highlights, gradient end' },
      100: { var: '--color-orange-100', value: '#FFEDD5', note: 'Light orange tint' },
    },
    neutral: {
      950: { var: '--color-neutral-950', value: '#0A0A0A', note: 'Near-black — action button fill in light mode' },
      900: { var: '--color-neutral-900', value: '#1A1A2E', note: 'Near-black foreground' },
      500: { var: '--color-neutral-500', value: '#6B7280', note: 'Muted text, placeholders' },
      400: { var: '--color-neutral-400', value: '#9CA3AF', note: 'Muted text on dark surfaces' },
      200: { var: '--color-neutral-200', value: '#E5E7EB', note: 'Borders, dividers, input stroke' },
      100: { var: '--color-neutral-100', value: '#ECECEC', note: 'Light mode hover/highlight surface' },
      white: { var: '--color-white', value: '#FFFFFF', note: 'Pure white' },
    },
    dark: {
      950: { var: '--color-dark-950', value: '#222325', note: 'Dark mode base background — matched to product' },
      900: { var: '--color-dark-900', value: '#2a2c2e', note: 'Dark mode highlight/elevated surface' },
      800: { var: '--color-dark-800', value: '#313336', note: 'Dark mode secondary surface' },
      border: { var: '--color-dark-border', value: '#3a3c3e', note: 'Dark mode subtle border' },
    },
    status: {
      error:   { var: '--color-error',   value: '#EF4444', note: 'Destructive actions, failed states' },
      success: { var: '--color-success', value: '#22C55E', note: 'Passed checks, active, completed' },
      warning: { var: '--color-warning', value: '#F59E0B', note: 'Warnings, pending, degraded' },
    },
  },
} as const

// ─── Semantic — Light Mode ────────────────────────────────────────────────────

export const semantic = {
  /** Page/app background */
  background:          { var: '--background',          light: '#FFFFFF',  dark: '#222325' },
  /** Default text colour */
  foreground:          { var: '--foreground',          light: '#1A1A2E',  dark: '#FFFFFF' },

  /** Card/panel surface — warm off-white in light, elevated dark in dark */
  card:                { var: '--card',                light: '#FAFAF8',  dark: '#2a2c2e' },
  cardForeground:      { var: '--card-foreground',     light: '#1A1A2E',  dark: '#FFFFFF' },

  /** Popover/dropdown surface */
  popover:             { var: '--popover',             light: '#FFFFFF',  dark: '#232329' },
  popoverForeground:   { var: '--popover-foreground',  light: '#1A1A2E',  dark: '#FFFFFF' },

  /** Brand colour — purple. Used for accent buttons, active states, focus rings. */
  primary:             { var: '--primary',             light: '#7C3AED',  dark: '#7C3AED' },
  primaryForeground:   { var: '--primary-foreground',  light: '#FFFFFF',  dark: '#FFFFFF' },

  /** Secondary surface — tinted backgrounds, secondary badges */
  secondary:           { var: '--secondary',           light: '#EDE9FE',  dark: '#2A2A35' },
  secondaryForeground: { var: '--secondary-foreground',light: '#7C3AED',  dark: '#FFFFFF' },

  /** Subdued surface — disabled wells, table stripes */
  muted:               { var: '--muted',               light: '#ECECEC',  dark: '#2a2c2e' },
  mutedForeground:     { var: '--muted-foreground',    light: '#6B7280',  dark: '#9CA3AF' },

  /** Accent highlight — orange, used sparingly */
  accent:              { var: '--accent',              light: '#F97316',  dark: '#F97316' },
  accentForeground:    { var: '--accent-foreground',   light: '#FFFFFF',  dark: '#FFFFFF' },

  /** Danger / error colour */
  destructive:         { var: '--destructive',         light: '#EF4444',  dark: '#EF4444' },

  /** Default border colour */
  border:              { var: '--border',              light: '#E5E7EB',  dark: '#2E2E36' },
  /** Input border colour */
  input:               { var: '--input',               light: '#E5E7EB',  dark: '#2E2E36' },
  /** Focus ring colour */
  ring:                { var: '--ring',                light: '#7C3AED',  dark: '#7C3AED' },

  /** High-contrast action — black in light, white in dark. For primary CTAs. */
  action:              { var: '--action',              light: '#0A0A0A',  dark: '#FFFFFF' },
  actionForeground:    { var: '--action-foreground',   light: '#FFFFFF',  dark: '#0A0A0A' },
} as const

// ─── Brand ────────────────────────────────────────────────────────────────────

export const brand = {
  navbar:    { var: '--color-brand-navbar',   note: 'Top nav background — deep purple' },
  primary:   { var: '--color-brand-primary',  note: 'Primary brand action colour' },
  accent:    { var: '--color-brand-accent',   note: 'Orange accent — use sparingly' },
  gradient:  { var: '--color-brand-gradient', note: 'Orange→purple gradient for hero elements' },
} as const

// ─── Radius ───────────────────────────────────────────────────────────────────

export const radius = {
  none: { var: '--radius-none', value: '0' },
  sm:   { var: '--radius-sm',   value: '0.25rem',  px: 4,  note: 'Subtle rounding — tags, small chips' },
  md:   { var: '--radius-md',   value: '0.5rem',   px: 8,  note: 'Standard UI rounding — buttons, inputs, chips' },
  lg:   { var: '--radius-lg',   value: '0.75rem',  px: 12, note: 'Container rounding — cards, panels' },
  xl:   { var: '--radius-xl',   value: '1rem',     px: 16, note: 'Large surface rounding — dialogs, modals' },
  full: { var: '--radius-full', value: '9999px',   note: 'Pills, badges, avatars' },
} as const

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadow = {
  sm: { var: '--shadow-sm', note: 'Subtle lift — cards in light mode' },
  md: { var: '--shadow-md', note: 'Moderate elevation — dropdowns, popovers' },
  lg: { var: '--shadow-lg', note: 'High elevation — modals, dialogs' },
  xl: { var: '--shadow-xl', note: 'Maximum elevation — toasts, floating panels' },
} as const

// ─── Motion ───────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    fast:   { var: '--duration-fast',   value: '120ms', note: 'Micro-interactions, icon swaps' },
    normal: { var: '--duration-normal', value: '200ms', note: 'Default — most transitions' },
    slow:   { var: '--duration-slow',   value: '320ms', note: 'Complex layouts, accordions' },
  },
  easing: {
    in:    { var: '--ease-in',     note: 'Elements leaving the screen' },
    out:   { var: '--ease-out',    note: 'Elements entering the screen' },
    inOut: { var: '--ease-in-out', note: 'Elements that stay on screen and move' },
  },
} as const

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  size: {
    xs:   { var: '--font-size-xs',   value: '0.75rem'  },
    sm:   { var: '--font-size-sm',   value: '0.875rem' },
    base: { var: '--font-size-base', value: '1rem'     },
    lg:   { var: '--font-size-lg',   value: '1.125rem' },
    xl:   { var: '--font-size-xl',   value: '1.25rem'  },
    '2xl':{ var: '--font-size-2xl',  value: '1.5rem'   },
    '3xl':{ var: '--font-size-3xl',  value: '1.875rem' },
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
} as const

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  1:  { var: '--space-1',  value: '0.25rem', px: 4  },
  2:  { var: '--space-2',  value: '0.5rem',  px: 8  },
  3:  { var: '--space-3',  value: '0.75rem', px: 12 },
  4:  { var: '--space-4',  value: '1rem',    px: 16 },
  6:  { var: '--space-6',  value: '1.5rem',  px: 24 },
  8:  { var: '--space-8',  value: '2rem',    px: 32 },
  12: { var: '--space-12', value: '3rem',    px: 48 },
  16: { var: '--space-16', value: '4rem',    px: 64 },
} as const

// ─── Z-index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  base:     { var: '--z-0',         value: 0    },
  raised:   { var: '--z-10',        value: 10   },
  dropdown: { var: '--z-dropdown',  value: 1000 },
  sticky:   { var: '--z-sticky',    value: 1100 },
  overlay:  { var: '--z-overlay',   value: 1200 },
  modal:    { var: '--z-modal',     value: 1300 },
  toast:    { var: '--z-toast',     value: 1400 },
} as const
