import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Foundations/Motion',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── Demo components ─────────────────────────────────────────────────────────

function DurationDemo({
  variable,
  label,
  value,
}: {
  variable: string
  label: string
  value: string
}) {
  const [active, setActive] = React.useState(false)

  return (
    <div className="space-y-3">
      <div
        className="relative h-12 w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-muted"
        onClick={() => setActive((a) => !a)}
      >
        <div
          className="absolute top-1 h-10 w-10 rounded-md bg-primary"
          style={{
            left: active ? 'calc(100% - 2.75rem)' : '0.25rem',
            transition: `left ${variable} var(--ease-in-out)`,
          }}
        />
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{value}</p>
      </div>
      <p className="text-[10px] text-muted-foreground">Click to toggle</p>
    </div>
  )
}

function EasingDemo({
  durationVar,
  easingVar,
  label,
  value,
}: {
  durationVar: string
  easingVar: string
  label: string
  value: string
}) {
  const [active, setActive] = React.useState(false)

  return (
    <div className="space-y-3">
      <div
        className="relative h-12 w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-muted"
        onClick={() => setActive((a) => !a)}
      >
        <div
          className="absolute top-1 h-10 w-10 rounded-md bg-accent"
          style={{
            left: active ? 'calc(100% - 2.75rem)' : '0.25rem',
            transition: `left ${durationVar} ${easingVar}`,
          }}
        />
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{easingVar}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{value}</p>
      </div>
      <p className="text-[10px] text-muted-foreground">Click to toggle</p>
    </div>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Duration: Story = {
  name: 'Duration',
  render: () => (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Three durations cover the full range of UI transitions. Click each track to see the
        difference.
      </p>
      <div className="grid grid-cols-3 gap-6">
        <DurationDemo
          variable="var(--duration-fast)"
          label="fast"
          value="120ms — micro-interactions, hover states"
        />
        <DurationDemo
          variable="var(--duration-normal)"
          label="normal"
          value="200ms — most transitions"
        />
        <DurationDemo
          variable="var(--duration-slow)"
          label="slow"
          value="320ms — panels, modals, large motion"
        />
      </div>
    </div>
  ),
}

export const Easing: Story = {
  name: 'Easing',
  render: () => (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Easing curves control the feel of motion. All three use{' '}
        <span className="font-mono text-xs">--duration-normal</span>.
      </p>
      <div className="grid grid-cols-3 gap-6">
        <EasingDemo
          durationVar="var(--duration-normal)"
          easingVar="var(--ease-in)"
          label="ease-in"
          value="cubic-bezier(0.4, 0, 1, 1) — exits"
        />
        <EasingDemo
          durationVar="var(--duration-normal)"
          easingVar="var(--ease-out)"
          label="ease-out"
          value="cubic-bezier(0, 0, 0.2, 1) — entrances"
        />
        <EasingDemo
          durationVar="var(--duration-normal)"
          easingVar="var(--ease-in-out)"
          label="ease-in-out"
          value="cubic-bezier(0.4, 0, 0.2, 1) — repositions"
        />
      </div>
    </div>
  ),
}

export const Tokens: Story = {
  name: 'Token Reference',
  render: () => (
    <div className="space-y-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-2 font-semibold text-foreground">Token</th>
            <th className="pb-2 font-semibold text-foreground">Value</th>
            <th className="pb-2 font-semibold text-foreground">Use for</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            ['--duration-fast',   '120ms',                           'Hover states, micro-interactions'],
            ['--duration-normal', '180ms',                           'Most UI transitions'],
            ['--duration-slow',   '320ms',                           'Panels, modals, large motion'],
            ['--ease-in',         'cubic-bezier(0.4, 0, 1, 1)',      'Elements leaving the screen'],
            ['--ease-out',        'cubic-bezier(0, 0, 0.2, 1)',      'Elements entering the screen'],
            ['--ease-in-out',     'cubic-bezier(0.4, 0, 0.2, 1)',    'Elements repositioning in-place'],
          ].map(([token, value, use]) => (
            <tr key={token}>
              <td className="py-2.5 font-mono text-xs text-foreground">{token}</td>
              <td className="py-2.5 font-mono text-xs text-muted-foreground">{value}</td>
              <td className="py-2.5 text-xs text-muted-foreground">{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
