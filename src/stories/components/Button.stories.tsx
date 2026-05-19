import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import {
  ArrowRight,
  Check,
  ChevronDown,
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
  ChevronDown,
} as const

type IconName = keyof typeof ICON_MAP

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  // Wraps every story canvas in a bg-background box so docs canvases
  // show the correct background in both light and dark mode.
  decorators: [
    (Story) => (
      <div className="bg-background p-8 flex justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    shape: {
      control: 'inline-radio',
      options: ['square', 'round'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
    asChild: { table: { disable: true } },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    variant: 'default',
    size: 'default',
    shape: 'square',
    disabled: false,
    loading: false,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground — fully interactive via controls panel ───────────────────────

export const Playground: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { iconPosition: 'none', iconName: 'Plus' } as any,
  render(args) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { iconPosition, iconName, children, ...buttonProps } = args as any
    const IconComp = ICON_MAP[iconName as IconName] ?? Plus

    if (iconPosition === 'icon-only') {
      // Force a square icon size regardless of what the size control says
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
          {/* children replaced by spinner when loading=true */}
          <IconComp />
        </Button>
      )
    }

    return (
      <Button {...buttonProps}>
        {/* icons replaced by spinner + "Loading…" when loading=true */}
        {iconPosition === 'before' && <IconComp />}
        {children}
        {iconPosition === 'after' && <IconComp />}
      </Button>
    )
  },
}

// ─── Variants ────────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 font-mono text-xs text-muted-foreground">Normal</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-xs text-muted-foreground">Disabled</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default" disabled>Default</Button>
          <Button variant="accent" disabled>Accent</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="link" disabled>Link</Button>
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-xs text-muted-foreground">Icon only</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon" variant="default" aria-label="Add"><Plus /></Button>
          <Button size="icon" variant="accent" aria-label="Add"><Plus /></Button>
          <Button size="icon" variant="outline" aria-label="Add"><Plus /></Button>
          <Button size="icon" variant="secondary" aria-label="Add"><Plus /></Button>
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
        <p className="mb-3 font-mono text-xs text-muted-foreground">Text buttons</p>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Icon buttons</p>
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
      <Button variant="secondary" size="sm"><Plus /> Add</Button>
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
        <p className="mb-3 font-mono text-xs text-muted-foreground">Square (default — rounded-md)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Continue</Button>
          <Button variant="accent">Upgrade</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost"><Send /> Send</Button>
          <Button size="icon" aria-label="Add"><Plus /></Button>
          <Button size="icon-sm" variant="ghost" aria-label="Settings"><Settings /></Button>
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Round (rounded-full)</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default" shape="round">Continue</Button>
          <Button variant="accent" shape="round">Upgrade</Button>
          <Button variant="outline" shape="round">Cancel</Button>
          <Button variant="secondary" shape="round">Secondary</Button>
          <Button variant="ghost" shape="round"><Send /> Send</Button>
          <Button size="icon" shape="round" aria-label="Add"><Plus /></Button>
          <Button size="icon-sm" variant="ghost" shape="round" aria-label="Settings"><Settings /></Button>
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Round — all sizes</p>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs" shape="round">Extra small</Button>
          <Button size="sm" shape="round">Small</Button>
          <Button size="default" shape="round">Default</Button>
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
    <div className="space-y-4">
      <div>
        <p className="mb-2 font-mono text-xs text-muted-foreground">Normal / Disabled / Invalid / Loading</p>
        {(['default', 'accent', 'outline', 'destructive'] as const).map((variant) => (
          <div key={variant} className="mb-2 flex flex-wrap items-center gap-3">
            <Button variant={variant}>Normal</Button>
            <Button variant={variant} disabled>Disabled</Button>
            <Button variant={variant} aria-invalid="true">Invalid</Button>
            <Button variant={variant} loading>Save changes</Button>
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 font-mono text-xs text-muted-foreground">Loading — icon-only</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-xs" loading aria-label="Loading" />
          <Button size="icon-sm" loading aria-label="Loading" />
          <Button size="icon" loading aria-label="Loading" />
          <Button size="icon-lg" loading aria-label="Loading" />
          <Button size="icon" variant="accent" loading aria-label="Loading" />
          <Button size="icon" variant="outline" loading aria-label="Loading" />
          <Button size="icon" variant="ghost" loading aria-label="Loading" />
        </div>
      </div>
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
        <a href="#" onClick={(e) => e.preventDefault()}>Default as anchor</a>
      </Button>
      <Button asChild variant="outline">
        <a href="#" onClick={(e) => e.preventDefault()}>Outline as anchor</a>
      </Button>
    </div>
  ),
}
