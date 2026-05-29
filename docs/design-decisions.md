---
title: Design Decisions
description: Settled choices and their rationale. Before proposing an alternative, read the entry — the reason usually explains the constraint.
---

# Design Decisions

Format: **Decision → Rationale → What we considered and rejected**

---

## Tokens

### Semantic tokens only in components, never primitives
Primitive tokens (`--color-purple-600`) are never used directly in components. All component styling goes through semantic tokens (`--primary`, `--muted-foreground`).

**Why:** Enterprise customers need white-label theming. When a customer wants to replace our purple with their navy, they change one semantic token layer. If components reference primitives directly, every customer skin requires touching every component.

**Rejected:** Letting "obviously safe" primitives through case by case — this creates gradual drift and breaks the contract.

---

### Three-tier token architecture
`primitive → semantic → utility class`. Components only see the third tier (Tailwind classes like `bg-primary`).

**Why:** Keeps components framework-portable and prevents components from becoming implicit documentation of the token system.

---

## Dark Mode

### `.dark` class on `<html>`, not `prefers-color-scheme` media query
Dark mode is toggled by adding `.dark` to the `<html>` element. The `prefers-color-scheme` media query is not used as the primary mechanism inside the app.

**Why:** Enterprise workspaces are deployed in contexts where OS theme ≠ user preference. Finance teams on Windows with system-dark will want the workspace in light. Users need explicit control. The OS media query can still influence the _default_ — but once a user has a saved preference, the `.dark` class wins.

---

## Component Behavior

### CVA for all variant logic, no conditional class branching
All variant logic lives in CVA variant maps. We do not branch on props inside `className` strings or use ternary operators to pick class names.

**Why:** CVA variant maps are machine-readable. `src/registry.ts` pulls variant information from components to generate the catalogue. Manual branching breaks that introspection.

---

### `data-slot`, `data-variant`, `data-size` on every root element
Every component root element carries these data attributes, even when they feel redundant.

**Why:** Storybook's MCP addon and external testing tooling query these attributes to identify and target components without relying on class names (which can change) or component internals.

---

### No `forwardRef` — React 19 ref-as-prop
We do not use `React.forwardRef`. `ref` is passed as a plain prop.

**Why:** React 19 made this the default. Using `forwardRef` in new code creates a misleading signal that older patterns are still required here.

---

## AI Output Rendering

### AI output always through a dedicated renderer, never raw string interpolation
AI-generated text is never rendered as `{text}` or inside a plain `<p>` tag. It always goes through the designated renderer.

**Why:** Markdown, code blocks, and structured output from LLMs require consistent rendering. Raw interpolation produces escaped asterisks, broken tables, and unformatted code. Centralising rendering means we can upgrade formatting logic once without touching every call site.

---

### Streaming: show first token immediately, no skeleton
When an AI response is streaming, we begin displaying content as soon as the first token arrives. We do not hold output behind a loading skeleton.

**Why:** The latency perception research for our target users (knowledge workers writing long-form content) shows that seeing _something_ appear within ~300ms dramatically reduces perceived wait time, even if the full response takes 5–10 seconds.

---

## Accessibility

### WCAG 2.1 AA as the baseline, AAA for text contrast where possible
We target AA compliance as the minimum. For body text and interactive labels, we target AAA contrast ratios.

**Why:** GDPR-adjacent compliance requirements in the European enterprise market include accessibility obligations. Several prospective customers in the public sector require WCAG 2.1 AA at minimum for procurement. AAA text contrast costs nothing in our design language (we use dark neutrals on light, and the reverse) and removes a class of edge cases entirely.

---

### No `aria-label` on elements that already have visible text
If an element has visible text content, we do not add a redundant `aria-label` that says the same thing.

**Why:** Duplicate labels cause screen readers to announce content twice. The pattern of adding `aria-label` "for clarity" on visible-text elements is cargo-culted from icon-only button patterns and is incorrect when applied to text-bearing elements.

---

## Iconography

### Icons require a visible label or `aria-label` — never decorative-only in interactive elements
Interactive elements (buttons, links) that use an icon must have either a visible text label or an explicit `aria-label`. We do not ship icon-only interactive elements without an accessible name.

**Why:** Nuwacom has a non-native-English European user base. Icon metaphors that feel universal to a US product team are frequently ambiguous across cultures. Accessible names also improve our own test automation.

---

## Forms

### Client-side validation on blur, server errors on submit
We validate individual fields on blur (when the user leaves the field). We show server-side errors after submit, inline at the field level.

**Why:** Validating on keystroke is aggressive and breaks for paste operations. Validating only on submit means users don't find out about multiple errors until after they've filled the entire form. Blur validation is the established middle ground.
