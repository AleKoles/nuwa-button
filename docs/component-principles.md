---
title: Component Principles
description: When and how to use this design system's components in Nuwacom product surfaces. Bridges the abstract component library with real product context.
---

# Component Principles

> **Library status:** The component library is being built from scratch. Components referenced here that don't yet exist in `src/components/ui/` are marked **(planned)**. When implementing, create them according to the patterns described here and the conventions in `CLAUDE.md`.

---

## Decision Framework

Before reaching for a component, answer:
1. **Who is this for?** Admin (configuring policy) or Writer (doing work)? See `personas.md`.
2. **How often will they do it?** Daily task vs. occasional configuration.
3. **What are the consequences of a mistake?** Reversible vs. destructive.

---

## Navigation & Structure

### Tabs vs NavigationMenu
- **Tabs:** Peer-level content within the same context (Document / History / Comments within a document). Tab switching does not navigate away or change the URL.
- **NavigationMenu:** Top-level workspace navigation (Documents, Agents, Knowledge Base, Settings). Navigates to a new route.
- Never use Tabs for actions that change route — the back button must not break.

### Sheet (side panel) vs a new route
- **Sheet:** Contextual configuration that references the current view. The user returns to exactly where they were.
- **New route:** Primary surfaces users may deep-link to (Agent config page, Knowledge base management).
- Never open a Sheet from within another Sheet.

### Breadcrumbs
Always reflect the full workspace hierarchy. Minimum: `Workspace > Project > Document`. Clickable at every level.

---

## Actions & Buttons

### Primary / Secondary / Destructive hierarchy
Every page should have at most **one primary action**. If two feel equally important, reconsider the information architecture.

| Variant | When to use |
|---|---|
| `variant="action"` | The single most important action — renders black in light mode, white in dark mode |
| `variant="primary"` | Brand purple — feature actions, active states, upgrades |
| `variant="outline"` | Secondary action alongside action/primary, lower visual weight |
| `variant="soft"` | Tertiary brand-tinted surface — filters, chips, contextual actions |
| `variant="ghost"` | Toolbar and sidebar icon-adjacent actions only |
| `variant="destructive"` | Permanent deletion, irreversible actions only |
| `variant="link"` | Inline navigation within prose or descriptions |

**Never use `destructive` for warnings** — only for actions that permanently delete or remove data.

### Icon buttons
Icon-only buttons require `aria-label`. Pair with a `Tooltip` on hover. Exception: icons immediately adjacent to a visible text label.

### Async loading state
Keep the button visible and disabled with a spinner inside. Never hide or swap the button while an action is in progress.

---

## Forms & Inputs

### Label placement
`Label` above the input, always. Placeholder text is allowed as an example value but never as the only label.

### Field validation
- Errors below the field, not in a top-of-form summary
- Validate on blur, not on keystroke
- Server errors at field level after submit, not just in a Toast

### Select vs RadioGroup vs SegmentedControl *(SegmentedControl — planned)*
- **Select:** 5+ options, or options that grow dynamically
- **RadioGroup:** 3–5 options where all choices should be visible
- **SegmentedControl:** 2–4 peer options representing modes or views (not list values)

### Textarea for AI input
Any Textarea used for prompts or agent instructions must:
- Show a character/token count if there is a limit
- Label the submit shortcut (`Cmd+Enter` / `Ctrl+Enter`)
- Have a clear multi-line affordance (resize handle or auto-grow)

---

## Feedback & Status

### Toast vs inline vs Alert
- **Toast:** Transient confirmation of a completed background action. Disappears after 4–5s. Not for errors that require action.
- **Inline:** Validation errors, field-level warnings. Stays until resolved.
- **Alert:** Page-level information requiring attention before proceeding.

Never put an error that requires user action in a Toast — it will disappear before they can act on it.

### Badge vs StatusDot *(StatusDot — planned)*
- **Badge:** Static categorical label. Document status, content type tag. Does not change during the session without user action.
- **StatusDot:** Live state indicator for things that change in real time (agent running, sync in progress). Animates when active; requires a paired text label for screen readers.

---

## Data Display

### Table vs card grid
- **Table:** Comparison across consistent attributes is the primary task (knowledge base document list: name, size, date, status)
- **Card grid:** Items have different levels of detail, or visual hierarchy within each item matters more than cross-item comparison (template library, agent library)

### Empty states
Every Table and list needs an explicit empty state — not a blank space. See `domain-patterns.md` for copy patterns.

### Pagination vs infinite scroll
- **Pagination:** Audit trails, document history, anything requiring return-to-position
- **Infinite scroll:** Activity feeds, notification streams
- Default to pagination for enterprise data tables — compliance users navigate to specific records

---

## Dialogs & Confirmations

### AlertDialog vs Dialog
- **AlertDialog:** Destructive or irreversible actions. Default focus on Cancel, not the destructive action.
- **Dialog:** Non-destructive confirmations, quick forms, preview states.

### Modal content limits
No navigation, no forms with more than ~5 fields, no context-switching inside a modal. Complex flows go to a Sheet or dedicated route.

---

## AI-Specific Components

### Generation panels
AI generation input areas must:
1. Show the active brand voice profile name before generation
2. Show the knowledge base scope (if applicable)
3. Begin displaying output at the first token — no skeleton
4. Provide inline "Regenerate" — user should not need to clear the field and resubmit

### Source references *(SourceBlock component — planned)*
When AI output cites knowledge base content, render each source inline with a link, source title, and ingestion date. Never use footnote numbers without visible source information adjacent to the citation.

**Naming note:** The concept is called "Source" in UI copy (see `terminology.md`). The component will be named `SourceBlock` in code to avoid collision with the native HTML `<source>` element.

### AI provenance in documents *(planned)*
Sections of a document that are AI-generated and unreviewed carry a subtle indicator. Once a human edits or explicitly approves the section, the indicator clears. The signal is visible but not alarming — it is informational, not a warning.
