import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createRandomOperation } from '../../homeworks/ts1/3_write';
import { OperationList, type OperationListProps } from './OperationList';
import { InfiniteOperationList } from './InfiniteOperationList';

function StaticOperationListDemo(props: Omit<OperationListProps, 'items'>) {
  const items = Array.from({ length: 6 }, () => createRandomOperation(new Date().toISOString()));

  return <OperationList {...props} items={items} />;
}

const meta: Meta<typeof OperationList> = {
  title: 'widgets/OperationList',
  component: OperationList,
};

export default meta;

type Story = StoryObj<typeof OperationList>;

export const StaticList: Story = {
  render: (args) => <StaticOperationListDemo {...args} />,
};

export const Infinite: Story = {
  render: (args) => <InfiniteOperationList {...args} />,
};
