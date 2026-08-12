import React, { memo } from 'react';
import cn from 'clsx';
import type { FormikHandlers } from 'formik';
import { FormItem } from '../../../shared/ui/FormItem';
import { getValidates } from '../../../shared/lib/validation';
import type { ProfileFormProps } from './types';
import '../formFields.css';

export type NameFieldProps = Pick<ProfileFormProps, 'disabled' | 'autoFocusElement'> & {
  className?: string;
  submitCount: number;
  touched?: boolean;
  errors?: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const NameField = memo<NameFieldProps>(
  ({ className, onChange, onBlur, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="Имя" required validateStatus={validateStatus} help={help}>
        <input
          ref={autoFocusElement}
          className={cn('formFieldInput', 'formItem__input')}
          disabled={disabled}
          autoFocus
          name="name"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="Введите имя"
        />
      </FormItem>
    );
  }
);

NameField.displayName = 'NameField';
