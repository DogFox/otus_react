import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from '../shared/ui/Modal/Modal';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
  args: {
    visible: true,
    children: (
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Заголовок</div>
        <div style={{ color: '#4b5563' }}>Любой контент внутри модального окна (управляется пропсом children).</div>
      </div>
    ),
  },
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {};

export const Hidden: Story = {
  args: {
    visible: false,
  },
};
