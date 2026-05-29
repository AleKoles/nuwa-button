---
title: Product Context
description: What Nuwacom is not, its technical constraints, and the success signals that should inform design decisions. For who uses it and what it does, see personas.md and domain-patterns.md.
---

# Product Context

## What Nuwacom Is

An **enterprise AI workspace** for teams that produce content at scale — brand governance, knowledge-grounded generation, agent workflows, and the compliance controls that enterprise IT requires. European-first, GDPR-native, model-agnostic.

For the full picture: product areas are in `domain-patterns.md`, personas in `personas.md`, market position in `competitors.md`.

---

## What Nuwacom Is Not

These boundaries matter for design. Features that belong to these categories are out of scope and should not be designed for without explicit product direction.

- **Not a writing assistant for individuals.** It is team infrastructure. Personal productivity features exist but they serve the team use case.
- **Not a general-purpose chat interface.** There is no "just ask anything" mode. All AI interactions are contextual and workspace-aware.
- **Not a CMS.** Nuwacom produces content; it does not publish or distribute it. CMS/DAM integration is an export/API concern.
- **Not an analytics platform.** Usage reporting exists for admins; it is not a primary product surface.

---

## Technical Constraints That Affect UI

These are not engineering concerns — they produce real design requirements.

- **Multi-region deployment.** EU data residency is a product feature. UI must surface data location in admin settings and data import flows where it matters to compliance users.
- **Model-agnostic.** Provider-specific model names (GPT, Claude, Gemini) are never shown to Writers. Admins see model selection; end-user UI uses abstracted labels or nothing.
- **SSO-only enterprise accounts.** Many accounts have password login disabled entirely. Auth flows must never break when password auth is unavailable for a workspace.
- **Large document ingestion.** Knowledge base import handles PDFs, Word docs, Confluence exports across hundreds of pages. Progress states and failure recovery are required — not optional. "Uploading" is not enough feedback.
- **Streaming AI output.** Token-by-token streaming means the UI must handle progressive content growth without layout jank and without CLS when streaming completes.

---

## Design Proxy Metrics

These signal whether design decisions are working. Not tracking targets — signals:

- **Time to first AI output < 30s** from opening the editor — measures generation flow friction
- **Edit-to-publish ratio** — less editing after generation = brand voice and KB grounding are working
- **Agent invocations per user per week** — measures whether agents are discoverable and trusted
- **KB citation rate** — % of AI outputs citing a source — measures grounding quality
- **Admin-to-user ratio in config surfaces** — admins should configure once; if they're constantly in settings fixing user problems, the permission or onboarding model is wrong
