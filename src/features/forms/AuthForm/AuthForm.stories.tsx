import type { Meta, StoryObj } from '@storybook/react';
import { AuthFormConnected } from './AuthFormConnected';

const meta: Meta<typeof AuthFormConnected> = {
  title: 'features/forms/AuthForm',
  component: AuthFormConnected,
  tags: ['autodocs'],
  args: {
    disabled: false,
    mode: 'login',
    initialValues: {
      email: 'user@example.com',
      password: 'secret1',
      confirmPassword: 'secret1',
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    mode: { control: 'radio', options: ['login', 'register'] },
    initialValues: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof AuthFormConnected>;

export const Login: Story = {};

export const Register: Story = {
  args: {
    mode: 'register',
  },
};

export const Empty: Story = {
  args: {
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  },
};
