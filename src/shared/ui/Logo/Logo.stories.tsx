import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'shared/Logo',
  component: Logo,
  args: {
    text: 'DogFox',
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Playground: Story = {};

