# Setup Guide — Design System Boilerplate

Step-by-step instructions to recreate this boilerplate from an empty folder.
Every command is copy-pasteable. Every non-obvious decision is explained.

---

## Prerequisites

- **Node.js 20+** — check with `node -v`
- **pnpm** — install with `npm i -g pnpm`, check with `pnpm -v`

---

## Step 1 — Scaffold Vite + React + TypeScript

```bash
pnpm create vite@latest my-design-system --template react-ts
cd my-design-system
pnpm install
```

You now have a minimal React + TypeScript + Vite project.

**Verify:** `pnpm dev` opens a Vite default page at `localhost:5173`.

---

## Step 2 — Install Tailwind CSS v4

```bash
pnpm add tailwindcss @tailwindcss/vite tw-animate-css
```

> Tailwind v4 uses a Vite plugin instead of a config file.
> No `tailwind.config.ts` needed — everything lives in CSS.

Replace the entire `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace the entire `src/index.css` with just one line for now:

```css
@import "tailwindcss";
```

**Verify:** `pnpm dev` still works, no errors.

---

## Step 3 — Install Geist font

```bash
pnpm add @fontsource-variable/geist
```

You'll import it in `index.css` later in Step 9.

---

## Step 4 — Add the `@` path alias

> ⚠️ **Do this before running shadcn init** — it will refuse to run without a valid path alias.

Two places need updating.

**`vite.config.ts`** — add `path` import and `resolve.alias`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

**`tsconfig.json`** — replace the entire file:

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

> Why extend `tsconfig.app.json`? Vite scaffolds two tsconfig files.
> The root one lacks `jsx` and `moduleResolution`, causing IDE JSX errors.
> Extending `tsconfig.app.json` inherits those settings and adds the alias on top.

---

## Step 5 — Install shadcn/ui dependencies

```bash
pnpm add shadcn radix-ui class-variance-authority clsx tailwind-merge lucide-react
```

Then run the shadcn initializer:

```bash
pnpm dlx shadcn@latest init
```

When prompted:
- **Style**: `radix-nova`
- **Base color**: `neutral`
- **CSS variables**: `yes`
- **TypeScript**: `yes`

This creates `components.json` and rewrites `src/index.css` with a large `:root`
block full of neutral `oklch(...)` values.

> ⚠️ **Critical**: shadcn's `:root` block will overwrite your brand tokens
> (buttons will be black, not purple). You will strip it in Step 9.
> Do NOT add your tokens yet — do Step 9 after this.

**Check `components.json` looks like this:**

```json
{
  "style": "radix-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": { "css": "src/index.css", "cssVariables": true },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## Step 6 — Install Storybook 10

```bash
pnpm dlx storybook@latest init
```

When prompted, choose **`@storybook/react-vite`** as the framework.

This creates:
- `.storybook/main.ts`
- `.storybook/preview.ts` (you'll rewrite this to `.tsx` in Step 11)
- `src/stories/` with example Button/Header/Page components

Now install the additional packages Storybook 10 needs:

```bash
pnpm add -D @storybook/react @storybook/addon-a11y @storybook/addon-docs @storybook/addon-mcp
pnpm add -D @chromatic-com/storybook
pnpm add -D @storybook/addon-vitest vitest @vitest/browser-playwright playwright
```

> ⚠️ `@storybook/react` is NOT auto-installed by `@storybook/react-vite` in v10.
> Without it you get `Cannot find module '@storybook/react'` on every story file.

> ⚠️ Do NOT install `@storybook/test` — that's the v8 package and will conflict.
> Test utilities (`fn`, `expect`, `within`, `userEvent`) come from `storybook/test`.

**Replace `.storybook/main.ts`:**

```ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
}
export default config
```

**Replace `vite.config.ts`** with the full version including Vitest wiring:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: 'chromium' }],
        },
      },
    }],
  },
})
```

**Verify:** `pnpm storybook` opens on `localhost:6006` with the default example stories.

---

## Step 7 — Delete all boilerplate files

These are Vite defaults and shadcn/Storybook examples you don't want:

```bash
# Vite defaults
rm src/App.css src/App.tsx
rm src/assets/react.svg

