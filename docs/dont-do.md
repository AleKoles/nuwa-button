---
title: Don't Do — Component Anti-Patterns
description: Things that look reasonable but consistently produce wrong results for Nuwacom UI. Nuwacom-specific rules lead — the counterintuitive ones. Generic hygiene is at the bottom.
---

# Don't Do

## AI-Specific UI — Nuwacom-specific

- **Don't use red error states for AI refusals.** A safety refusal is not a system error. Use a neutral informational state, not `--destructive`. Red trains users to treat every refusal as a fault in the system.
- **Don't use skeleton loaders for streaming AI responses.** Streaming is progressive reveal, not loading. Show the first token immediately — hiding output behind a skeleton breaks the perception benefit of streaming entirely.
- **Don't use italics for AI-generated content indicators.** Italics signal foreign language or quotation. Use a dedicated chip or status treatment for AI provenance.
- **Don't label AI suggestions as "smart" or "intelligent."** Describe what it does: "Suggested reply" not "Smart reply." See `voice.md`.
- **Don't render AI output as raw text.** Never interpolate LLM output as `{text}` in a plain element. It produces escaped markdown, broken tables, and unformatted code. All AI output goes through the designated renderer.

---

## Color & Tokens — Nuwacom-specific

- **Don't use purple for primary action buttons.** The primary action button uses `--color-neutral-950` (black) in light mode, not `--primary` purple. Purple signals selection and active states. See `visual-language.md`.
- **Don't use shadows for depth.** Nuwacom's depth model is tonal — background color differences create elevation. No `box-shadow` in components. See `visual-language.md`.
- **Don't use semantic color tokens for decorative purposes.** `--destructive` means destructive. `--accent` is orange — it is not a general highlight color. Using status tokens decoratively trains users to ignore the signals they carry.
- **Don't use opacity variants of semantic tokens to create new meanings.** `text-primary/50` reads as disabled, not subtle. If you need a new visual role, add a token to `src/tokens/index.css`.
- **Don't add dark/light conditionals inside component files.** All dark mode is handled via `.dark` on `<html>`. Every token already has a `.dark` override in the tokens file.

---

## Components

- **Don't use `Button variant="ghost"` as a navigation item.** Ghost buttons are actions. Navigation items are a separate component concern — they are not buttons with reduced styling.
- **Don't use `Badge` to communicate status that changes in real time.** Badges are static categorical labels. Live status (agent running, sync in progress) needs an animated indicator, not a badge.
- **Don't put long-form text inside `Tooltip`.** If the content needs more than one sentence, use a `Popover` or inline helper text. Tooltips are ephemeral and not discoverable on mobile/touch.
- **Don't use `Select` for fewer than 3 options.** `RadioGroup` or a segmented control shows all choices without requiring a click — always better when the count is small and fixed.
- **Don't use `Textarea` without a character count when there's a limit.** Users writing prompts or brand briefs need to know their budget before they hit the wall.

---

## Layout

- **Don't use full-bleed hero sections in workspace surfaces.** Nuwacom is a tool, not a marketing page. Hero layouts create false prominence hierarchies inside the app and import the wrong visual register.
- **Don't stack modals.** One modal at a time. Complex flows go multi-step within one modal, or to a dedicated route.
- **Don't use `position: fixed` toolbars inside scrollable panel areas.** Fixed positioning breaks inside CSS transform contexts; the three-panel layout uses transforms for panel animation.

---

## General hygiene

These apply broadly to any well-built UI — listed here as a reminder, not Nuwacom-specific:

- Don't use placeholder text as a label substitute — it disappears on input.
- Don't disable a form submit button during async field validation — show errors inline at the field instead.
- Don't use carousels or horizontal scroll for primary navigation — content discovery must be deterministic.
- Don't put more than 2 type sizes in a single card — a third size creates noise, not hierarchy.
- Don't use `font-weight: 400` for interactive labels at small sizes — it reads as disabled on enterprise displays.
