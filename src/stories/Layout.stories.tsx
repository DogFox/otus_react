import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Layout } from '../shared/ui/Layout/Layout';

const meta: Meta<typeof Layout> = {
  title: 'shared/Layout',
  component: Layout,
  args: {
    headerTitle: 'Layout',
    children: (
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ padding: 14, border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff' }}>
          Контент страницы
        </div>
        <div style={{ height: 900, padding: 14, border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff' }}>
          Длинный контент для проверки sticky header
        </div>
      </div>
    ),
  },
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Playground: Story = {};