# Storybook example components
rm src/stories/Button.stories.ts
rm src/stories/Button.tsx
rm src/stories/Header.stories.ts
rm src/stories/Header.tsx
rm src/stories/Page.stories.ts
rm src/stories/Page.tsx
rm src/stories/Configure.mdx
rm src/stories/button.css
rm src/stories/header.css
rm src/stories/page.css
```

Keep `src/main.tsx` — Storybook needs it for the Vite entry point.

Create the story folder structure:

```bash
mkdir -p src/stories/foundations
mkdir -p src/stories/components
```

---

## Step 8 — Create the token system

Create a new file `src/tokens/index.css`. This is the **single source of truth**
for every visual value in the system. Nothing else should define colors, spacing,
radius, or typography.

```css
/* ─────────────────────────────────────────────────────────
   DESIGN TOKENS — SINGLE SOURCE OF TRUTH
   Three tiers:
   1. Primitives  — raw palette, NEVER used directly in components
   2. Semantic    — role-based aliases, always use these in components
   3. System      — spacing, radius, shadow, motion, z-index, typography
   ───────────────────────────────────────────────────────── */


/* ── 1. PRIMITIVE TOKENS ── */
:root {
  /* Brand palette */
  --color-purple-900: #2D1B69;
  --color-purple-600: #7C3AED;
  --color-purple-100: #EDE9FE;

  --color-orange-500: #F97316;
  --color-orange-100: #FFEDD5;

  /* Neutrals */
  --color-neutral-900: #1A1A2E;
  --color-neutral-500: #6B7280;
  --color-neutral-200: #E5E7EB;
  --color-neutral-100: #F9FAFB;
  --color-white: #FFFFFF;

  /* Status */
  --color-error:   #EF4444;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
}


/* ── 2. SEMANTIC TOKENS — light mode ── */
:root {
  --background:         var(--color-white);
  --foreground:         var(--color-neutral-900);

  --card:               var(--color-white);
  --card-foreground:    var(--color-neutral-900);

  --popover:            var(--color-white);
  --popover-foreground: var(--color-neutral-900);

  --primary:            var(--color-purple-600);
  --primary-foreground: var(--color-white);

  --secondary:            var(--color-purple-100);
  --secondary-foreground: var(--color-purple-600);

  --muted:            var(--color-neutral-100);
  --muted-foreground: var(--color-neutral-500);

  --accent:            var(--color-orange-500);
  --accent-foreground: var(--color-white);

  --destructive:            var(--color-error);
  --destructive-foreground: var(--color-white);

  --border:  var(--color-neutral-200);
  --input:   var(--color-neutral-200);
  --ring:    var(--color-purple-600);
  --overlay: rgba(45, 27, 105, 0.6);
}


/* ── BRAND TOKENS (marketing/navbar surfaces) ── */
:root {
  --color-brand-navbar:   var(--color-purple-900);
  --color-brand-primary:  var(--color-purple-600);
  --color-brand-accent:   var(--color-orange-500);
  --color-brand-gradient: linear-gradient(
    to right,
    var(--color-orange-500),
    var(--color-purple-600)
  );
}


/* ── 3. SYSTEM TOKENS ── */
:root {
  /* Radius */
  --radius-none: 0;
  --radius-sm:   0.25rem;   /* 4px  */
  --radius-md:   0.5rem;    /* 8px  */
  --radius-lg:   0.75rem;   /* 12px */
  --radius-xl:   1rem;      /* 16px */
  --radius-full: 9999px;
  --radius: var(--radius-md); /* default used by shadcn components */

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.12);
  --shadow-xl: 0 20px 50px rgba(0,0,0,0.18);

  /* Z-index */
  --z-0: 0; --z-10: 10; --z-20: 20; --z-30: 30; --z-40: 40; --z-50: 50;
  --z-dropdown: 1000;
  --z-sticky:   1100;
  --z-overlay:  1200;
  --z-modal:    1300;
  --z-toast:    1400;

  /* Motion */
  --duration-fast:   120ms;
  --duration-normal: 200ms;
  --duration-slow:   320ms;
  --ease-in:     cubic-bezier(0.4, 0, 1, 1);
  --ease-out:    cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}


/* ── TYPOGRAPHY TOKENS ── */
:root {
  --font-size-xs:   0.75rem;
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.125rem;
  --font-size-xl:   1.25rem;
  --font-size-2xl:  1.5rem;
  --font-size-3xl:  1.875rem;

  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --line-height-tight:   1.25;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.75;
}


/* ── SPACING TOKENS ── */
:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
}


