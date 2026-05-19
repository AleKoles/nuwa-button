import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const tokens = [
  { name: 'none', variable: '--radius-none', value: '0' },
  { name: 'sm',   variable: '--radius-sm',   value: '0.25rem / 4px' },
  { name: 'md',   variable: '--radius-md',   value: '0.5rem / 8px'  },
  { name: 'lg',   variable: '--radius-lg',   value: '0.75rem / 12px' },
  { name: 'xl',   variable: '--radius-xl',   value: '1rem / 16px'   },
  { name: 'full', variable: '--radius-full', value: '9999px'         },
]

export const Scale: Story = {
  name: 'Radius Scale',
  render: () => (
    <div className="flex flex-wrap gap-8">
      {tokens.map(({ name, variable, value }) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <div
            className="h-20 w-20 bg-primary"
            style={{ borderRadius: `var(${variable})` }}
          />
          <div className="space-y-0.5 text-center">
            <p className="text-xs font-medium text-foreground">{name}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{value}</p>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const InContext: Story = {
  name: 'In Context',
  render: () => (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        How radius tokens look applied to common UI shapes.
      </p>
      <div className="flex flex-wrap gap-4">
        {tokens.map(({ name, variable }) => (
          <div
            key={name}
            className="flex h-10 items-center border border-border bg-secondary px-4 text-sm font-medium text-secondary-foreground"
            style={{ borderRadius: `var(${variable})` }}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {tokens.map(({ name, variable }) => (
          <div
            key={name}
            className="flex h-10 w-10 items-center justify-center border border-border bg-muted text-xs text-muted-foreground"
            style={{ borderRadius: `var(${variable})` }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  ),
}
