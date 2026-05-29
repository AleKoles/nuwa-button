# CRAFT.md — UI Quality Standards

Concise rules for building accessible, fast, delightful components in this design system.
MUST/SHOULD/NEVER signal priority. These rules apply to component authors and consumers alike.

> **Radix note**: Keyboard navigation, focus management, ARIA roles, and modal behavior are
> handled by Radix UI primitives. The rules below apply to custom components and any pattern
> that extends or wraps Radix.

---

## Interactions

### Keyboard

- MUST: Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)
- MUST: Visible focus rings (`:focus-visible`; group with `:focus-within`)
- MUST: Manage focus (trap, move, return) per APG patterns
- NEVER: `outline: none` without a visible focus replacement

### Targets & Input

- MUST: Hit target ≥24px (mobile ≥44px); expand hit area if the visual is smaller
- MUST: Mobile `<input>` font-size ≥16px to prevent iOS zoom
- NEVER: Disable browser zoom (`user-scalable=no`, `maximum-scale=1`)
- MUST: `touch-action: manipulation` to prevent double-tap zoom delay
- SHOULD: Set `-webkit-tap-highlight-color` to match design

### Forms

- NEVER: Block paste in `<input>`/`<textarea>`
- MUST: Loading buttons show spinner and keep their original label
- MUST: Enter submits focused input; in `<textarea>`, ⌘/Ctrl+Enter submits
- MUST: Keep submit enabled until request starts; then disable with spinner
- MUST: Accept free text, validate after — don't block typing
- MUST: Allow incomplete form submission to surface validation errors
- MUST: Errors inline next to fields; on submit, focus first error
- MUST: `autocomplete` + meaningful `name`; correct `type` and `inputmode`
- SHOULD: Disable spellcheck for emails, codes, and usernames
- SHOULD: Placeholders end with `…` and show an example pattern
- MUST: Warn on unsaved changes before navigation
- MUST: Compatible with password managers & 2FA; allow pasting codes
- MUST: Trim values to handle trailing spaces from text expansion
- MUST: No dead zones on checkboxes/radios — label and control share one hit target

### State & Navigation

- MUST: URL reflects state (deep-link filters, tabs, pagination, expanded panels)
- MUST: Back/Forward restores scroll position
- MUST: Links use `<a>` for navigation (support Cmd/Ctrl/middle-click)
- NEVER: Use `<div onClick>` for navigation

### Feedback

- SHOULD: Optimistic UI; reconcile on response; on failure rollback or offer Undo
- MUST: Confirm destructive actions or provide an Undo window
- MUST: Use polite `aria-live` for toasts and inline validation
- SHOULD: Ellipsis (`…`) for options opening follow-ups ("Rename…") and loading states ("Loading…")

### Touch & Drag

- MUST: Generous targets, clear affordances; avoid finicky interactions
- MUST: Delay first tooltip; subsequent peers instant
- MUST: `overscroll-behavior: contain` in modals and drawers
- MUST: During drag, disable text selection and set `inert` on dragged elements
- MUST: If it looks clickable, it must be clickable

### Autofocus

- SHOULD: Autofocus on desktop with a single primary input; rarely on mobile

---

## Animation

- MUST: Honor `prefers-reduced-motion` (provide a reduced variant or disable entirely)
- SHOULD: Prefer CSS > Web Animations API > JS libraries
- MUST: Animate compositor-friendly props (`transform`, `opacity`) only
- NEVER: Animate layout props (`top`, `left`, `width`, `height`)
- NEVER: `transition: all` — list properties explicitly
- SHOULD: Animate only to clarify cause/effect or add deliberate delight
- SHOULD: Choose easing to match the change (size/distance/trigger)
- MUST: Animations must be interruptible and input-driven (no forced autoplay)
- MUST: Correct `transform-origin` (motion starts where it "physically" should)
- MUST: SVG transforms on `<g>` wrapper with `transform-box: fill-box`

---

## Layout

- SHOULD: Optical alignment; adjust ±1px when perception beats geometry
- MUST: Deliberate alignment to grid/baseline/edges — no accidental placement
- SHOULD: Balance icon/text lockups (weight/size/spacing/color)
- MUST: Verify mobile, laptop, and ultra-wide (simulate ultra-wide at 50% zoom)
- MUST: Respect safe areas (`env(safe-area-inset-*)`)
- MUST: Avoid unwanted scrollbars; fix overflows
- SHOULD: Flex/grid over JS measurement for layout

---

## Content & Accessibility

- SHOULD: Inline help first; tooltips as last resort
- MUST: Skeletons mirror final content to avoid layout shift
- MUST: No dead ends; always offer a next step or recovery path
- MUST: Design empty/sparse/dense/error states for every component
- SHOULD: Curly quotes (" "); avoid widows/orphans (`text-wrap: balance`)
- MUST: `font-variant-numeric: tabular-nums` for number comparisons
- MUST: Redundant status cues (not color-only); icons have text labels
- MUST: Accessible names exist even when visuals omit labels
- MUST: Use `…` character (not `...`)
- MUST: `scroll-margin-top` on headings; "Skip to content" link; hierarchical `<h1>`–`<h6>`
- MUST: Resilient to user-generated content (short/avg/very long)
- MUST: Locale-aware dates/times/numbers (`Intl.DateTimeFormat`, `Intl.NumberFormat`)
- SHOULD: `translate="no"` on brand names, code tokens, and identifiers
- MUST: Accurate `aria-label`; decorative elements `aria-hidden`
- MUST: Icon-only buttons have a descriptive `aria-label`
- MUST: Prefer native semantics (`button`, `a`, `label`, `table`) before ARIA
- MUST: Non-breaking spaces: `10&nbsp;MB`, `⌘&nbsp;K`, brand names

---

## Content Handling

- MUST: Text containers handle long content (`truncate`, `line-clamp-*`, `break-words`)
- MUST: Flex children need `min-w-0` to allow truncation
- MUST: Handle empty states — no broken UI for empty strings or arrays

---

## Performance

- SHOULD: Test on iOS Low Power Mode and macOS Safari
- MUST: Track and minimize re-renders (React DevTools / React Scan)
- MUST: Profile with CPU/network throttling
- MUST: Batch layout reads/writes; avoid reflows/repaints
- MUST: Mutations (`POST`/`PATCH`/`DELETE`) target <500ms
- SHOULD: Prefer uncontrolled inputs; controlled inputs cheap per keystroke
- MUST: Virtualize large lists (>50 items)
- MUST: Preload above-fold images; lazy-load the rest
- MUST: Prevent CLS (explicit image dimensions)

---

## Dark Mode & Theming

- MUST: Dark mode is applied via `.dark` class on `<html>` — toggled by the Storybook toolbar
- MUST: Every semantic token must have a `.dark` override in `src/tokens/index.css`
- MUST: `html.dark { color-scheme: dark }` for correct browser chrome styling
- MUST: Native `<select>`: explicit `background-color` and `color` (Windows fix)
- SHOULD: Keep hue consistency — tint borders/shadows/text toward the background hue

---

## Design

- SHOULD: Layered shadows (ambient + direct)
- SHOULD: Crisp edges via semi-transparent borders + shadows
- SHOULD: Nested radii: child radius ≤ parent radius; concentric
- MUST: Accessible charts — color-blind-friendly palettes
- MUST: Meet contrast — prefer [APCA](https://apcacontrast.com/) over WCAG 2
- MUST: Increase contrast on `:hover`/`:active`/`:focus`
- SHOULD: Avoid dark gradient banding — use a background image when needed
