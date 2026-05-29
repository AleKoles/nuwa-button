---
title: Domain Patterns
description: UX patterns that recur across Nuwacom because of the nature of the product — enterprise AI workspace for content, agents, and knowledge. Reference before designing a new surface.
---

# Domain Patterns

## The Buyer/User Split

Nuwacom is purchased by managers and heads of content/marketing/comms. It is used daily by writers, editors, and knowledge workers. These are almost never the same person.

This split shapes every major UI decision:

- **Onboarding is dual-track.** Admins configure brand voice, knowledge bases, and model settings. Regular users configure personal preferences. Merging these into one onboarding creates cognitive overload for users and incomplete setup for admins.
- **The dashboard serves different goals.** For managers: team output, usage, compliance. For users: recent work, quick-start actions, saved templates. Never design a single dashboard that tries to serve both.
- **Permission states must be informative, not silent.** When a user hits a feature they don't have access to, say who controls it and how to request it. "Contact your admin" with a copy-to-clipboard admin email is better than a locked icon.
- **Pricing/usage surfaces are admin-only.** Regular users should never see billing, seat counts, or token usage totals — this creates anxiety about "using too much" and suppresses the adoption you're trying to drive.

---

## Workspace vs. Document

Nuwacom is a workspace that contains documents, not a document editor with a sidebar. This distinction matters for navigation and context:

- **Persistent left rail** for workspace-level navigation (projects, agents, templates, knowledge bases). Always visible, never collapsed on initial load.
- **Document chrome** is minimal. When editing, the surrounding UI should recede. No competing toolbars.
- **Context panels** (brand voice settings, agent configuration, source references) slide in from the right. They are overlays on the workspace, not full navigation changes.
- **Breadcrumbs** always reflect the workspace hierarchy: Workspace → Project → Document. Never just show the current document name.

---

## Brand Voice as Infrastructure

Brand voice is not just a settings panel — it is referenced throughout every content generation surface.

- **Show the active brand voice profile** wherever AI output is generated. Users need to know which ruleset is being applied before they generate, not after.
- **"Generate with [Voice Name]" not "Generate."** Make the voice explicit in CTAs where multiple profiles exist.
- **Voice deviation indicators.** When AI output conflicts with brand rules (banned words, tone flags), surface this at sentence level — not as a post-generation review gate.
- **Voice profiles are workspace-level, not user-level.** Users cannot modify brand voice. They can apply it, preview it, or flag a conflict. Only admins can change it.

---

## Agent Patterns

Agents in Nuwacom are persistent, named, and configurable — not ephemeral chat sessions.

- **Agents have identities.** They have names, descriptions, and configured tool sets. Treat them as team members in the UI, not as modes of a chat interface.
- **Distinguish agent status clearly:** idle / running / paused / error. Running states need progressive feedback (which step, estimated completion). Error states need actionable recovery — not just a red icon.
- **Agent output is reviewable, not final.** Always insert a review step before agent output enters a published document or triggers an external action. Trust is built incrementally.
- **Agent configuration surfaces are for admins.** In-product agent editing (tools, model, instructions) is admin-only. Users invoke agents; they don't configure them.
- **Show what an agent will do before it runs.** A brief "plan" step (even just a 2-line summary) before long-running agent tasks dramatically reduces abandonment.

---

## Knowledge Base Patterns

- **Surfacing sources is mandatory.** Any AI output that draws on a knowledge base must link to the source document(s). No exceptions. This is a trust-building requirement, not a nice-to-have.
- **Knowledge base scope is explicit.** Users should know whether an AI query is searching "your project", "your workspace", or "your entire knowledge base." Scope selector before query, not buried in settings.
- **Freshness indicators.** Knowledge bases have document ingestion dates. When output references a document last updated 18 months ago, that date must be visible.
- **Missing knowledge is actionable.** "I couldn't find information about X" should always include "Add a document about X to your knowledge base" as a follow-up action.

---

## Progressive Disclosure in Complex Configs

Enterprise configuration surfaces (model selection, agent instructions, brand rule editors) are rich but infrequently used.

- **Default → Advanced pattern.** Show the 3 most important settings by default. Put everything else behind an "Advanced" disclosure.
- **Show current values, not just controls.** At-a-glance config summaries (e.g., "Using GPT-5.4 · Tone: Professional · Output: 300–500 words") let users verify state without opening every panel.
- **Change confirmation on destructive config changes.** Changing the active language model or wiping a knowledge base should require a confirmation step with a plain-language description of what changes.

---

## Collaboration Patterns

- **Commenting on AI output is different from commenting on human writing.** AI output comments often flag generation errors or voice drift — not style preferences. The comment UI should support a "flag for regeneration" action alongside free-form comment.
- **"Approved by" state on reviewed AI output.** Once a human reviews and approves AI-generated content, it should carry an approval indicator with the reviewer's name. This matters for compliance workflows.
- **Async by default.** Nuwacom users are typically not in the same timezone. Real-time presence indicators are nice but not the primary collaboration model. Well-designed async workflows (clear status, notification triggers, handoff states) matter more.

---

## Empty States

Empty states in Nuwacom are onboarding moments — this is an enterprise product where every empty state represents a configuration gap or an adoption opportunity.

- **Empty project:** → "Create your first document" + "Set up brand voice" (if not configured)
- **Empty knowledge base:** → "Add your first document" with supported file type list
- **Empty agent output:** → Never show a blank panel. Show the agent's configured description + a "Run agent" CTA.
- **No results in search:** → Distinguish between "no match in this scope" and "knowledge base is empty." Suggest expanding scope or adding content respectively.
