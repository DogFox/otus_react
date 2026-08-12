import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { useFormik, type FormikConfig } from 'formik';
import { isNotDefinedString } from '../../../shared/lib/validation';
import { ProfileForm } from './ProfileForm';
import type { ProfileFormErrors, ProfileFormValues } from './types';
import '../formFields.css';

export type ProfileFormConnectedProps = {
  className?: string;
  disabled?: boolean;
  initialValues?: ProfileFormValues;
};

const defaultValues: ProfileFormValues = {
  name: '',
  about: '',
};

export const ProfileFormConnected = memo<ProfileFormConnectedProps>(
  ({ className, disabled, initialValues = defaultValues }) => {
    const { onSubmit, validate } = useMemo<Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate'>>(
      () => ({
        onSubmit: (values, { resetForm }) => {
          console.log('ProfileForm submit:', values);
          resetForm({ values: defaultValues });
        },
        validate: (values) => {
          const errors: ProfileFormErrors = {};

          if (isNotDefinedString(values.name)) {
            errors.name = 'Обязательное поле';
          }

          return errors;
        },
      }),
      []
    );

    const formManager = useFormik<ProfileFormValues>({
      initialValues,
      enableReinitialize: true,
      onSubmit,
      validate,
    });

    return (
      <div className={cn('formConnected', className)}>
        <ProfileForm formManager={formManager} disabled={disabled} />
        <button className="formSubmit" type="button" disabled={disabled} onClick={formManager.submitForm}>
          Сохранить
        </button>
      </div>
    );
  }
);

ProfileFormConnected.displayName = 'ProfileFormConnected';
