# NUWA Button Test Project

A token-driven component library and documentation system built with React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and Storybook 10.

Used to create a reusable button component.

---

## Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.ts`
- **shadcn/ui** (radix-nova style) + **Radix UI** primitives
- **CVA** (class-variance-authority) — variant logic
- **Storybook 10** — component documentation and visual testing
- **Vitest** + **Playwright** — browser-based story tests
- **Geist** — typography

---

## Getting started

```bash
pnpm install
pnpm storybook       # localhost:6006
pnpm dev             # localhost:5173 (Vite app)
pnpm build           # TypeScript check + Vite build
```

---

## Structure

```
src/
├── components/ui/      # Component implementations
├── stories/
│   ├── Intro.mdx
│   ├── foundations/    # Token documentation (colors, type, spacing, etc.)
│   └── components/     # Component stories
├── tokens/
│   └── index.css       # Single source of truth for all design
├── layouts/
│   └── DocumentView.stories.tsx       # Raw page mockup with buttons (lg screens only)
 tokens
├── lib/
│   └── utils.ts        # cn() utility
└── index.css           # Tailwind entry + @theme bridge
```

---

## Token architecture

Three tiers — primitives never touch components directly:

```
--color-purple-600        →   --primary          →   bg-primary
--color-orange-500        →   --accent           →   bg-accent
--color-neutral-200       →   --border           →   border-border
```

All tokens live in `src/tokens/index.css`. Dark mode via `.dark` class on `<html>`.

---

## Component pattern

Every component uses CVA for variants, `cn()` for class merging, and exposes
`data-slot`, `data-variant`, `data-size` for targeting and introspection.

```tsx
const thingVariants = cva('base-classes', {
  variants: { variant: {}, size: {} },
  defaultVariants: { variant: 'default', size: 'default' },
})

function Thing({ className, variant, size, ...props }) {
  return (
    <div
      data-slot="thing"
      className={cn(thingVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

See `src/components/ui/button.tsx` as the canonical reference.

---

## AI-first setup

This repository is configured for AI-assisted development:

- **`CLAUDE.md`** — project rules loaded automatically by Claude Code every session
- **Storybook MCP addon** — lets AI agents query component metadata from the running Storybook
- Token and component conventions are explicit so AI-generated code is consistent without lengthy prompts

---

## Adding a new component

1. Create `src/components/ui/{name}.tsx` — follow the CVA pattern
2. Create `src/stories/components/{Name}.stories.tsx` — include Playground, Variants, Sizes, States
3. Run `pnpm storybook` and verify dark mode works via the toolbar toggle
4. Run `npx tsc --noEmit` — zero errors required
