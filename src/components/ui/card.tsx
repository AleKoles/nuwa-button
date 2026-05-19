import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Card — surface container for grouped content.
 *
 * Use the compound sub-components for consistent internal layout:
 * - `CardHeader` — top section, typically holds title + description
 * - `CardTitle` — h3-level heading inside the header
 * - `CardDescription` — supporting text in muted colour
 * - `CardContent` — main body of the card
 * - `CardFooter` — bottom row, typically holds actions
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Plan details</CardTitle>
 *     <CardDescription>Your current subscription</CardDescription>
 *   </CardHeader>
 *   <CardContent>…</CardContent>
 *   <CardFooter>
 *     <Button variant="outline">Cancel</Button>
 *     <Button>Upgrade</Button>
 *   </CardFooter>
 * </Card>
 */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('text-lg font-semibold leading-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-3 p-6 pt-0', className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
