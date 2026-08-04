import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CartItem } from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'entities/shop/CartItem',
  component: CartItem,
  args: {
    title: 'Колонка',
    subtitle: '12 990 ₽ · 1 шт.',
  },
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Playground: Story = {};
