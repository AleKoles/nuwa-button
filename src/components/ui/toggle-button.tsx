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
        // Layout
        "inline-flex h-8 shrink-0 items-center justify-start rounded-md border px-2",
        "cursor-pointer select-none text-sm font-medium outline-none",
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
      {/* Icon — always visible, fixed square */}
      <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        {icon}
      </span>

      {/* Label — width opens first (invisible), then text fades in.
           Collapse reverses: text fades out first, then width closes. */}
      <span
        aria-hidden={!active}
        className="overflow-hidden whitespace-nowrap"
        style={{
          maxWidth: active ? "10rem" : "0",
          marginInlineStart: active ? "0.375rem" : "0",
          opacity: active ? 1 : 0,
          transition: active
            ? [
                // Expand: width + gap open immediately
                `max-width var(--duration-normal) var(--ease-out)`,
                `margin-inline-start var(--duration-normal) var(--ease-out)`,
                // Text fades in after the space is mostly open (80ms delay)
                `opacity 80ms var(--ease-out) 80ms`,
              ].join(", ")
            : [
                // Collapse: text fades out first (80ms)
                `opacity 80ms var(--ease-out)`,
                // Then width + gap close
                `max-width var(--duration-normal) var(--ease-out) 60ms`,
                `margin-inline-start var(--duration-normal) var(--ease-out) 60ms`,
              ].join(", "),
        }}
      >
        {children}
      </span>
    </button>
  )
}

export { ToggleButton }
