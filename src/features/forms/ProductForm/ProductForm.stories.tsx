import type { Meta, StoryObj } from '@storybook/react';
import { ProductFormConnected } from './ProductFormConnected';

const meta: Meta<typeof ProductFormConnected> = {
  title: 'features/forms/ProductForm',
  component: ProductFormConnected,
  tags: ['autodocs'],
  args: {
    disabled: false,
    submitLabel: 'Сохранить товар',
    initialValues: {
      name: 'Наушники',
      price: '4990',
      oldPrice: '5990',
      photo: 'https://picsum.photos/200',
      desc: 'Беспроводные наушники с шумоподавлением',
      category: 'Электроника',
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    submitLabel: { control: 'text' },
    initialValues: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductFormConnected>;

export const Edit: Story = {};

export const Create: Story = {
  args: {
    submitLabel: 'Добавить товар',
    initialValues: {
      name: '',
      price: '',
      oldPrice: '',
      photo: '',
      desc: '',
      category: '',
    },
  },
};
