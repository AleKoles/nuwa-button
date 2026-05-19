import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="border-b border-border pb-2 text-base font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </div>
  )
}

// ─── Stories ────────────────────────────────────────────────────────────────

const fontSizes = [
  { name: '3xl', variable: '--font-size-3xl', value: '1.875rem', px: '30px' },
  { name: '2xl', variable: '--font-size-2xl', value: '1.5rem', px: '24px' },
  { name: 'xl', variable: '--font-size-xl', value: '1.25rem', px: '20px' },
  { name: 'lg', variable: '--font-size-lg', value: '1.125rem', px: '18px' },
  { name: 'base', variable: '--font-size-base', value: '1rem', px: '16px' },
  { name: 'sm', variable: '--font-size-sm', value: '0.875rem', px: '14px' },
  { name: 'xs', variable: '--font-size-xs', value: '0.75rem', px: '12px' },
]

export const FontScale: Story = {
  name: 'Font Scale',
  render: () => (
    <div className="space-y-1">
      {fontSizes.map(({ name, variable, value, px }) => (
        <div
          key={name}
          className="flex items-baseline gap-6 border-b border-border py-3 last:border-0"
        >
          <div className="w-24 shrink-0 text-right">
            <span className="font-mono text-xs text-muted-foreground">
              {value} / {px}
            </span>
          </div>
          <p
            className="text-foreground"
            style={{ fontSize: `var(${variable})`, lineHeight: 'var(--line-height-normal)' }}
          >
            The quick brown fox
          </p>
          <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">
            {variable}
          </span>
        </div>
      ))}
    </div>
  ),
}

const fontWeights = [
  { name: 'normal', variable: '--font-weight-normal', value: '400' },
  { name: 'medium', variable: '--font-weight-medium', value: '500' },
  { name: 'semibold', variable: '--font-weight-semibold', value: '600' },
  { name: 'bold', variable: '--font-weight-bold', value: '700' },
]

export const FontWeights: Story = {
  name: 'Font Weights',
  render: () => (
    <div className="space-y-1">
      {fontWeights.map(({ name, variable, value }) => (
        <div
          key={name}
          className="flex items-baseline gap-6 border-b border-border py-3 last:border-0"
        >
          <div className="w-24 shrink-0 text-right">
            <span className="font-mono text-xs text-muted-foreground">{value}</span>
          </div>
          <p
            className="text-lg text-foreground"
            style={{ fontWeight: `var(${variable})` }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
          <span className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">
            {variable}
          </span>
        </div>
      ))}
    </div>
  ),
}

const lineHeights = [
  { name: 'tight', variable: '--line-height-tight', value: '1.25' },
  { name: 'normal', variable: '--line-height-normal', value: '1.5' },
  { name: 'relaxed', variable: '--line-height-relaxed', value: '1.75' },
]

export const LineHeights: Story = {
  name: 'Line Heights',
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {lineHeights.map(({ name, variable, value }) => (
        <div key={name} className="space-y-3">
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p
              className="text-sm text-foreground"
              style={{ lineHeight: `var(${variable})` }}
            >
              Paragraph text that wraps across multiple lines to demonstrate how the line height
              affects readability and vertical rhythm in real content.
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-foreground">{name}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{value}</p>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const TypePairings: Story = {
  name: 'Type Pairings',
  render: () => (
    <div className="space-y-8">
      <Section title="Heading + Body">
        <div className="space-y-6">
          <div className="rounded-lg border border-border p-6">
            <p
              className="text-foreground"
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: 'var(--line-height-tight)',
                marginBottom: '0.75rem',
              }}
            >
              Design system tokens
            </p>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-normal)',
                lineHeight: 'var(--line-height-relaxed)',
              }}
            >
              A single source of truth for all visual decisions. Semantic tokens abstract raw
              palette values so components stay consistent across themes and modes.
            </p>
          </div>

          <div className="rounded-lg border border-border p-6">
            <p
              className="text-foreground"
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: 'var(--line-height-tight)',
                marginBottom: '0.5rem',
              }}
            >
              Card title
            </p>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-normal)',
                lineHeight: 'var(--line-height-normal)',
              }}
            >
              Supporting description text that provides more context about the card content.
            </p>
          </div>
        </div>
      </Section>
    </div>
  ),
}