/* ── DARK MODE — every semantic token must have a dark override ── */
.dark {
  --background:         var(--color-purple-900);
  --foreground:         var(--color-white);

  --card:               #3D2A7D;
  --card-foreground:    var(--color-white);

  --popover:            #3D2A7D;
  --popover-foreground: var(--color-white);

  --primary:            var(--color-purple-600);
  --primary-foreground: var(--color-white);

  --secondary:            #3D2A7D;
  --secondary-foreground: var(--color-white);

  --muted:            #3D2A7D;
  --muted-foreground: var(--color-purple-100);

  --accent:            var(--color-orange-500);
  --accent-foreground: var(--color-white);

  --destructive:            var(--color-error);
  --destructive-foreground: var(--color-white);

  --border:  #4C3A8A;
  --input:   #4C3A8A;
  --ring:    var(--color-purple-600);
  --overlay: rgba(0, 0, 0, 0.5);
}
```

---

## Step 9 — Rewrite `src/index.css` (the critical step)

**Replace the entire file** with the content below.

This does three things shadcn's generated file does not:
1. Imports your token file before anything else so it wins the cascade
2. Strips the shadcn neutral `oklch(...)` overrides that would make everything black/grey
3. Bridges CSS custom properties → Tailwind utility classes via `@theme inline`

```css
/* Tailwind entry */
@import "tailwindcss";

/* Your design tokens — must come before shadcn */
@import "./tokens/index.css";

@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

/* Dark mode via .dark class on <html> */
@custom-variant dark (&:is(.dark *));

/* Base resets */
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#root { min-height: 100vh; }

/* ── Bridge CSS vars → Tailwind color utilities ──
   e.g. --primary becomes bg-primary, text-primary, etc. */
@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: 'Geist Variable', sans-serif;

  --color-background:         var(--background);
  --color-foreground:         var(--foreground);
  --color-card:               var(--card);
  --color-card-foreground:    var(--card-foreground);
  --color-popover:            var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary:            var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary:            var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:            var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent:            var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input:  var(--input);
  --color-ring:   var(--ring);

  /* Charts (used by shadcn chart components) */
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  /* Sidebar (used by shadcn sidebar component) */
  --color-sidebar:                    var(--sidebar);
  --color-sidebar-foreground:         var(--sidebar-foreground);
  --color-sidebar-primary:            var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent:             var(--sidebar-accent);
  --color-sidebar-accent-foreground:  var(--sidebar-accent-foreground);
  --color-sidebar-border:             var(--sidebar-border);
  --color-sidebar-ring:               var(--sidebar-ring);
}

/* ── Radius — static values, not calc()
   IMPORTANT: use @theme (not @theme inline) for radius so Tailwind
   registers rounded-sm, rounded-md etc. as actual utilities.
   Values must match src/tokens/index.css exactly. ── */
@theme {
  --radius-none: 0;
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-full: 9999px;
}

/* ── Non-brand extras (charts, sidebar) not in tokens/index.css ── */
:root {
  --radius: var(--radius-md);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar:                    var(--color-neutral-100);
  --sidebar-foreground:         var(--color-neutral-900);
  --sidebar-primary:            var(--color-purple-600);
  --sidebar-primary-foreground: var(--color-white);
  --sidebar-accent:             var(--color-purple-100);
  --sidebar-accent-foreground:  var(--color-purple-600);
  --sidebar-border:             var(--color-neutral-200);
  --sidebar-ring:               var(--color-purple-600);
}

.dark {
  --sidebar:                    #3D2A7D;
  --sidebar-foreground:         var(--color-white);
  --sidebar-primary:            var(--color-purple-600);
  --sidebar-primary-foreground: var(--color-white);
  --sidebar-accent:             #4C3A8A;
  --sidebar-accent-foreground:  var(--color-white);
  --sidebar-border:             #4C3A8A;
  --sidebar-ring:               var(--color-purple-600);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
  html { @apply font-sans; }
}
```

---

## Step 10 — Create `src/lib/utils.ts`

shadcn may have created this already. If not, create it:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Step 11 — Rewrite `.storybook/preview.tsx`

Rename `preview.ts` → `preview.tsx` (it needs JSX), then replace with:

```tsx
import React from 'react'
import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/index.css'

/* Toggles .dark on <html> and sets body background.
   Must be on documentElement, not a wrapper div,
   so the whole canvas background goes dark. */
