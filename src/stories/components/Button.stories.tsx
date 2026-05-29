import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import {
  ArrowRight,
  Check,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  Trash2,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

// ─── Icon map — selectable in Playground controls ────────────────────────────

const ICON_MAP = {
  Plus,
  Search,
  ArrowRight,
  Check,
  X,
  Trash2,
  Save,
  Send,
  Settings,
} as const

type IconName = keyof typeof ICON_MAP

type PlaygroundArgs = React.ComponentProps<typeof Button> & {
  iconPosition: 'none' | 'before' | 'after' | 'icon-only'
  iconName: IconName
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-background p-8 flex justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      description:
        'Semantic role and visual weight. **action** = one primary CTA per surface. **primary** = brand/feature context. **outline** = secondary alongside action. **ghost** = toolbar/icon actions.',
      control: 'select',
      options: ['action', 'primary', 'outline', 'soft', 'ghost', 'destructive', 'link'],
    },
    size: {
      description: 'Height and padding scale. `icon-*` sizes are square — always add `aria-label`.',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    shape: {
      description: '`square` = 8 px radius (default). `round` = pill.',
      control: 'inline-radio',
      options: ['square', 'round'],
    },
    loading: {
      description: 'Shows a spinner and blocks interaction. Text buttons show "Loading…"; icon-only sizes show the spinner alone.',
      control: 'boolean',
    },
    status: {
      description: 'Async feedback state. Parent controls reset by setting back to undefined.',
      control: 'select',
      options: [undefined, 'success', 'error'],
    },
    fullWidth: {
      description: 'Stretch to fill container width.',
      control: 'boolean',
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    asChild: { table: { disable: true } },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    variant: 'action',
    size: 'md',
    shape: 'square',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  argTypes: {
    iconPosition: {
      description: 'Where to place the icon relative to the label',
      control: 'inline-radio',
      options: ['none', 'before', 'after', 'icon-only'],
      table: { category: 'Icon' },
    },
    iconName: {
      description: 'Which Lucide icon to render',
      control: 'select',
      options: Object.keys(ICON_MAP),
      table: { category: 'Icon' },
    },
  } as unknown as Record<string, object>,
  args: { iconPosition: 'none', iconName: 'Plus' } as unknown as Story['args'],
  render(args) {
    const { iconPosition, iconName, children, ...buttonProps } = args as unknown as PlaygroundArgs
    const IconComp = ICON_MAP[iconName as IconName] ?? Plus

    if (iconPosition === 'icon-only') {
      const iconSize =
        buttonProps.size === 'xs' || buttonProps.size === 'icon-xs' ? 'icon-xs'
        : buttonProps.size === 'sm' || buttonProps.size === 'icon-sm' ? 'icon-sm'
        : buttonProps.size === 'lg' || buttonProps.size === 'icon-lg' ? 'icon-lg'
        : 'icon'
      return (
        <Button
          aria-label={typeof children === 'string' ? children : 'Action'}
          {...buttonProps}
          size={iconSize}
        >
          <IconComp />
        </Button>
      )
    }

    return (
      <Button {...buttonProps}>
        {iconPosition === 'before' && <IconComp />}
        {children}
        {iconPosition === 'after' && <IconComp />}
      </Button>
    )
  },
}

// ─── When to use ─────────────────────────────────────────────────────────────

export const WhenToUse: Story = {
  name: 'When to use',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-xs text-foreground/70">
        Each variant has one semantic role. Using the wrong one breaks visual hierarchy.
      </p>
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {([
          {
            variant: 'action' as const,
            token: '--action',
            rule: 'One primary decision per view — never two',
            examples: 'Continue, Submit, Save',
            el: <Button size="sm">Continue</Button>,
          },
          {
            variant: 'primary' as const,
            token: '--primary',
            rule: 'Brand context — upgrades, active feature toggles',
            examples: 'Upgrade, Activate, Try it',
            el: <Button variant="primary" size="sm">Upgrade</Button>,
          },
          {
            variant: 'outline' as const,
            token: '--border',
            rule: 'Secondary alongside action — never looks disabled',
            examples: 'Cancel, Export, Duplicate',
            el: <Button variant="outline" size="sm">Cancel</Button>,
          },
          {
            variant: 'soft' as const,
            token: '--secondary',
            rule: 'Between outline and ghost — filters, chips, contextual',
            examples: 'Filter, Label, Assign',
            el: <Button variant="soft" size="sm">Filter</Button>,
          },
          {
            variant: 'ghost' as const,
            token: '—',
            rule: 'Toolbars and sidebars — lowest visual weight',
            examples: 'Settings, More, icon-only actions',
            el: <Button variant="ghost" size="icon-sm" aria-label="Settings"><Settings /></Button>,
          },
          {
            variant: 'destructive' as const,
            token: '--destructive',
            rule: 'Irreversible actions — always pair with a confirmation step',
            examples: 'Delete, Remove, Revoke',
            el: <Button variant="destructive" size="sm"><Trash2 /> Delete</Button>,
          },
          {
            variant: 'link' as const,
            token: '--primary',
            rule: 'Inline prose or low-hierarchy text actions',
            examples: 'Learn more, View all, See details',
            el: <Button variant="link" size="sm">Learn more</Button>,
          },
        ] as const).map(({ variant, token, rule, examples, el }) => (
          <div key={variant} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 bg-background px-4 py-3 hover:bg-muted/50">
            <span className="font-mono text-xs text-foreground/70">{variant}</span>
            <div>
              <p className="text-xs font-medium text-foreground">{rule}</p>
              <p className="mt-0.5 text-xs text-foreground/70">{examples} · <span className="font-mono">{token}</span></p>
            </div>
            {el}
          </div>
        ))}
      </div>
    </div>
  ),
}

// ─── Variants ────────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 font-mono text-xs text-foreground/70">Normal</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="action">Action</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-xs text-foreground/70">Disabled</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="action" disabled>Action</Button>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="soft" disabled>Soft</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="link" disabled>Link</Button>
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-xs text-foreground/70">Icon only</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon" variant="action" aria-label="Add"><Plus /></Button>
          <Button size="icon" variant="primary" aria-label="Add"><Plus /></Button>
          <Button size="icon" variant="outline" aria-label="Add"><Plus /></Button>
          <Button size="icon" variant="soft" aria-label="Add"><Plus /></Button>
          <Button size="icon" variant="ghost" aria-label="Settings"><Settings /></Button>
          <Button size="icon" variant="destructive" aria-label="Delete"><Trash2 /></Button>
        </div>
      </div>
    </div>
  ),
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-3 font-mono text-xs text-foreground/70">Text buttons</p>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium (default)</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-xs text-foreground/70">Icon buttons</p>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="icon-xs" aria-label="Add xs"><Plus /></Button>
          <Button size="icon-sm" aria-label="Add sm"><Plus /></Button>
          <Button size="icon" aria-label="Add"><Plus /></Button>
          <Button size="icon-lg" aria-label="Add lg"><Plus /></Button>
        </div>
      </div>
    </div>
  ),
}

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button><Search /> Search</Button>
      <Button>Continue <ArrowRight /></Button>
      <Button variant="outline"><Plus /> New item</Button>
      <Button variant="destructive"><Trash2 /> Delete</Button>
      <Button variant="soft" size="sm"><Plus /> Add</Button>
      <Button variant="ghost"><Send /> Send</Button>
      <Button size="icon" aria-label="Add"><Plus /></Button>
      <Button size="icon" variant="ghost" aria-label="Settings"><Settings /></Button>
    </div>
  ),
}

