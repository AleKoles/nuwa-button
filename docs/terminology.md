---
title: Terminology & Glossary
description: The words Nuwacom uses for its concepts, and what they mean. Consistent naming across UI, docs, and codebase prevents the "is this the same thing?" confusion that plagues growing products.
---

# Terminology & Glossary

## Core Concepts

### Workspace
The top-level organisational unit in Nuwacom. A workspace contains projects, agents, knowledge bases, and brand voice profiles. It maps to a company or a distinct business unit. Users belong to one or more workspaces.

- **Use in UI:** "Your workspace", "Workspace settings"
- **Don't use:** "Organisation", "Account", "Team" (too ambiguous), "Environment"

---

### Project
A container within a workspace that groups related documents and optionally scopes knowledge bases and agent access.

- **Use in UI:** "New project", "Project settings"
- **Don't use:** "Folder", "Campaign" (too specific), "Space" (Notion/Confluence collision)

---

### Document
A piece of long-form content created and edited inside Nuwacom. Has a lifecycle (draft → in review → approved → archived).

- **Use in UI:** "New document", "Open document", "Document history"
- **Don't use:** "File" (implies something on disk), "Page" (Notion collision), "Asset" (too generic)

---

### Brand Voice
The admin-configured ruleset that governs tone, terminology, and style for AI generation within a workspace. Not a user preference — a workspace-level policy.

- **Use in UI:** "Brand voice", "Brand voice profile", "Active brand voice"
- **Don't use:** "Style guide" (implies the full document, not the configured ruleset), "Tone settings", "Writing style"

---

### Knowledge Base
A collection of ingested documents (PDFs, Word docs, web pages, etc.) that ground AI generation in workspace-specific information. AI output that draws from a knowledge base must cite sources.

- **Use in UI:** "Knowledge base", "Add to knowledge base", "Knowledge base sources"
- **Don't use:** "Library", "Docs", "Repository" (engineering collision), "Database" (too technical for end users)

---

### Agent
A named, configured AI process with a defined purpose, instruction set, and optional tool access. Agents are persistent and admin-configured. Users invoke them; admins build them.

- **Use in UI:** "Agent", "Run agent", "Agent library"
- **Don't use:** "Bot", "Assistant" (too generic — conflicts with the general AI assistant concept), "Workflow" (reserved for approval/review flows)

---

### Brand Voice Score
A numeric or categorical indicator of how closely an AI-generated output conforms to the active brand voice profile.

- **Use in UI:** "Brand voice score", "Voice match"
- **Don't use:** "Compliance score" (compliance means regulatory compliance elsewhere), "Quality score" (brand voice is not the only dimension of quality)

---

### Approval Workflow
The process by which AI-generated content is reviewed and signed off by a designated person before it is marked as approved.

- **Use in UI:** "Send for review", "Approval workflow", "Approved by [Name]"
- **Don't use:** "Publishing workflow" (Nuwacom doesn't publish), "Sign-off" (informal), "Compliance workflow" (too narrow)

---

### Model
The underlying AI language model used for generation. Admins configure model selection; users don't see provider-specific names.

- **Use in admin UI:** "Language model", "Model settings", specific model name when selecting
- **Use in end-user UI:** Nothing, or "AI generation" — don't surface model identity to regular users
- **Don't use:** "AI engine", "Brain", "LLM" in user-facing contexts

---

### Ingestion
The process of importing a document into the knowledge base (extracting, chunking, indexing).

- **Use in admin/technical UI:** "Ingesting", "Ingestion status"
- **Use in end-user UI:** "Adding to knowledge base", "Processing" — avoid the technical term in user-facing flows
- **Don't use:** "Training" (this implies fine-tuning, which is different and misleading), "Uploading" (upload is a step, not the full process)

---

### Source
A specific document or URL in the knowledge base that was referenced to produce an AI output. Always linked.

- **Use in UI:** "Sources", "Based on [Source Title]", "View source"
- **Don't use:** "Reference", "Context" (too vague)
- **Note on "Citation":** Don't use "citation" in UI copy — it reads as academic. The component that renders a source reference in the UI is named `SourceBlock` in code, which avoids this collision.

---

## States & Status Labels

| Concept | Label in UI | Don't Use |
|---|---|---|
| Content not yet reviewed | "Draft" | "Pending", "Unsaved" |
| Content sent for review | "In review" | "Awaiting approval", "Submitted" |
| Content reviewed and signed off | "Approved" | "Published", "Final", "Done" |
| Content retired | "Archived" | "Deleted", "Deprecated" |
| Agent currently running | "Running" | "Processing", "Thinking", "Working" |
| Agent finished successfully | "Complete" | "Done", "Finished", "Success" |
| Agent stopped due to error | "Failed" | "Error occurred", "Something went wrong" |
| Knowledge base document being indexed | "Processing" | "Uploading", "Training", "Indexing" |

---

## What We Call Our Users (Internally)

When talking about user types in design, code, and documentation:

| Internal term | Who they are |
|---|---|
| **Admin** | Workspace admin with configuration rights |
| **IT Admin** | Technical admin managing SSO, security, API access |
| **Writer** | Day-to-day content creator (also covers editors, strategists) |
| **Reviewer** | Someone with approval rights on the review workflow |

Don't use "end user", "customer" (ambiguous — means the buying company too), or "member" without qualification.
