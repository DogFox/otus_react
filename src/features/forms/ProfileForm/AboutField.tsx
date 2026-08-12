import React, { memo } from 'react';
import cn from 'clsx';
import type { FormikHandlers } from 'formik';
import { FormItem } from '../../../shared/ui/FormItem';
import { getValidates } from '../../../shared/lib/validation';
import type { ProfileFormProps } from './types';
import '../formFields.css';

export type AboutFieldProps = Pick<ProfileFormProps, 'disabled'> & {
  className?: string;
  submitCount: number;
  touched?: boolean;
  errors?: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const AboutField = memo<AboutFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title="О себе" validateStatus={validateStatus} help={help}>
        <textarea
          className={cn('formFieldTextarea', 'formItem__textarea')}
          disabled={disabled}
          name="about"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="Расскажите о себе"
        />
      </FormItem>
    );
  }
);

AboutField.displayName = 'AboutField';
