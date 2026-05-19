import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowUp,
  Bot,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  CircleCheckBig,
  FileText,
  GitBranch,
  Globe,
  LayoutGrid,
  MessageSquare,
  Mic,
  MoreHorizontal,
  PanelLeft,
  Plus,
  Save,
  X,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ToggleButton } from '@/components/ui/toggle-button'

// ─── Atoms ───────────────────────────────────────────────────────────────────

function NuwaLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path fill="url(#nw_r0)" d="M39.9986 14.4403C39.9986 14.4858 39.9986 14.5378 39.9726 14.5833C40.0896 15.6686 39.8295 16.5719 39.2378 17.1633C38.62 17.7547 37.7226 18.0146 36.6367 17.8977C34.1071 17.7352 30.5566 15.792 27.3833 12.6271C24.1644 9.41024 22.1746 5.77092 22.0835 3.23639C22.012 2.19659 22.2461 1.34525 22.8378 0.779854C23.4036 0.188465 24.2554 -0.0454915 25.2959 0.0259951C25.3934 0 25.4584 0 25.556 0H36.4871C38.4249 0 39.9921 1.55971 39.9921 3.50285V14.4533L39.9986 14.4403Z" />
      <path fill="black" d="M7.54968 16.5134C7.1075 16.8253 3.22536 20.1072 7.19203 22.0049C11.8935 24.2599 14.9108 28.7116 16.608 32.3704C16.7511 32.5589 16.9201 35.4963 17.2648 36.6986C17.6549 38.0504 18.1101 39.0057 18.6629 39.4866C19.2611 40.0065 19.9439 40 20.0089 40C8.95428 39.987 0 31.0382 0 19.9967C0 16.7149 7.14001 16.7863 7.54968 16.5134Z" />
      <path fill="url(#nw_l1)" d="M12.6218 12.6336C10.8141 14.4403 8.88275 15.8375 7.08799 16.7538C7.07499 16.7603 7.06198 16.7668 7.04897 16.7733C5.28673 17.5597 3.74558 18.0276 2.77017 18.2226C0.975412 18.5865 0.273115 19.1389 0 19.5288C0.201585 10.2096 6.80187 2.46301 15.5806 0.47438C15.8407 0.428889 16.1008 0.383397 16.3609 0.337906C16.4259 0.331407 16.4584 0.31191 16.5495 0.337906C16.7901 0.454884 16.9787 0.597857 17.1672 0.786322C19.1766 2.79445 17.1412 8.09096 12.6218 12.6336Z" />
      <path fill="url(#nw_l2)" d="M19.9309 39.9935C8.90876 39.948 0 31.0187 0 19.9967C0 19.8278 0 19.6718 0.00650274 19.5158C0.286121 19.1259 0.99492 18.58 2.77017 18.2226C3.74558 18.0276 5.28673 17.5597 7.04897 16.7733C7.06198 16.7668 7.07498 16.7603 7.08799 16.7539C7.20504 16.6954 7.31559 16.6369 7.43264 16.5719C7.44564 16.5719 7.53668 16.5199 7.56269 16.5004C7.1205 16.8123 3.22536 20.1072 7.19203 22.0049C11.8935 24.2599 14.9108 28.7116 16.608 32.3704C16.7511 32.5589 17.9606 34.3656 18.3052 35.5678C18.6889 36.9196 20.1325 37.9984 20.6917 38.4793C21.1989 38.9212 19.7358 39.987 19.9309 39.9935Z" />
      <path fill="black" d="M0 19.5288C0 19.4443 0.00642829 19.3663 0.0128566 19.2819C0.0128566 19.3598 0.00642829 19.4378 0.00642829 19.5158C0.00642829 19.5223 0 19.5223 0 19.5288Z" />
      <path fill="black" d="M0.0126953 19.2819C0.0255519 19.0284 0.0448368 18.788 0.0641216 18.5605C0.0448368 18.801 0.0191236 19.0349 0.0126953 19.2819Z" />
      <path fill="url(#nw_l3)" d="M39.7121 23.2852C39.504 24.5589 39.1724 25.7937 38.7237 26.9765C35.973 34.3916 28.937 39.7271 20.6135 39.9805C20.581 39.987 20.542 39.987 20.503 39.987C20.3924 39.9935 20.2819 39.9935 20.1714 39.9935C20.0023 39.9935 19.8462 39.9935 19.6901 39.987C19.3 39.7076 18.7538 38.9992 18.3961 37.225C18.201 36.2502 17.7328 34.71 16.946 32.9488C16.9395 32.9358 16.933 32.9229 16.9265 32.9099C16.868 32.7929 16.8094 32.6824 16.7444 32.5654C16.7379 32.5524 16.7119 32.5004 16.6924 32.4614C17.1216 33.0333 20.3209 36.6856 22.1807 32.8059C24.4241 28.1267 28.9501 25.1893 32.6046 23.4931C32.6241 23.4801 32.6371 23.4736 32.6566 23.4671C32.6631 23.4606 32.6696 23.4541 32.6826 23.4476C35.5373 21.9074 38.0929 21.576 39.3544 22.8367C39.4975 22.9797 39.6146 23.1162 39.7121 23.2852Z" />
      <defs>
        <radialGradient id="nw_r0" cx="0" cy="0" r="1" gradientTransform="matrix(-11.6789 13.9641 -13.9672 -11.6672 35.7652 3.56783)" gradientUnits="userSpaceOnUse">
          <stop offset="0.405824" stopColor="#FF4400" />
          <stop offset="0.880461" stopColor="#E83E00" />
        </radialGradient>
        <linearGradient id="nw_l1" x1="17.0052" y1="-0.159951" x2="3.91196" y2="17.5478" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9C79FF" />
          <stop offset="0.240876" stopColor="#9C79FF" />
          <stop offset="1" stopColor="#AA92FF" />
        </linearGradient>
        <linearGradient id="nw_l2" x1="3.90165" y1="18.84" x2="13.6469" y2="35.7419" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E0A4B" />
          <stop offset="0.539287" stopColor="#9C79FF" />
          <stop offset="1" stopColor="#AA92FF" />
        </linearGradient>
        <linearGradient id="nw_l3" x1="20.4835" y1="37.0366" x2="36.4082" y2="25.0045" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3C0D61" />
          <stop offset="0.43603" stopColor="#9C79FF" />
          <stop offset="1" stopColor="#AA92FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Avatar({ initials, bg }: { initials: string; bg: string }) {
  return (
    <div
      className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
      style={{ backgroundColor: bg }}
    >
      {initials}
    </div>
  )
}

