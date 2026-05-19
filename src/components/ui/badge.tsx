import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-3',
  {
    variants: {
      variant: {
        /** Brand fill — labels, tags, counts. Use for primary categorisation. */
        default:
          'border-transparent bg-primary text-primary-foreground',
        /** Subtle fill using secondary surface. Use for secondary or inactive labels. */
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',
        /** No fill, bordered. Use when the badge must not compete with surrounding colour. */
        outline:
          'border-border text-foreground',
        /** Red tint. Use for errors, failed states, blocked items. */
        destructive:
          'border-transparent bg-destructive/15 text-destructive dark:bg-destructive/25',
        /** Green tint. Use for passing checks, active status, completed steps. */
        success:
          'border-transparent bg-[var(--color-success)]/15 text-[var(--color-success)]',
        /** Amber tint. Use for warnings, pending items, degraded states. */
        warning:
          'border-transparent bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/**
 * Badge — non-interactive label for status, category, or count.
 *
 * @example
 * <Badge>New</Badge>
 * <Badge variant="success">Passed</Badge>
 * <Badge variant="destructive">Failed</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="outline">Draft</Badge>
 */
function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
