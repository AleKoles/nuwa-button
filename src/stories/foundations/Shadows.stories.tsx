import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Foundations/Shadows',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const tokens = [
  { name: 'sm', variable: '--shadow-sm', value: '0 1px 2px rgba(0,0,0,0.05)',     label: 'Subtle — inputs, buttons' },
  { name: 'md', variable: '--shadow-md', value: '0 4px 12px rgba(0,0,0,0.08)',    label: 'Cards, popovers'          },
  { name: 'lg', variable: '--shadow-lg', value: '0 10px 30px rgba(0,0,0,0.12)',   label: 'Dropdowns, floating UI'   },
  { name: 'xl', variable: '--shadow-xl', value: '0 20px 50px rgba(0,0,0,0.18)',   label: 'Modals, dialogs'          },
]

export const Scale: Story = {
  name: 'Shadow Scale',
  render: () => (
    <div className="flex flex-wrap gap-10 p-4">
      {tokens.map(({ name, variable, value, label }) => (
        <div key={name} className="flex flex-col items-center gap-4">
          <div
            className="h-24 w-40 rounded-xl bg-card"
            style={{ boxShadow: `var(${variable})` }}
          />
          <div className="space-y-0.5 text-center">
            <p className="text-sm font-medium text-foreground">shadow-{name}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
            <p className="font-mono text-[10px] text-muted-foreground/60">{value}</p>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const OnDark: Story = {
  name: 'On Dark Background',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div className="dark flex flex-wrap gap-10 rounded-xl bg-background p-8">
      {tokens.map(({ name, variable }) => (
        <div key={name} className="flex flex-col items-center gap-4">
          <div
            className="h-24 w-40 rounded-xl bg-card"
            style={{ boxShadow: `var(${variable})` }}
          />
          <p className="font-mono text-xs text-muted-foreground">shadow-{name}</p>
        </div>
      ))}
    </div>
  ),
}
