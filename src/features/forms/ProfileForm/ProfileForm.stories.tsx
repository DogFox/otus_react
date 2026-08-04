import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileFormConnected } from './ProfileFormConnected';

const meta: Meta<typeof ProfileFormConnected> = {
  title: 'features/forms/ProfileForm',
  component: ProfileFormConnected,
  tags: ['autodocs'],
  args: {
    disabled: false,
    initialValues: {
      name: 'Иван',
      about: 'Люблю React и TypeScript',
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    initialValues: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileFormConnected>;

export const Playground: Story = {};

export const Empty: Story = {
  args: {
    initialValues: {
      name: '',
      about: '',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
