---
title: Accessibility Standards
description: Nuwacom-specific a11y decisions and requirements. Standard WCAG guidance is not reproduced here — consult https://www.w3.org/WAI/WCAG21/quickref/ for the baseline. This file covers only what is specific to Nuwacom.
---

# Accessibility Standards

## Baseline & Why

**WCAG 2.1 Level AA** is the minimum for all surfaces.

**WCAG 2.1 Level AAA** for body text, form labels, error messages, and AI-generated content areas.

**Why AAA matters here:** Several public sector and financial services customers in the EU require WCAG 2.1 AA for procurement. AAA text contrast costs nothing in our token system — we use dark neutrals on light backgrounds and the reverse. Targeting AAA for text removes a class of edge cases entirely and gives us headroom when token values drift.

---

## Token-Level Contrast Commitments

These are design system constraints, not just runtime checks:

| Token pair | Target |
|---|---|
| `--foreground` on `--background` | AAA (7:1+) — always |
| `--muted-foreground` on `--background` | AA minimum — check when modifying muted values |
| `--primary-foreground` on `--primary` | AA minimum — verify when adding primary hue variants |
| Disabled states | Intentionally below minimum — WCAG exempts disabled controls |

**Rule:** When modifying a token value in `src/tokens/index.css`, check the contrast ratio of every pair that uses it before committing. Do not rely on visual inspection.

---

## Dark Mode Contrast

Both modes must pass independently. The `.dark` token overrides can produce contrast failures that don't appear in light mode. Every new component must be verified in both modes using the Storybook accessibility addon.

---

## AI Output — Nuwacom-Specific Requirements

This is the area most likely to produce novel a11y issues because AI streaming is not a standard web pattern.

### Streaming regions
- Use `aria-live="polite"` on AI output regions — **not `assertive`**. Assertive interrupts whatever the screen reader is currently announcing, which is almost always wrong for a background generation task.
- **Debounce `aria-live` announcements.** Never put `aria-live` on an element that updates multiple times per second. During streaming, the region updates with every token. Debounce to announce chunks, not characters.
- Announce completion: when streaming ends, emit a brief status update ("Response complete") so screen reader users know the output is finished.

### Source references
- Source links require descriptive `aria-label`: `aria-label="View source: [Document Title]"` — not just "View source."
- Sources must be keyboard-reachable without hover — no tooltip-only source reveals.

### Status indicators
- `StatusDot` (planned, animated) must never be the only signal of a state change. Pair with a visible text label or `aria-label`.
- Agent running state: `aria-label="Agent running"` on the indicator, `aria-live` on the output region.
- AI refusal state: neutral informational markup, not `role="alert"` — a safety refusal is not an error.

---

## Focus Ring

Focus ring uses `--ring` which maps to `--primary` (brand purple). **Do not override this on individual components.** The ring must be visible in both light and dark modes — this is already handled by the token's `.dark` override.

Never `outline: none` without an equivalent `:focus-visible` replacement.

---

## Icon-Only Interactive Elements

Icon-only buttons require `aria-label`. This is not optional and is stricter here than general WCAG guidance because:
1. Nuwacom has a multilingual European user base — icon metaphors that feel universal are not.
2. Our own test automation targets `aria-label` values.

Exception: an icon immediately adjacent to a visible text label that describes it.

---

## Testing Checklist

Before shipping any new component or significant surface:

1. Tab through all interactive elements — reachable, correct order
2. Activate all actions with keyboard only
3. Verify Storybook accessibility addon shows no violations in the States story
4. Check both light and dark mode
5. Confirm no `aria-live` on elements that update at token-streaming frequency

Screen reader testing for significant new surfaces: VoiceOver + Safari (macOS), NVDA + Firefox (most common Windows enterprise combination).
