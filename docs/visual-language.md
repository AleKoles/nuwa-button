---
title: Visual Language
description: The aesthetic direction for Nuwacom's design system. Derived from early product screenshots (direction, not final spec) and the token architecture. Use this to understand the vibe before building components — exact values will be set as the system matures.
---

# Visual Language

## Character

**Closest references:** Linear, Raycast, Craft — tools that are visually restrained during work and let content take focus.

**Not:** Notion (too casual, block-playful), Jasper (too markety), Google Workspace (too institutional), Figma (too meta-tool).

**The operating principle:** Nuwacom's chrome recedes; content surfaces. The sidebar, top bar, and panels are functional and quiet. The document canvas is where the product's personality shows. These are two distinct visual registers within the same application, and they should not bleed into each other.

---

## Two Visual Registers

### Register 1 — Application chrome
Sidebar, top bar, list panels, dialogs, settings surfaces. The UI layer.

- Flat, restrained, high information density
- Geist Sans, small type, neutral palette dominant
- Color is punctuation, not wallpaper — purple and orange appear at moments of selection, action, or brand identity
- No decorative elements, no gradients, no illustration

### Register 2 — Document canvas
The document view and any rich content rendering area.

- Editorial, spacious, expressive
- Distinct type treatment (larger, more considered hierarchy)
- Template-driven — can include brand colors, display type, document chrome
- Operates on its own visual rules; don't apply application chrome conventions here

**Critical rule:** Do not import document canvas conventions (large display type, decorative shapes, editorial layouts) into the application chrome layer. They belong to different surfaces.

---

## Color Application

### The primary action color in light mode is black, not purple

