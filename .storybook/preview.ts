import type { Preview } from '@storybook/react';
import React from 'react';
import { LangProvider } from '../src/app/providers/LangProvider/LangProvider';
import { ThemeProvider } from '../src/app/providers/ThemeProvider/ThemeProvider';
import '../src/app/styles/themes.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        ThemeProvider,
        null,
        React.createElement(LangProvider, null, React.createElement(Story, null)),
      ),
  ],
};

export default preview;
