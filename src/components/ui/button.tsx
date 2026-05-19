import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap [transition:var(--transition-fast)] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-[0.5px] disabled:pointer-events-none disabled:opacity-50 data-[loading=true]:opacity-100 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Primary action — high-contrast black/white fill. Use for the single most important action on a surface. */
        default: "bg-action text-action-foreground hover:bg-action/90",
        /** Brand accent — purple fill. Use for feature actions, active navigation states, and brand-flavoured CTAs. */
        accent: "bg-primary text-primary-foreground hover:bg-primary/90",
        /** Secondary action — bordered, no fill. Use alongside default for less prominent actions. */
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:text-foreground dark:hover:bg-input/50",
        /** Tertiary action — subtle fill using secondary surface token. */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        /** Ghost — no background until hovered. Use in toolbars, sidebars, tight layouts. */
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        /** Destructive action — red tint. Completely WCAG AA compliant across themes. */
        destructive:
          "bg-destructive-subtle text-destructive-text border border-destructive-border hover:bg-[#FEE2E2] dark:hover:bg-[#5C3335] focus-visible:border-destructive-border focus-visible:ring-destructive/20",
        /** Inline link — no background, underline on hover. Use inside prose or as a text action. */
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        /** 32px tall — standard UI button. */
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        /** 24px tall — dense UIs, table rows, tags. */
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        /** 28px tall — slightly compact, sidebars, secondary actions. */
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        /** 36px tall — prominent CTAs, hero sections. */
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
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
      variant: "default",
      size: "default",
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
 * <Button variant="accent">Docs</Button>
 * <Button variant="outline">Cancel</Button>
 * <Button variant="destructive"><Trash2 /> Delete</Button>
 *
 * // Loading state — spinner replaces content; blocked for interaction
 * <Button loading>Save changes</Button>
 * <Button size="icon" loading aria-label="Saving" />
 *
 * // Pill shape — fully rounded corners
 * <Button shape="round">Send</Button>
 * <Button shape="round" size="icon" aria-label="Add"><Plus /></Button>
 *
 * // Icon-only (always include aria-label)
 * <Button size="icon" aria-label="Add item"><Plus /></Button>
 *
 * // Polymorphic — render as <a> or Next.js <Link>
 * <Button asChild><Link href="/dashboard">Go to dashboard</Link></Button>
 */
function Button({
  className,
  variant = "default",
  size = "default",
  shape = "square",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner and blocks interaction. Icon-only sizes show only the spinner; text sizes show spinner + "Loading…". */
    loading?: boolean
  }) {
  // asChild + loading is unsupported — Slot can't merge loading content with an arbitrary child element
  const Comp = asChild && !loading ? Slot.Root : "button"
  const isIconSize = ICON_SIZES.has(size ?? "default")

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    >
      {loading ? (
        isIconSize ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Loader2 className="animate-spin" />
            Loading…
          </>
        )
      ) : (
        children
      )}
    </Comp>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
