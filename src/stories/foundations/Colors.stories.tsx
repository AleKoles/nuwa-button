import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── Helpers ────────────────────────────────────────────────────────────────

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

function SwatchGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">{children}</div>
  )
}

function Swatch({ label, variable, hex }: { label: string; variable: string; hex?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-14 w-full rounded-lg border border-black/10"
        style={{ background: `var(${variable})` }}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
        {hex && <p className="font-mono text-[10px] text-muted-foreground">{hex}</p>}
      </div>
    </div>
  )
}

function SemanticPair({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div
        className="flex h-14 items-center justify-center"
        style={{ background: `var(${bg})`, color: `var(${fg})` }}
      >
        <span className="font-mono text-xs font-semibold">Aa</span>
      </div>
      <div className="space-y-0.5 bg-card p-2">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{bg}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{fg}</p>
      </div>
    </div>
  )
}

// ─── Stories ────────────────────────────────────────────────────────────────

export const Primitives: Story = {
  name: 'Primitive Tokens',
  render: () => (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Raw palette values. Never use directly in components — always go through semantic tokens.
      </p>

      <Section title="Brand — Purple">
        <SwatchGrid>
          <Swatch label="Purple 900" variable="--color-purple-900" hex="#2D1B69" />
          <Swatch label="Purple 700" variable="--color-purple-700" hex="#6D28D9" />
          <Swatch label="Purple 600" variable="--color-purple-600" hex="#7C3AED" />
          <Swatch label="Purple 400" variable="--color-purple-400" hex="#A78BFA" />
          <Swatch label="Purple 300" variable="--color-purple-300" hex="#C4B5FD" />
          <Swatch label="Purple 100" variable="--color-purple-100" hex="#EDE9FE" />
        </SwatchGrid>
      </Section>

      <Section title="Brand — Orange">
        <SwatchGrid>
          <Swatch label="Orange 500" variable="--color-orange-500" hex="#F97316" />
          <Swatch label="Orange 100" variable="--color-orange-100" hex="#FFEDD5" />
        </SwatchGrid>
      </Section>

      <Section title="Neutral — Light">
        <SwatchGrid>
          <Swatch label="White" variable="--color-white" hex="#FFFFFF" />
          <Swatch label="Neutral 100" variable="--color-neutral-100" hex="#ECECEC" />
          <Swatch label="Neutral 200" variable="--color-neutral-200" hex="#E5E7EB" />
          <Swatch label="Neutral 300" variable="--color-neutral-300" hex="#D1D5DB" />
          <Swatch label="Neutral 400" variable="--color-neutral-400" hex="#9CA3AF" />
          <Swatch label="Neutral 500" variable="--color-neutral-500" hex="#6B7280" />
          <Swatch label="Neutral 700" variable="--color-neutral-700" hex="#4B5563" />
          <Swatch label="Neutral 900" variable="--color-neutral-900" hex="#1A1A2E" />
          <Swatch label="Neutral 950" variable="--color-neutral-950" hex="#0A0A0A" />
        </SwatchGrid>
      </Section>

      <Section title="Warm — Light Surfaces">
        <SwatchGrid>
          <Swatch label="Warm 50" variable="--color-warm-50" hex="#F6F6F4" />
          <Swatch label="Warm 100" variable="--color-warm-100" hex="#F3F3F1" />
          <Swatch label="Warm 200" variable="--color-warm-200" hex="#EBEAE6" />
          <Swatch label="Warm Border" variable="--color-warm-border" hex="#E8E8E5" />
        </SwatchGrid>
      </Section>

      <Section title="Dark Surfaces">
        <SwatchGrid>
          <Swatch label="Dark 950" variable="--color-dark-950" hex="#232426" />
          <Swatch label="Dark 900" variable="--color-dark-900" hex="#2A2B2E" />
          <Swatch label="Dark 800" variable="--color-dark-800" hex="#323438" />
          <Swatch label="Dark Border" variable="--color-dark-border" hex="#3A3C40" />
        </SwatchGrid>
      </Section>

      <Section title="Status">
        <SwatchGrid>
          <Swatch label="Error" variable="--color-error" hex="#EF4444" />
          <Swatch label="Success" variable="--color-success" hex="#22C55E" />
          <Swatch label="Warning" variable="--color-warning" hex="#F59E0B" />
        </SwatchGrid>
      </Section>
    </div>
  ),
}

function SemanticSwatch({ label, variable }: { label: string; variable: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-10 w-full rounded-lg border border-black/10"
        style={{ background: `var(${variable})` }}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
      </div>
    </div>
  )
}

export const Semantic: Story = {
  name: 'Semantic Tokens',
  render: () => (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Semantic tokens adapt between light and dark mode. Use the toolbar to toggle dark mode.
        Always use these in components — never reference primitives directly.
      </p>

      <Section title="Core Surfaces">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <SemanticPair label="background / foreground" bg="--background" fg="--foreground" />
          <SemanticPair label="card / card-foreground" bg="--card" fg="--card-foreground" />
          <SemanticPair label="popover / popover-foreground" bg="--popover" fg="--popover-foreground" />
          <SemanticPair label="muted / muted-foreground" bg="--muted" fg="--muted-foreground" />
        </div>
      </Section>

      <Section title="Surface Hierarchy">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <SemanticSwatch label="surface-base" variable="--surface-base" />
          <SemanticSwatch label="surface-panel" variable="--surface-panel" />
          <SemanticSwatch label="surface-subtle" variable="--surface-subtle" />
          <SemanticSwatch label="surface-elevated" variable="--surface-elevated" />
          <SemanticSwatch label="surface-hover" variable="--surface-hover" />
        </div>
      </Section>

      <Section title="Actions">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <SemanticPair label="action — high-contrast CTA" bg="--action" fg="--action-foreground" />
          <SemanticPair label="primary — brand purple" bg="--primary" fg="--primary-foreground" />
          <SemanticPair label="secondary — purple tint" bg="--secondary" fg="--secondary-foreground" />
          <SemanticPair label="destructive" bg="--destructive" fg="--destructive-foreground" />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          action = black in light mode, white in dark. primary = purple. Use action for primary CTAs,
          primary for selection/active states.
        </p>
      </Section>

      <Section title="Active States">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <SemanticPair label="active-bg / active-fg" bg="--active-bg" fg="--active-fg" />
          <SemanticPair label="surface-active" bg="--surface-active" fg="--foreground" />
        </div>
      </Section>

      <Section title="Form & Focus">
        <SwatchGrid>
          <SemanticSwatch label="border" variable="--border" />
          <SemanticSwatch label="input" variable="--input" />
          <SemanticSwatch label="ring (focus)" variable="--ring" />
        </SwatchGrid>
      </Section>
    </div>
  ),
}
