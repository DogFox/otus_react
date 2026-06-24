import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProductCardShort } from './ProductCardShort';
import { ProductCardFull } from './ProductCardFull';

const meta: Meta = {
  title: 'entities/shop/ProductCard',
};

export default meta;

type ShortStory = StoryObj<typeof ProductCardShort>;
type FullStory = StoryObj<typeof ProductCardFull>;

export const Short: ShortStory = {
  render: (args) => <ProductCardShort {...args} />,
  args: {
    price: '4 990 ₽',
    title: 'Наушники',
    description:
      'Удобные, лёгкие и с хорошей шумоизоляцией. Описание специально сделано длинным, чтобы проверить обрезку в карточке.',
    cartCount: 0,
  },
};

export const Full: FullStory = {
  render: (args) => <ProductCardFull {...args} />,
  args: {
    price: '12 990 ₽',
    category: 'Аудио',
    title: 'Колонка',
    description: 'Громкий звук, компактный корпус, Bluetooth 5.3. Полное описание отображается без обрезки.',
    cartCount: 3,
  },
};

