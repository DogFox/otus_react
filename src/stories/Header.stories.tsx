import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Header } from '../shared/ui/Header/Header';

const meta: Meta<typeof Header> = {
  title: 'shared/Header',
  component: Header,
  args: {
    title: 'Липкий Header',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 600 }}>
        <Story />
        <div style={{ padding: 16, color: '#475569' }}>
          Прокрутите вниз, чтобы увидеть sticky‑поведение.
          <div style={{ height: 900 }} />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Playground: Story = {};

