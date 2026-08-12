import React, { memo } from 'react';
import cn from 'clsx';
import type { FormikHandlers } from 'formik';
import { FormItem } from '../../../shared/ui/FormItem';
import { getValidates } from '../../../shared/lib/validation';
import type { AuthFormProps } from './types';
import '../formFields.css';

export type EmailFieldProps = Pick<AuthFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched?: boolean;
  errors?: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const EmailField = memo<EmailFieldProps>(
  ({ className, onChange, onBlur, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="Email" required validateStatus={validateStatus} help={help}>
        <input
          ref={autoFocusElement}
          className={cn('formFieldInput', 'formItem__input')}
          disabled={disabled}
          autoFocus
          type="email"
          name="email"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="user@example.com"
        />
      </FormItem>
    );
  }
);

EmailField.displayName = 'EmailField';
