# CLAUDE.md — Design System Rules

## 1. Stack

- React 19 + TypeScript
- Tailwind CSS v4 (no config file — CSS only)
- shadcn/ui (radix-nova style) + Radix UI primitives
- CVA (class-variance-authority)
- Storybook 10
- pnpm
- Package name: `@ds/ui`

---

## 2. File Map

```
src/tokens/index.css        → ALL design tokens (single source of truth)
src/tokens/tokens.ts        → typed TS constants for every token (tooling/AI only — never imported by components)
src/registry.ts             → machine-readable component catalogue (variants, use-cases, avoid — for AI/codegen)
src/index.css               → Tailwind entry + @theme bridge (no token values here)
src/index.ts                → barrel export (add every new component here)
src/components/ui/          → component implementations
src/stories/components/     → component stories
src/stories/foundations/    → token documentation stories
src/lib/utils.ts            → cn() utility
vite.config.lib.ts          → library build config (pnpm build:lib)
```

---

## 3. Component Conventions

- CVA for all variant logic — never branch on props inside `className`
- `cn()` for all class merging — never concatenate strings
- No inline styles unless unavoidable (gradients are the exception)
- Root element must have:
  - `data-slot="{name}"`
  - `data-variant={variant}` (if applicable)
  - `data-size={size}` (if applicable)
- Use Radix primitives for behavior (dialogs, dropdowns, etc.)
- Use `asChild + Slot.Root` for polymorphic composition
- React 19: `ref` is a plain prop — no `forwardRef` needed
- Named exports only: `export { Button, buttonVariants }`
- For `<input>` elements: `Omit<React.ComponentProps<'input'>, 'size'>` to avoid native `size: number` conflict

---

## 4. Token Rules

- Primitive tokens (`--color-purple-600`) → never use directly in components
- Semantic tokens (`--primary`) → always via Tailwind classes (`bg-primary`, `text-primary`)
- CSS variables directly allowed only for gradients and overlays
- No new CSS variables outside `src/tokens/index.css`
- Every semantic token must have a `.dark` override in tokens file
- Dark mode is applied via `.dark` class on `<html>` — toggled by Storybook toolbar decorator

---

## 5. Storybook Conventions

- Import types from `@storybook/react`
- Import `fn` from `storybook/test` — NOT `@storybook/test` (that is v8, incompatible)
- Import MDX blocks from `@storybook/addon-docs/blocks` — NOT `@storybook/blocks`
- `tags: ['autodocs']` on every component meta
- `parameters: { layout: 'centered' }` for components, `{ layout: 'padded' }` for foundations

Required stories per component:
- **Playground** — empty story, all controls live in the panel
- **Variants** — all variants in one render, controls disabled
- **Sizes** — all sizes in one render (if applicable)
- **States** — normal / disabled / aria-invalid

Dark mode is handled globally by the toolbar toggle — no per-component DarkMode story needed.

---

## 6. Anti-Patterns

- No hardcoded hex values in components
- No `@apply` inside component files
- No relative imports when `@/` alias exists
- No new CSS variables outside `src/tokens/index.css`
- No `forwardRef` — React 19 passes ref as a plain prop
- No `"use client"` — this is not a Next.js project
- No default exports from component files
- Do not modify shadcn-generated files unless converting into system primitives
- Do not add a component to `src/components/ui/` without also adding it to `src/index.ts`
- Do not import `src/tokens/tokens.ts` or `src/registry.ts` inside components — they are tooling/AI metadata only

---

## 7. New Component Checklist

1. Create `src/components/ui/{name}.tsx` — CVA pattern, semantic tokens only
2. Add JSDoc on each CVA variant explaining when to use it; add function-level JSDoc with `@example`
3. Export from `src/index.ts` — `export { Name, nameVariants }`
4. Add entry to `src/registry.ts` — variants, useCases, avoid, relatedTo
5. Create `src/stories/components/{Name}.stories.tsx` — Playground, Variants, Sizes, States
6. Verify dark mode via toolbar toggle
7. Run `npx tsc --noEmit` — zero errors
