import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { OperationCardShort } from './OperationCardShort';
import { OperationCardFull } from './OperationCardFull';

const meta: Meta = {
  title: 'entities/finance/OperationCard',
};

export default meta;

type ShortStory = StoryObj<typeof OperationCardShort>;
type FullStory = StoryObj<typeof OperationCardFull>;

export const Short: ShortStory = {
  render: (args) => <OperationCardShort {...args} />,
  args: {
    amount: '- 1 250 ₽',
    category: 'Еда',
    name: 'Обед',
    description:
      'Паста, напиток и десерт. Описание специально сделано длинным, чтобы проверить обрезку в кратком варианте карточки.',
  },
};

export const Full: FullStory = {
  render: (args) => <OperationCardFull {...args} />,
  args: {
    amount: '+ 35 000 ₽',
    category: 'Зарплата',
    title: 'Зачисление',
    name: 'ООО «Компания»',
    description: 'Зарплата за май. Полное описание показывается полностью, без обрезки.',
    date: '2026-06-02',
  },
};

