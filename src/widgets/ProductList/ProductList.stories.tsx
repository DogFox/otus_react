import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createRandomProduct } from '../../homeworks/ts1/3_write';
import { ProductList, type ProductListProps } from './ProductList';
import { InfiniteProductList } from './InfiniteProductList';

function StaticProductListDemo(props: Omit<ProductListProps, 'items'>) {
  const items = Array.from({ length: 6 }, () => createRandomProduct(new Date().toISOString()));

  return <ProductList {...props} items={items} />;
}

const meta: Meta<typeof ProductList> = {
  title: 'widgets/ProductList',
  component: ProductList,
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const StaticList: Story = {
  render: (args) => <StaticProductListDemo {...args} />,
};

export const Infinite: Story = {
  render: (args) => <InfiniteProductList {...args} />,
};
