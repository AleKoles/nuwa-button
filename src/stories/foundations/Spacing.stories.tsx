import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const tokens = [
  { name: 'space-0-5', variable: '--space-0-5', value: '0.125rem', px: '2px'  },
  { name: 'space-1',   variable: '--space-1',   value: '0.25rem',  px: '4px'  },
  { name: 'space-1-5', variable: '--space-1-5', value: '0.375rem', px: '6px'  },
  { name: 'space-2',   variable: '--space-2',   value: '0.5rem',   px: '8px'  },
  { name: 'space-2-5', variable: '--space-2-5', value: '0.625rem', px: '10px' },
  { name: 'space-3',   variable: '--space-3',   value: '0.75rem',  px: '12px' },
  { name: 'space-4',   variable: '--space-4',   value: '1rem',     px: '16px' },
  { name: 'space-5',   variable: '--space-5',   value: '1.25rem',  px: '20px' },
  { name: 'space-6',   variable: '--space-6',   value: '1.5rem',   px: '24px' },
  { name: 'space-8',   variable: '--space-8',   value: '2rem',     px: '32px' },
  { name: 'space-10',  variable: '--space-10',  value: '2.5rem',   px: '40px' },
  { name: 'space-12',  variable: '--space-12',  value: '3rem',     px: '48px' },
  { name: 'space-16',  variable: '--space-16',  value: '4rem',     px: '64px' },
]

export const Scale: Story = {
  name: 'Spacing Scale',
  render: () => (
    <div className="space-y-3">
      {tokens.map(({ name, variable, value, px }) => (
        <div key={name} className="flex items-center gap-4">
          <div className="w-20 shrink-0 text-right">
            <span className="font-mono text-xs text-muted-foreground">{value}</span>
          </div>
          <div
            className="shrink-0 rounded bg-primary"
            style={{ width: `var(${variable})`, height: '24px' }}
          />
          <div className="flex gap-3">
            <span className="font-mono text-xs font-medium text-foreground">{variable}</span>
            <span className="font-mono text-xs text-muted-foreground">{px}</span>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Applied: Story = {
  name: 'Applied Spacing',
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Padding (inner space)</p>
        <div className="flex flex-wrap gap-4">
          {tokens.slice(0, 6).map(({ name, variable }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="rounded-lg border border-dashed border-primary/50 bg-primary/10"
                style={{ padding: `var(${variable})` }}
              >
                <div className="h-8 w-8 rounded bg-primary" />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Gap (between elements)</p>
        <div className="flex flex-col gap-4">
          {tokens.slice(0, 5).map(({ name, variable }) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-20 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {name}
              </span>
              <div className="flex" style={{ gap: `var(${variable})` }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-6 w-16 rounded bg-secondary" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