// ─── Shape ───────────────────────────────────────────────────────────────────

export const Shape: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-3 font-mono text-xs text-foreground/70">Square (default — rounded-md)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="action">Continue</Button>
          <Button variant="primary">Upgrade</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="ghost"><Send /> Send</Button>
          <Button size="icon" aria-label="Add"><Plus /></Button>
          <Button size="icon-sm" variant="ghost" aria-label="Settings"><Settings /></Button>
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-xs text-foreground/70">Round (rounded-full)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="action" shape="round">Continue</Button>
          <Button variant="primary" shape="round">Upgrade</Button>
          <Button variant="outline" shape="round">Cancel</Button>
          <Button variant="soft" shape="round">Soft</Button>
          <Button variant="ghost" shape="round"><Send /> Send</Button>
          <Button size="icon" shape="round" aria-label="Add"><Plus /></Button>
          <Button size="icon-sm" variant="ghost" shape="round" aria-label="Settings"><Settings /></Button>
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-xs text-foreground/70">Round — all sizes</p>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs" shape="round">Extra small</Button>
          <Button size="sm" shape="round">Small</Button>
          <Button size="md" shape="round">Medium</Button>
          <Button size="lg" shape="round">Large</Button>
          <Button size="icon-xs" shape="round" aria-label="Add xs"><Plus /></Button>
          <Button size="icon-sm" shape="round" aria-label="Add sm"><Plus /></Button>
          <Button size="icon" shape="round" aria-label="Add"><Plus /></Button>
          <Button size="icon-lg" shape="round" aria-label="Add lg"><Plus /></Button>
        </div>
      </div>
    </div>
  ),
}