const withTheme: Decorator = (Story, context) => {
  const isDark = context.globals.theme === 'dark'

  React.useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      document.body.style.background = '#2D1B69'
    } else {
      html.classList.remove('dark')
      document.body.style.background = ''
    }
    return () => {
      html.classList.remove('dark')
      document.body.style.background = ''
    }
  }, [isDark])

  return <Story />
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
}

export default preview
```

---

## Step 12 — Create `src/stories/Intro.mdx`

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Introduction" />

# Your Design System

...
```

> ⚠️ Import from `@storybook/addon-docs/blocks`, **not** `@storybook/blocks`.
> `@storybook/blocks` is a separate package that is not installed in Storybook 10
> standalone setups — importing from it silently fails with a dynamic import error.

---

## Step 13 — Create `src/lib/utils.ts` and first component

**`src/lib/utils.ts`** (may already exist from shadcn init):

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**CVA component skeleton** — every component follows this exact pattern:

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'           // only if polymorphic (asChild)
import { cn } from '@/lib/utils'

const thingVariants = cva(
  // base classes — always applied
  'inline-flex items-center transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        // ...
      },
      size: {
        sm:      'h-7 px-2.5 text-xs',
        default: 'h-9 px-3 text-sm',
        lg:      'h-11 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size:    'default',
    },
  }
)

function Thing({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'div'>
  & VariantProps<typeof thingVariants>
  & { asChild?: boolean }) {

  const Comp = asChild ? Slot.Root : 'div'

  return (
    <Comp
      data-slot="thing"
      data-variant={variant}
      data-size={size}
      className={cn(thingVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Thing, thingVariants }
```

> **`<input>` gotcha**: the native `<input>` element has a `size` attribute typed as
> `number`. If your CVA `size` is a string, you get a type error.
> Fix: `Omit<React.ComponentProps<'input'>, 'size'> & VariantProps<...>`

**Add JSDoc to every variant** so AI assistants and IDE hover know when to use each:

```tsx
const thingVariants = cva('...', {
  variants: {
    variant: {
      /** Primary action — brand fill. Use for the single most important action on a surface. */
      default: 'bg-primary text-primary-foreground',
      /** Secondary action — bordered, no fill. Pair with default. */
      outline: 'border-border bg-background hover:bg-muted',
    },
  },
})

/**
 * Thing — short plain-English description.
 *
 * @example
 * <Thing>Label</Thing>
 * <Thing variant="outline">Cancel</Thing>
 */
function Thing({ ... }) { ... }
```

---

## Step 14 — Story skeleton

Every component story follows this structure. Save as
`src/stories/components/Thing.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'          // ← storybook/test, NOT @storybook/test

import { Thing } from '@/components/ui/thing'

const meta = {
  title: 'Components/Thing',
  component: Thing,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    variant: 'default',
    size: 'default',
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Thing>

export default meta
type Story = StoryObj<typeof meta>

// Interactive — controlled by controls panel
export const Playground: Story = {}

// All variants in one view
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-3">
      <Thing variant="default">Default</Thing>
      <Thing variant="secondary">Secondary</Thing>
    </div>
  ),
}

// All sizes in one view
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-end gap-3">
      <Thing size="sm">Small</Thing>
      <Thing size="default">Default</Thing>
      <Thing size="lg">Large</Thing>
    </div>
  ),
}

// Normal / Disabled / Invalid
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-3">
      <Thing>Normal</Thing>
      <Thing disabled>Disabled</Thing>
      <Thing aria-invalid="true">Invalid</Thing>
    </div>
  ),
}
```

> Dark mode is handled globally by the toolbar toggle in `preview.tsx`.
> You do NOT need a separate `DarkMode` story on every component.

---

## Step 15 — Semantic layer (AI metadata)

These files are for tooling and AI assistants — they are never imported by components at runtime.

**`src/tokens/tokens.ts`** — typed TS constants that mirror every token in `tokens/index.css`:

```ts
export const primitives = {
  color: {
    purple: {
      600: { var: '--color-purple-600', value: '#7C3AED', note: 'Core brand — primary actions' },
      // ... rest of palette
    },
  },
}

export const semantic = {
  primary: { var: '--primary', light: '#7C3AED', dark: '#7C3AED' },
  // ... rest of semantic tokens
}

export const radius = {
  md: { var: '--radius-md', value: '0.5rem', px: 8 },
  // ...
}

