import * as React from "react"

import { cn } from "@/lib/utils"

export interface ToggleButtonProps
  extends Omit<React.ComponentProps<"button">, "children" | "onToggle"> {
  /** Whether the button is in its expanded/selected state */
  active?: boolean
  /** Icon — always visible */
  icon: React.ReactNode
  /** Label — hidden when inactive, revealed when active */
  children: React.ReactNode
  /** Called on click with the new desired active value */
  onToggle?: (next: boolean) => void
}

/**
 * ToggleButton — collapses to icon-only when inactive, expands to icon + label when active.
 *
 * Inactive: icon + subtle outline border
 * Active:   icon + label + brand purple fill
 *
 * Uses `--transition-fast` (120ms ease-out) for color/border and
 * `--duration-normal` (180ms ease-out) for the width expansion so the
 * reveal feels deliberate without being slow.
 *
 * @example
 * const [active, setActive] = React.useState(false)
 * <ToggleButton icon={<MessageSquare />} active={active} onToggle={setActive}>
 *   Chat
 * </ToggleButton>
 */
function ToggleButton({
  active = false,
  icon,
  children,
  onToggle,
  className,
  onClick,
  ...props
}: ToggleButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e)
    if (!e.defaultPrevented) {
      onToggle?.(!active)
    }
  }

  return (
    <button
      data-slot="toggle-button"
      data-active={active || undefined}
      aria-pressed={active}
      onClick={handleClick}
      className={cn(
        // Layout — matches size="sm" button: h-7, text-[0.8rem]
        "inline-flex h-7 shrink-0 items-center justify-start rounded-md border px-2",
        "cursor-pointer select-none text-[0.8rem] font-medium outline-none",
        // Subtle press — half the normal button press
        "active:translate-y-[0.5px]",
        // Color + border transition (fast — 120ms)
        "[transition:background-color_var(--duration-fast)_var(--ease-out),border-color_var(--duration-fast)_var(--ease-out),color_var(--duration-fast)_var(--ease-out),transform_var(--duration-fast)_var(--ease-out)]",
        // Focus ring
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        // States
        active
          ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-border bg-transparent text-foreground hover:bg-muted dark:border-input dark:hover:bg-muted/50",
        className,
      )}
      {...props}
    >
      {/* Icon — decorative; label text is the accessible name */}
      <span aria-hidden="true" className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0">
        {icon}
      </span>

      {/* Label — grid 0fr→1fr is content-exact and perfectly symmetric:
           when one button collapses (1fr→0fr) at the same rate another
           expands (0fr→1fr), total group width stays constant.
           NOT aria-hidden so the text always provides the accessible name. */}
      <span
        className="grid overflow-hidden"
        style={{
          gridTemplateColumns: active ? "1fr" : "0fr",
          marginInlineStart: active ? "0.25rem" : "0",
          transition: [
            `grid-template-columns 160ms var(--ease-out)`,
            `margin-inline-start 160ms var(--ease-out)`,
          ].join(", "),
        }}
      >
        {/* Inner span defines the content width the grid column grows to */}
        <span
          className="overflow-hidden whitespace-nowrap"
          style={{
            opacity: active ? 1 : 0,
            transition: active
              ? `opacity 80ms var(--ease-out) 80ms`
              : `opacity 80ms var(--ease-out)`,
          }}
        >
          {children}
        </span>
      </span>
    </button>
  )
}

export { ToggleButton }
