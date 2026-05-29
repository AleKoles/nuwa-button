import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Loader2 } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap [transition:var(--transition-fast)] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-[0.5px] data-[pressing]:translate-y-[0.5px] disabled:pointer-events-none disabled:opacity-50 data-[loading=true]:opacity-100 data-[status]:opacity-100 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-[status=success]:bg-success/10 data-[status=success]:text-success data-[status=success]:border-success/20 data-[status=error]:animate-button-shake [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Primary action — high-contrast black/white fill. Use for the single most important action on a surface. */
        action: "bg-action text-action-foreground hover:bg-action/90",
        /** Brand purple fill. Use for feature actions, active navigation states, and brand-flavoured CTAs. */
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        /** Bordered, no fill. Use alongside action for less prominent actions. */
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:text-foreground dark:hover:bg-input/50",
        /** Soft tinted surface — sits between outline and ghost in visual weight. Use for filters, chips, contextual actions. */
        soft:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        /** No background until hovered. Use in toolbars, sidebars, tight layouts. */
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        /** Destructive action — red tint, WCAG AA compliant. Always pair with a confirmation step. */
        destructive:
          "bg-destructive-subtle text-destructive-text border border-destructive-border hover:bg-destructive-subtle-hover focus-visible:border-destructive-border focus-visible:ring-destructive/20",
        /** Inline link — no background, underline on hover. Use inside prose or as a low-hierarchy text action. */
        link: "text-link underline-offset-4 hover:underline",
      },
      size: {
        /** 24px tall — dense UIs, table rows, tags. */
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        /** 28px tall — slightly compact, sidebars, secondary actions. */
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        /** 32px tall — standard UI button. */
        md: "h-8 gap-1.5 px-2.5",
        /** 36px tall — prominent CTAs, hero sections. */
        lg: "h-9 gap-1.5 px-2.5",
        /** 32×32px square — icon-only, standard. Always add aria-label. */
        icon: "size-8",
        /** 24×24px square — icon-only, dense. */
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        /** 28×28px square — icon-only, compact. */
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        /** 36×36px square — icon-only, prominent. */
        "icon-lg": "size-9",
      },
      shape: {
        /** Default — 8px radius, matches the system rounded-md scale. */
        square: "rounded-md",
        /** Pill — fully rounded corners. Use for floating actions, tags, or a softer visual language. */
        round: "rounded-full",
      },
    },
    compoundVariants: [
      // xs / icon-xs use rounded-[min(var(--radius-md),10px)] — override for pill shape
      { shape: "round", size: "xs",      class: "rounded-full" },
      { shape: "round", size: "icon-xs", class: "rounded-full" },
      // sm / icon-sm use rounded-[min(var(--radius-md),12px)] — override for pill shape
      { shape: "round", size: "sm",      class: "rounded-full" },
      { shape: "round", size: "icon-sm", class: "rounded-full" },
    ],
    defaultVariants: {
      variant: "action",
      size: "md",
      shape: "square",
    },
  }
)

const ICON_SIZES = new Set(["icon", "icon-xs", "icon-sm", "icon-lg"])

/**
 * Button — primary interactive element.
 *
 * @example
 * // Most common usage
 * <Button>Save changes</Button>
 * <Button variant="primary">Upgrade</Button>
 * <Button variant="outline">Cancel</Button>
 * <Button variant="destructive"><Trash2 /> Delete</Button>
 *
 * // Loading state — spinner replaces content; blocked for interaction
 * <Button loading>Save changes</Button>
 * <Button size="icon" loading aria-label="Saving" />
 *
 * // Async feedback — parent controls the reset timeout
 * <Button status="success">Save changes</Button>
 * <Button status="error">Save changes</Button>
 *
 * // Full width
 * <Button fullWidth>Continue</Button>
 *
 * // Pill shape
 * <Button shape="round">Send</Button>
 *
 * // Icon-only (always include aria-label)
 * <Button size="icon" aria-label="Add item"><Plus /></Button>
 *
 * // Polymorphic — render as <a> or Next.js <Link>
 * <Button asChild><Link href="/dashboard">Go to dashboard</Link></Button>
 */
function Button({
  className,
  variant = "action",
  size = "md",
  shape = "square",
  asChild = false,
  loading = false,
  status,
  fullWidth = false,
  disabled,
  children,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner and blocks interaction. Icon-only sizes show only the spinner; text sizes show spinner + "Loading…". */
    loading?: boolean
    /**
     * Async feedback state after an action resolves. Parent manages the reset timeout.
     * - `success` — brief checkmark, then parent clears to undefined
     * - `error`   — shake animation + red tint, then parent clears to undefined
     */
    status?: "success" | "error"
    /** Stretch the button to fill its container width. */
    fullWidth?: boolean
  }) {
  // asChild + loading/status is unsupported — Slot can't merge feedback content with an arbitrary child
  const Comp = asChild && !loading && !status ? Slot.Root : "button"
  const isIconSize = ICON_SIZES.has(size ?? "md")
  const isBusy = loading || !!status

  // Mirror the CSS active:translate-y for keyboard activation (Enter/Space).
  // `:active` resolves in the same frame as the click on keyboard, so the
  // 120ms transition never runs without this explicit data attribute.
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(e)
    if ((e.key === "Enter" || e.key === " ") && !e.currentTarget.getAttribute("aria-haspopup")) {
      e.currentTarget.setAttribute("data-pressing", "true")
    }
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyUp?.(e)
    e.currentTarget.removeAttribute("data-pressing")
  }

  function handleBlur(e: React.FocusEvent<HTMLButtonElement>) {
    onBlur?.(e)
    e.currentTarget.removeAttribute("data-pressing")
  }

  function renderContent() {
    if (status === "success") {
      return isIconSize ? <Check /> : <><Check />Saved</>
    }
    if (loading) {
      return isIconSize
        ? <Loader2 className="animate-spin" />
        : <><Loader2 className="animate-spin" />Loading…</>
    }
    return children
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-loading={loading || undefined}
      data-status={status ?? undefined}
      aria-busy={isBusy || undefined}
      disabled={disabled || isBusy}
      className={cn(
        buttonVariants({ variant, size, shape }),
        fullWidth && "w-full",
        className,
      )}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      {...props}
    >
      {renderContent()}
    </Comp>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
