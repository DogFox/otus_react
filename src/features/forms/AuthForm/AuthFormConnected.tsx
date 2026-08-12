import React, { memo, useEffect, useMemo, useState } from 'react';
import cn from 'clsx';
import { useFormik, type FormikConfig } from 'formik';
import { isLongEnough, isNotDefinedString, isValidEmail } from '../../../shared/lib/validation';
import { AuthForm } from './AuthForm';
import type { AuthFormErrors, AuthFormValues } from './types';
import '../formFields.css';

export type AuthMode = 'login' | 'register';

export type AuthFormConnectedProps = {
  className?: string;
  disabled?: boolean;
  mode?: AuthMode;
  initialValues?: AuthFormValues;
};

const defaultValues: AuthFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const AuthFormConnected = memo<AuthFormConnectedProps>(
  ({ className, disabled, mode: initialMode = 'login', initialValues = defaultValues }) => {
    const [mode, setMode] = useState<AuthMode>(initialMode);

    useEffect(() => {
      setMode(initialMode);
    }, [initialMode]);

    const { onSubmit, validate } = useMemo<Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate'>>(
      () => ({
        onSubmit: (values, { resetForm }) => {
          console.log(`AuthForm (${mode}) submit:`, values);
          resetForm({ values: defaultValues });
        },
        validate: (values) => {
          const errors: AuthFormErrors = {};

          if (isNotDefinedString(values.email)) {
            errors.email = 'Обязательное поле';
          } else if (!isValidEmail(values.email)) {
            errors.email = 'Некорректный email';
          }

          if (isNotDefinedString(values.password)) {
            errors.password = 'Обязательное поле';
          } else if (!isLongEnough(values.password)) {
            errors.password = 'Пароль должен быть не короче 6 символов';
          }

          if (mode === 'register') {
            if (isNotDefinedString(values.confirmPassword)) {
              errors.confirmPassword = 'Обязательное поле';
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = 'Пароли не совпадают';
            }
          }

          return errors;
        },
      }),
      [mode]
    );

    const formManager = useFormik<AuthFormValues>({
      initialValues,
      enableReinitialize: true,
      onSubmit,
      validate,
    });

    const switchMode = (nextMode: AuthMode) => {
      setMode(nextMode);
      formManager.setErrors({});
      formManager.setTouched({});
    };

    return (
      <div className={cn('formConnected', className)}>
        <div className="formModeSwitch">
          <button
            type="button"
            className={cn('formModeButton', mode === 'login' && 'formModeButton--active')}
            onClick={() => switchMode('login')}
          >
            Вход
          </button>
          <button
            type="button"
            className={cn('formModeButton', mode === 'register' && 'formModeButton--active')}
            onClick={() => switchMode('register')}
          >
            Регистрация
          </button>
        </div>
        <AuthForm formManager={formManager} disabled={disabled} mode={mode} />
        <button className="formSubmit" type="button" disabled={disabled} onClick={formManager.submitForm}>
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </div>
    );
  }
);

AuthFormConnected.displayName = 'AuthFormConnected';
