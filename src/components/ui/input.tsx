import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full rounded-lg border border-input bg-background text-foreground shadow-sm transition-all outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      size: {
        /** 28px tall — dense forms, table-inline editing, filter bars. */
        sm: 'h-7 px-2.5 text-xs',
        /** 36px tall — standard form fields. */
        default: 'h-9 px-3 text-sm',
        /** 44px tall — prominent inputs, landing pages, search bars. */
        lg: 'h-11 px-4 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

/**
 * Input — single-line text field.
 *
 * Set `aria-invalid="true"` to trigger the error ring. Works with all native
 * input types (text, email, password, search, number, etc.).
 *
 * @example
 * <Input placeholder="Email address" type="email" />
 * <Input size="sm" placeholder="Search…" type="search" />
 * <Input aria-invalid="true" defaultValue="bad@value" />
 */
function Input({
  className,
  size,
  type = 'text',
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