The "Continue" / primary CTA uses `--color-neutral-950` (#0A0A0A), not brand purple. This is confirmed in both screenshots. **Purple is not the primary action color.** Purple signals selection, active state, and brand accent — it is not for default primary buttons.

| Role | Light mode | Dark mode |
|------|-----------|-----------|
| Primary action button | `neutral-950` (#0A0A0A) black fill | White fill or purple — confirm |
| Active/selected state | `primary` (#7C3AED) purple | `primary` (#7C3AED) purple |
| Accent (orange) | Sparingly — icon tints, gradient ends | Sparingly — same |
| Background | `--background` white (#FFFFFF) | `--background` (#222325) |
| Sidebar/panel surface | `--muted` (#ECECEC) | Same `--background` (#222325) — no differentiation |
| Card/elevated surface | `--card` (#FAFAF8) warm off-white | `--card` (#2a2c2e) |

### The depth model is tonal, not shadow-based

**No box-shadows.** Depth and panel separation are achieved entirely through background color differences:

- Light mode: white content area vs. `#ECECEC` sidebar vs. `#FAFAF8` card surfaces
- Dark mode: `#222325` base vs. `#2a2c2e` elevated vs. `#313336` secondary surface

There is no elevation hierarchy expressed through shadows. If a component needs to feel "on top", it uses a lighter dark surface or a border — never `box-shadow`.

### Color is used as punctuation

In a typical view, most of the interface is neutral. Brand color appears at specific moments:
- Active navigation item or selected tab
- Primary state of a toggle or checkbox
- A `Badge` or `StatusDot` carrying semantic meaning
- The Nuwacom logomark

Using purple broadly as a background fill, accent stripe, or decorative element breaks this pattern and makes the UI feel branded-at-the-expense-of-legible.

---

## Layout Structure

### Three-panel composition

```
┌──────────────┬───────────────────┬───────────────────────────────────┐
│   Sidebar    │   List / content  │        Main canvas / document     │
│   ~210px     │   ~380px          │        flex: 1                    │
│   fixed      │   scrollable      │        scrollable                 │
└──────────────┴───────────────────┴───────────────────────────────────┘
```

- Sidebar is persistent. It does not collapse on initial load.
- Panel widths are fixed; only the main canvas grows with viewport width.
- Panel separation: subtle border or background tone change. Not a heavy divider.

### The sidebar
- Always visible, never empty
- Background: `--muted` (#ECECEC) in light mode; same base `--background` (#222325) in dark — no visible differentiation in dark mode
- Section labels ("Pinned", "Projects"): small, uppercase, `--muted-foreground`
- User avatar + name at bottom-left, always present
- Exact dimensions TBD

### Top bar
- White background, minimal height
- Breadcrumb on the left, primary actions clustered right
- Tab-style context switcher with active state using `--secondary` background + `--primary` text
- Primary action = filled black in light mode (not purple)

---

## Typography

All UI type is **Geist Sans**. Document canvas may use different treatment — that is a document-layer concern, not a component library concern.

Exact type scale TBD as components are built. Directional intent:

- **Small and efficient in chrome.** Nav labels, metadata, and helper text should be compact — this is a workspace tool, not a content site.
- **Weight as hierarchy, not size.** Prefer weight variation (400 → 500 → 600) over large size jumps within a single surface.
- **400 for passive content, 500 for interactive labels.** 600+ only for headings and display contexts. Avoid 700+ in chrome.

**Geist Mono** for: code, token values, IDs, timestamps in data tables, keyboard shortcut labels.

---

## Spacing & Density

Nuwacom is **medium density** — tighter than a marketing tool, more breathable than a data dashboard.

Exact values TBD as components are built. Directional intent:

- Chrome and list surfaces should feel efficient, not spacious. When in doubt, lean tighter.
- Cards and modals get more breathing room — they're focal surfaces.
- Do not add padding "for comfort" on sidebar or list items. The density is intentional.

---

## Border Radius

Exact values TBD. Directional intent:

- **Moderate, not sharp and not pill-shaped.** The product reads as considered and modern, not bubbly.
- Smaller elements (buttons, inputs, badges) should have less radius than larger containers (cards, modals).
- The document canvas container may use a more generous radius — it's a focal surface.
- **No pill-shaped (border-radius: 9999px) elements in the chrome layer.** If something feels like it wants a pill, reconsider whether it belongs in the document layer instead.

---

## Iconography

- **Style:** Line icons, thin-to-regular stroke weight (~1.5px at 20px)
- **Size:** 16px in compact contexts (sidebar), 18–20px in content areas, 24px in display/empty states
- **Color:** `--muted-foreground` when inactive, `--foreground` when active/hovered, `--primary` when selected
- **Labeled:** Icons in navigation always have visible text labels. Icon-only buttons (toolbar, top bar) require `aria-label` + tooltip.

The Nuwacom logomark is a gradient flame/spark — orange-to-purple. This appears in the top-left of the sidebar and on the pinned "Use Case Finder" item. Do not replicate this gradient on other elements. It is identity, not a pattern.

---

## Interactive States

Grounded in what's visible in the product:

| State | Light mode | Dark mode |
|-------|-----------|-----------|
| Default | `--foreground` text, transparent bg | Same |
| Hover | `--muted` (#ECECEC) background tint | `--card` (#2a2c2e) background tint |
| Active/selected | `--secondary` (#EDE9FE) bg + `--primary` (#7C3AED) text | `--secondary` (#2A2A35) bg + white text |
| Focus | `--ring` (#7C3AED) purple outline, 2px | Same |
| Disabled | `--muted` bg + `--muted-foreground` text, no pointer | Same |

**Focus rings always use brand purple.** This is consistent with the `--ring` token pointing to `--primary`. Do not override focus ring color on individual components.

---

## Light vs Dark — The Relationship

These are not inverses of each other. They have different structural logic:

**Light mode:** Two-tone — sidebar is visibly distinct from the content area through the `#ECECEC` vs. white background difference. This visual separation reinforces that the sidebar is navigation infrastructure, separate from work content.

**Dark mode:** One-tone base — sidebar and content area share the same `#222325` background. Panel separation comes from borders alone. The UI feels more unified, less structurally divided.

**What this means for components:** A component that uses background differentiation for visual hierarchy in light mode must also use border or surface elevation for the same hierarchy in dark mode — the same background trick won't work.

---

## What Nuwacom Does Not Look Like

These are aesthetics to actively avoid, derived from both competitor analysis and the visual direction observed:

- **Flat-pastel with rounded cards** (Notion, Coda) — too casual, implies flexible/unstructured
- **Blue-dominant enterprise** (Salesforce, Confluence) — too institutional, reads as legacy software
- **Heavy gradient backgrounds** (many AI startups) — feels like a landing page
- **Emoji/illustration as UI decoration** — breaks the professional register immediately
- **Wide spacing as design sophistication** — Nuwacom is a dense workspace tool; excessive padding makes it feel like a marketing site
- **Alert-color-as-brand** — do not use red/green/orange decoratively
