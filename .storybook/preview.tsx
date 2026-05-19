import React from 'react'
import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/index.css'

const withTheme: Decorator = (Story, context) => {
  const isDark = context.globals.theme === 'dark'

  React.useEffect(() => {
    const html = document.documentElement
    const root = document.getElementById('storybook-root')
    const bg = isDark ? '#222325' : '#ffffff'

    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    document.body.style.background = bg
    if (root) root.style.background = bg

    return () => {
      html.classList.remove('dark')
      document.body.style.background = ''
      if (root) root.style.background = ''
    }
  }, [isDark])

  return <Story />
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [withTheme],

  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Foundations', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
