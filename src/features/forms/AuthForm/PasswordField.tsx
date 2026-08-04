import React, { memo } from 'react';
import cn from 'clsx';
import type { FormikHandlers } from 'formik';
import { FormItem } from '../../../shared/ui/FormItem';
import { getValidates } from '../../../shared/lib/validation';
import type { AuthFormProps } from './types';
import '../formFields.css';

export type PasswordFieldProps = Pick<AuthFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched?: boolean;
  errors?: string;
  value: string;
  name?: string;
  title?: string;
  placeholder?: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const PasswordField = memo<PasswordFieldProps>(
  ({
    className,
    onChange,
    onBlur,
    touched,
    value,
    errors,
    disabled,
    submitCount,
    name = 'password',
    title = 'Пароль',
    placeholder = 'Введите пароль',
  }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title={title} required validateStatus={validateStatus} help={help}>
        <input
          className={cn('formFieldInput', 'formItem__input')}
          disabled={disabled}
          type="password"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
      </FormItem>
    );
  }
);

PasswordField.displayName = 'PasswordField';
