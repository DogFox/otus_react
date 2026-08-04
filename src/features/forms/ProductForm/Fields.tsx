import React, { memo } from 'react';
import cn from 'clsx';
import type { FormikHandlers } from 'formik';
import { FormItem } from '../../../shared/ui/FormItem';
import { getValidates } from '../../../shared/lib/validation';
import type { ProductFormProps } from './types';
import '../formFields.css';

type FieldBaseProps = Pick<ProductFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched?: boolean;
  errors?: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

type TextFieldProps = FieldBaseProps & {
  name: string;
  title: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'url';
  autoFocusElement?: ProductFormProps['autoFocusElement'];
};

export const TextField = memo<TextFieldProps>(
  ({
    className,
    name,
    title,
    placeholder,
    required,
    type = 'text',
    autoFocusElement,
    onChange,
    onBlur,
    touched,
    value,
    errors,
    disabled,
    submitCount,
  }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title={title} required={required} validateStatus={validateStatus} help={help}>
        <input
          ref={autoFocusElement}
          className={cn('formFieldInput', 'formItem__input')}
          disabled={disabled}
          autoFocus={Boolean(autoFocusElement)}
          type={type}
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

TextField.displayName = 'TextField';

type TextAreaFieldProps = FieldBaseProps & {
  name: string;
  title: string;
  placeholder?: string;
};

export const TextAreaField = memo<TextAreaFieldProps>(
  ({ className, name, title, placeholder, onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title={title} validateStatus={validateStatus} help={help}>
        <textarea
          className={cn('formFieldTextarea', 'formItem__textarea')}
          disabled={disabled}
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

TextAreaField.displayName = 'TextAreaField';
