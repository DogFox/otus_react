import type { FormProps } from '../types';

export type AuthFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthFormErrors = Partial<Record<keyof AuthFormValues, string>>;
export type AuthFormTouched = Partial<Record<keyof AuthFormValues, boolean>>;

export type AuthFormProps = FormProps<AuthFormValues> & {
  mode?: 'login' | 'register';
};