const NAV_ITEMS = [
  { icon: CircleCheckBig, label: 'New Task' },
  { icon: LayoutGrid,     label: 'AI Apps' },
  { icon: Bot,            label: 'Agents' },
  { icon: GitBranch,      label: 'Workflows' },
  { icon: Zap,            label: 'Skills' },
  { icon: BookOpen,       label: 'Knowledge' },
  { icon: MoreHorizontal, label: 'More' },
] as const

// ─── Layout ──────────────────────────────────────────────────────────────────

function DocumentViewLayout() {
  const [activeTab, setActiveTab] = React.useState<'chat' | 'docs'>('chat')

  return (
    <div className="flex flex-col overflow-hidden bg-background text-foreground antialiased" style={{ height: '100vh' }}>

      {/* ── Topbar ─────────────────────────────────────────────────────────── */}
      <header className="flex shrink-0 items-center gap-1 border-b border-border bg-background px-3" style={{ height: 'var(--topbar-height)' }}>

        {/* Brand */}
        <div className="flex items-center gap-0.5">
          <NuwaLogo />
          <span className="px-1.5 text-sm font-medium">Test Drive</span>
          <Button variant="ghost" size="icon-sm" aria-label="App menu">
            <ChevronDown />
          </Button>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
          <PanelLeft />
        </Button>

        <div className="mx-1.5 h-4 w-px shrink-0 bg-border" />

        {/* Centre: breadcrumb + view tabs */}
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Parent level">
            <ChevronDown />
          </Button>
          <span className="min-w-0 truncate text-sm font-medium">
            Project Proposal — Digital Transformation Initiative
          </span>
          <div className="ml-2 flex shrink-0 items-center gap-1">
            <ToggleButton
              icon={<MessageSquare />}
              active={activeTab === 'chat'}
              onToggle={() => setActiveTab('chat')}
              aria-label="Chat view"
            >
              Chat
            </ToggleButton>
            <ToggleButton
              icon={<BookOpen />}
              active={activeTab === 'docs'}
              onToggle={() => setActiveTab('docs')}
              aria-label="Docs view"
            >
              Docs
            </ToggleButton>
          </div>
        </div>

        {/* Right: page-level actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm">
            <Save /> Save version
          </Button>
          <Button variant="default" size="sm">
            Continue <ChevronDown />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreHorizontal />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Close">
            <X />
          </Button>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside className="flex shrink-0 flex-col overflow-y-auto border-r border-border bg-background" style={{ width: 'var(--sidebar-width)' }}>
          <nav className="flex flex-col gap-px px-2 pt-3">
            {NAV_ITEMS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-left text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Icon size={15} className="shrink-0 text-muted-foreground" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mx-3 my-3 h-px bg-border" />

          {/* Pinned */}
          <div className="px-2">
            <p className="mb-1 px-2.5 text-xs text-muted-foreground">Pinned</p>
            <div className="group flex items-center justify-between rounded-md px-2.5 py-[7px] hover:bg-muted">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <FileText size={14} className="shrink-0 text-primary" />
                Meeting Notes
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Unpin"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={12} />
              </Button>
            </div>
          </div>

          <div className="mx-3 my-3 h-px bg-border" />

          {/* Projects */}
          <div className="px-2">
            <div className="flex items-center justify-between px-2.5">
              <p className="text-xs text-muted-foreground">Projects</p>
              <Button variant="ghost" size="icon-xs" aria-label="New project">
                <Plus size={12} />
              </Button>
            </div>
          </div>

          {/* User footer */}
          <div className="mt-auto flex items-center justify-between border-t border-border px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <Avatar initials="OK" bg="#7C3AED" />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground leading-tight">
                  Oleksandra Kolesnikova
                </p>
                <p className="text-[10px] text-muted-foreground">Enterprise</p>
              </div>
            </div>
            <button
              aria-label="Help"
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/70"
            >
              ?
            </button>
          </div>
        </aside>

        {/* ── Centre — chat canvas ──────────────────────────────────────────── */}
        <main className="relative flex flex-1 flex-col overflow-hidden bg-background">

          {/* Collapse handle — round pill, floats against the panel edge */}
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Collapse right panel"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border border-border/60 bg-[var(--surface-elevated)] shadow-sm backdrop-blur-sm"
          >
            <ChevronLeft size={14} />
          </Button>

          {/* Floating chat input */}
          <div className="absolute bottom-6 left-1/2 w-[420px] -translate-x-1/2">
            <div className="rounded-2xl border border-border bg-card px-3 pb-3 pt-3 shadow-md">
              <p className="mb-3 text-sm text-muted-foreground">Describe your task...</p>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" aria-label="Attach">
                  <Plus />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Globe size={14} /> Web
                </Button>
                <div className="flex-1" />
                <Button variant="ghost" size="icon-sm" aria-label="Voice input">
                  <Mic />
                </Button>
                <Button variant="default" size="icon-sm" aria-label="Send message">
                  <ArrowUp />
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* ── Right panel — document viewer ────────────────────────────────── */}
        <aside className="relative flex w-[42%] min-w-[420px] shrink-0 flex-col bg-card">

          <div className="p-8 pb-4">
            <Avatar initials="SW" bg="#D6B16D" />
          </div>

          {/* Document card */}
          <div className="flex-1 px-8 pb-8">
            <div className="h-full rounded-xl border border-border/50 bg-[var(--surface-subtle)]" />
          </div>

          {/* Pager pill */}
          <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1 rounded-full border border-border/60 bg-[var(--surface-elevated)] px-3 py-4 shadow-sm backdrop-blur-sm">
            <Button variant="ghost" size="icon-xs" aria-label="Previous page">
              <ChevronUp size={12} />
            </Button>
            <span className="text-[11px] text-muted-foreground">1/5</span>
            <Button variant="ghost" size="icon-xs" aria-label="Next page">
              <ChevronDown size={12} />
            </Button>
          </div>

        </aside>

      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Layouts/Document View',
  component: DocumentViewLayout,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentViewLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  globals: { theme: 'light' },
}

export const Dark: Story = {
  globals: { theme: 'dark' },
}
