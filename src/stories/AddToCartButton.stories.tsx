import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AddToCartButton } from '../shared/ui/AddToCartButton/AddToCartButton';

const meta: Meta<typeof AddToCartButton> = {
  title: 'shared/AddToCartButton',
  component: AddToCartButton,
  args: {
    count: 0,
  },
};

export default meta;
type Story = StoryObj<typeof AddToCartButton>;

export const Button: Story = {
  args: { count: 0 },
};

export const Stepper: Story = {
  args: { count: 2 },
};