// + motion, typography, spacing, zIndex, shadow, brand
```

**`src/registry.ts`** — machine-readable catalogue of all components:

```ts
export type ComponentEntry = {
  from: string
  exports: string[]
  description: string
  variants?: Record<string, Record<string, string>>
  useCases: string[]
  avoid?: string[]
  relatedTo?: string[]
}

export const registry: Record<string, ComponentEntry> = {
  Button: {
    from: '@ds/ui',
    exports: ['Button', 'buttonVariants'],
    description: 'Primary interactive element. Polymorphic via asChild.',
    variants: {
      variant: {
        default:     'Primary action — brand purple fill. One per surface.',
        outline:     'Secondary action — bordered, no fill.',
        destructive: 'Red tint. Delete, remove, irreversible actions only.',
        // ...
      },
    },
    useCases: ['Form submissions', 'Dialog confirm/cancel', 'Toolbar actions'],
    avoid: ['Multiple default-variant buttons on the same surface'],
    relatedTo: ['Input', 'Badge'],
  },
  // ... Input, Badge, Card
}
```

---

## Step 16 — Library packaging (optional — skip if not publishing)

To make this importable as `@ds/ui` in a monorepo:

**`src/index.ts`** — barrel export for every component:

```ts
export { Button, buttonVariants } from './components/ui/button'
export { Input, inputVariants }   from './components/ui/input'
export { Badge, badgeVariants }   from './components/ui/badge'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card'
export { cn } from './lib/utils'
```

**`vite.config.lib.ts`** — separate build config (keeps dev and lib builds separate):

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'node:url'

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(dirname, './src') } },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'DSui',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { globals: { react: 'React', 'react-dom': 'ReactDOM' } },
    },
    sourcemap: true,
  },
})
```

**`package.json`** — update name, add exports map and peerDependencies:

```json
{
  "name": "@ds/ui",
  "private": false,
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./src/index.css"
  },
  "files": ["dist", "src/index.css", "src/tokens/index.css"],
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0"
  },
  "scripts": {
    "build:lib": "tsc -b && vite build --config vite.config.lib.ts"
  }
}
```

**Verify:** `pnpm build:lib` produces `dist/index.mjs`, `dist/index.cjs`, `dist/index.d.ts` with zero errors.

---

## Step 17 — Final verification

```bash
# TypeScript — should produce zero output (zero errors)
npx tsc --noEmit

# Storybook — should open on localhost:6006 with no console errors
pnpm storybook
```

Check in Storybook:
- [ ] Intro page loads
- [ ] Components appear in the sidebar
- [ ] Button (or your component) is purple, not black
- [ ] Toolbar sun/moon toggle switches the canvas background to dark navy

---

## Gotchas reference

| Symptom | Root cause | Fix |
|---|---|---|
| `shadcn init` fails: "Could not find valid path aliases" | `@` alias not set up yet | Do Step 4 (tsconfig + vite alias) before running shadcn init |
| Buttons/components are black not purple | shadcn init `oklch()` overrides win the cascade | Replace entire `index.css` per Step 9 — tokens file must be imported first |
| `Cannot find module '@storybook/react'` | Not auto-installed by `@storybook/react-vite` v10 | `pnpm add -D @storybook/react` |
| `Cannot resolve '@storybook/test'` | `@storybook/test` is Storybook v8 only | Import `fn` from `storybook/test` (no `@`) |
| MDX story: "Failed to fetch dynamically imported module" | Wrong import path in `.mdx` | `import { Meta } from '@storybook/addon-docs/blocks'` — not `@storybook/blocks` |
| Dark mode toggle: canvas stays white | `.dark` on a wrapper div doesn't fill viewport | Set `.dark` on `document.documentElement` in decorator — see Step 11 |
| `rounded-md` gives wrong size | `@theme inline` generates radius via `calc()` overriding token values | Use `@theme` (not inline) with static values — see Step 9 |
| Input `size` prop TS error | Native `<input size>` is typed as `number` | `Omit<React.ComponentProps<'input'>, 'size'> & VariantProps<...>` |
| JSX errors in IDE on story files | Root `tsconfig.json` missing `jsx` + `moduleResolution` | Replace root `tsconfig.json` per Step 5 |
| `pnpm storybook` works but `pnpm dev` 404s | `src/App.tsx` was deleted | Expected — Storybook has its own server. `pnpm dev` is the Vite app, not needed for design system work |
