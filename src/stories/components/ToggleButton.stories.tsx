import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { AlignJustify, BookOpen, Bot, MessageSquare, PanelLeft, Search } from 'lucide-react'

import { ToggleButton } from '@/components/ui/toggle-button'

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'var(--background)',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    active:   { control: 'boolean' },
    children: { control: 'text' },
    icon:     { table: { disable: true } },
    onToggle: { table: { disable: true } },
  },
  args: {
    active: false,
    children: 'Chat',
    icon: <MessageSquare />,
    onToggle: fn(),
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToggleButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── Interactive — click to toggle ───────────────────────────────────────────

function ControlledToggle({
  defaultActive,
  icon,
  label,
}: {
  defaultActive?: boolean
  icon: React.ReactNode
  label: string
}) {
  const [active, setActive] = React.useState(defaultActive ?? false)
  return (
    <ToggleButton icon={icon} active={active} onToggle={setActive}>
      {label}
    </ToggleButton>
  )
}

export const Interactive: Story = {
  name: 'Interactive (click to toggle)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <ControlledToggle icon={<MessageSquare />} label="Chat" defaultActive />
      <ControlledToggle icon={<BookOpen />} label="Docs" />
      <ControlledToggle icon={<Bot />} label="Agent" />
    </div>
  ),
}

// ─── States ──────────────────────────────────────────────────────────────────

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 font-mono text-xs text-muted-foreground">Inactive (icon only)</p>
        <div className="flex items-center gap-2">
          <ToggleButton icon={<MessageSquare />} active={false}>Chat</ToggleButton>
          <ToggleButton icon={<BookOpen />} active={false}>Docs</ToggleButton>
          <ToggleButton icon={<PanelLeft />} active={false}>Outline</ToggleButton>
          <ToggleButton icon={<AlignJustify />} active={false}>List</ToggleButton>
          <ToggleButton icon={<Search />} active={false}>Search</ToggleButton>
        </div>
      </div>
      <div>
        <p className="mb-2 font-mono text-xs text-muted-foreground">Active (icon + label)</p>
        <div className="flex items-center gap-2">
          <ToggleButton icon={<MessageSquare />} active>Chat</ToggleButton>
          <ToggleButton icon={<BookOpen />} active>Docs</ToggleButton>
          <ToggleButton icon={<PanelLeft />} active>Outline</ToggleButton>
          <ToggleButton icon={<AlignJustify />} active>List</ToggleButton>
          <ToggleButton icon={<Search />} active>Search</ToggleButton>
        </div>
      </div>
    </div>
  ),
}

// ─── In a tab group ──────────────────────────────────────────────────────────

function TabGroup() {
  const tabs = [
    { id: 'chat',    icon: <MessageSquare />, label: 'Chat' },
    { id: 'docs',    icon: <BookOpen />,      label: 'Docs' },
    { id: 'outline', icon: <PanelLeft />,     label: 'Outline' },
  ] as const

  const [active, setActive] = React.useState<string>('chat')

  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab) => (
        <ToggleButton
          key={tab.id}
          icon={tab.icon}
          active={active === tab.id}
          onToggle={() => setActive(tab.id)}
        >
          {tab.label}
        </ToggleButton>
      ))}
    </div>
  )
}

export const TabGroupExample: Story = {
  name: 'Tab group (mutually exclusive)',
  parameters: { controls: { disable: true } },
  render: () => <TabGroup />,
}