// ─── States ──────────────────────────────────────────────────────────────────

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-6">
      <div>
        <div className="mb-3 grid grid-cols-[6rem_1fr_1fr_1fr_1fr] gap-3 text-[10px] font-medium uppercase tracking-wide text-foreground/40">
          <span />
          <span>Normal</span>
          <span>Disabled</span>
          <span>Invalid</span>
          <span>Loading</span>
        </div>
        {([
          'action', 'primary', 'outline', 'soft', 'ghost', 'destructive',
        ] as const).map((variant) => (
          <div key={variant} className="grid grid-cols-[6rem_1fr_1fr_1fr_1fr] items-center gap-3 py-1">
            <span className="font-mono text-xs text-foreground/50">{variant}</span>
            <Button variant={variant}>Action</Button>
            <Button variant={variant} disabled>Action</Button>
            <Button variant={variant} aria-invalid="true">Action</Button>
            <Button variant={variant} loading>Action</Button>
          </div>
        ))}
        <div className="grid grid-cols-[6rem_1fr_1fr_1fr_1fr] items-center gap-3 py-1">
          <span className="font-mono text-xs text-foreground/50">link</span>
          <Button variant="link">Learn more</Button>
          <Button variant="link" disabled>Learn more</Button>
          <Button variant="link" aria-invalid="true">Learn more</Button>
          <span className="text-xs text-foreground/30">—</span>
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-foreground/70">Loading — icon-only</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-xs" loading aria-label="Loading" />
          <Button size="icon-sm" loading aria-label="Loading" />
          <Button size="icon" loading aria-label="Loading" />
          <Button size="icon-lg" loading aria-label="Loading" />
          <Button size="icon" variant="primary" loading aria-label="Loading" />
          <Button size="icon" variant="outline" loading aria-label="Loading" />
          <Button size="icon" variant="ghost" loading aria-label="Loading" />
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-xs text-foreground/70">
          Async feedback — success / error
        </p>
        <p className="mb-3 text-xs text-muted-foreground">
          Parent sets <span className="font-mono">status</span> after the async operation resolves, then clears it after a timeout.
          Used for AI operations, saves, submissions — anything with latency and an outcome.
        </p>
        <div className="space-y-2">
          {(['action', 'primary', 'outline', 'ghost'] as const).map((variant) => (
            <div key={variant} className="flex items-center gap-3">
              <span className="w-20 shrink-0 font-mono text-xs text-foreground/50">{variant}</span>
              <Button variant={variant} status="success">Save changes</Button>
              <Button variant={variant} status="error">Save changes</Button>
              <Button size="icon" variant={variant} status="success" aria-label="Saved" />
              <Button size="icon" variant={variant} status="error" aria-label="Failed" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

// ─── Full Width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  name: 'Full Width',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-80 space-y-2">
      <Button fullWidth>Continue</Button>
      <Button fullWidth variant="outline">Cancel</Button>
      <Button fullWidth variant="ghost" loading>Saving…</Button>
    </div>
  ),
}

// ─── asChild — polymorphic rendering ─────────────────────────────────────────

export const AsChild: Story = {
  name: 'asChild (as anchor)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button asChild>
        <a href="#" onClick={(e) => e.preventDefault()}>Action as anchor</a>
      </Button>
      <Button asChild variant="outline">
        <a href="#" onClick={(e) => e.preventDefault()}>Outline as anchor</a>
      </Button>
    </div>
  ),
}
