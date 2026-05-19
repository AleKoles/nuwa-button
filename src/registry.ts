/**
 * registry.ts — machine-readable catalogue of all components in this design system.
 *
 * Intended for AI assistants, code generators, and tooling that need to know
 * what components exist, what props they accept, and when to use each.
 *
 * NOT imported at runtime — tree-shaken or used via static analysis only.
 */

export type ComponentEntry = {
  /** Import path from the package root */
  from: string
  /** Named exports from that module */
  exports: string[]
  /** Plain-English description for AI context */
  description: string
  /** Available variant/size values and their purpose */
  variants?: Record<string, Record<string, string>>
  /** When to reach for this component */
  useCases: string[]
  /** When NOT to use this component */
  avoid?: string[]
  /** Related components that are often used together */
  relatedTo?: string[]
}

export const registry: Record<string, ComponentEntry> = {

  Button: {
    from: '@ds/ui',
    exports: ['Button', 'buttonVariants'],
    description: 'Primary interactive element. Polymorphic — renders as <button> or any element via asChild.',
    variants: {
      variant: {
        default:     'Primary CTA — high-contrast black/white fill. The single most important action on a surface.',
        accent:      'Brand purple fill — feature actions, active navigation states, brand-flavoured CTAs.',
        outline:     'Secondary action — bordered, no fill. Pair with default.',
        secondary:   'Tertiary action — subtle tonal fill. Low emphasis.',
        ghost:       'No background until hovered. Toolbars, sidebars, icon rows.',
        destructive: 'Red tint. Delete, remove, irreversible actions only.',
        link:        'Inline text link. Use inside prose or as a text action.',
      },
      size: {
        default:   '32px tall — standard.',
        xs:        '24px tall — dense UIs, table rows, tags.',
        sm:        '28px tall — compact, sidebars.',
        lg:        '36px tall — prominent CTAs, hero sections.',
        icon:      '32×32px — icon-only, standard. Always add aria-label.',
        'icon-xs': '24×24px — icon-only, dense.',
        'icon-sm': '28×28px — icon-only, compact.',
        'icon-lg': '36×36px — icon-only, prominent.',
      },
    },
    useCases: [
      'Form submissions',
      'Navigation triggers',
      'Dialog confirm / cancel pairs',
      'Toolbar actions',
      'Destructive confirmations',
    ],
    avoid: [
      'Non-interactive elements (use a <span> or <div> instead)',
      'Multiple default-variant buttons on the same surface',
    ],
    relatedTo: ['Input', 'Badge'],
  },

  ToggleButton: {
    from: '@ds/ui',
    exports: ['ToggleButton'],
    description: 'Expand/collapse button that collapses to icon-only when inactive and reveals a label when active. Uses a CSS grid 0fr→1fr transition for content-exact symmetric width animation.',
    variants: {
      active: {
        false: 'Collapsed — icon only, subtle border, transparent background.',
        true:  'Expanded — icon + label, brand purple fill.',
      },
    },
    useCases: [
      'Tab groups where only the selected tab shows its label',
      'Sidebar panel toggles (Chat, Docs, Outline)',
      'Toolbar mode switches that need to show which mode is active',
      'Mutually exclusive view selectors',
    ],
    avoid: [
      'Standalone toggle switches — use a checkbox or Switch primitive instead',
      'Non-exclusive multi-select — use checkboxes',
      'When all options should always show their labels — use Button or Tabs',
    ],
    relatedTo: ['Button'],
  },

  Input: {
    from: '@ds/ui',
    exports: ['Input', 'inputVariants'],
    description: 'Single-line text field. Supports all native input types. Set aria-invalid to show error state.',
    variants: {
      size: {
        sm:      '28px tall — dense forms, table-inline editing.',
        default: '36px tall — standard form fields.',
        lg:      '44px tall — prominent inputs, search bars, landing pages.',
      },
    },
    useCases: [
      'Text, email, password, search, number fields',
      'Inline table editing',
      'Filter bars',
    ],
    avoid: [
      'Multi-line text (use <textarea> directly)',
      'File uploads (use a dedicated file input pattern)',
    ],
    relatedTo: ['Button', 'Card'],
  },

  Badge: {
    from: '@ds/ui',
    exports: ['Badge', 'badgeVariants'],
    description: 'Non-interactive label for status, category, or count. Renders as <span>.',
    variants: {
      variant: {
        default:     'Brand fill — primary labels, tags, counts.',
        secondary:   'Subtle fill — secondary or inactive labels.',
        outline:     'Bordered, no fill — when badge must not compete with colour.',
        destructive: 'Red tint — errors, failed states, blocked items.',
        success:     'Green tint — passing checks, active status, completed.',
        warning:     'Amber tint — warnings, pending, degraded states.',
      },
    },
    useCases: [
      'Status indicators (active, pending, error)',
      'Category labels on cards or list items',
      'Notification counts',
      'Environment tags (prod, staging, dev)',
    ],
    avoid: [
      'Clickable tags (add a button wrapper instead)',
      'Long text — badges are for short labels ≤3 words',
    ],
    relatedTo: ['Card', 'Button'],
  },

  Card: {
    from: '@ds/ui',
    exports: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
    description: 'Surface container for grouped content. Use the sub-components for consistent internal layout.',
    useCases: [
      'Settings panels',
      'Dashboard metrics',
      'Content previews',
      'Form sections',
      'Pricing tiers',
    ],
    avoid: [
      'Wrapping every piece of content — only use when grouping is semantically meaningful',
      'Deeply nested cards (max one level of nesting)',
    ],
    relatedTo: ['Button', 'Badge', 'Input'],
  },

}

/**
 * Helper — get a component entry by name.
 *
 * @example
 * const btn = getComponent('Button')
 * console.log(btn.variants?.variant)
 */
export function getComponent(name: string): ComponentEntry | undefined {
  return registry[name]
}

/**
 * All component names in the registry.
 */
export const componentNames = Object.keys(registry) as (keyof typeof registry)[]
