import React, { memo } from 'react';
import cn from 'clsx';
import type { AuthFormProps } from './types';
import { EmailField } from './EmailField';
import { PasswordField } from './PasswordField';
import '../formFields.css';

export const AuthForm = memo<AuthFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled, mode = 'login' }) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn('formRoot', className)}>
        <EmailField
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          errors={errors.email}
          submitCount={submitCount}
          touched={touched.email}
          disabled={disabled}
        />
        <PasswordField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          errors={errors.password}
          submitCount={submitCount}
          touched={touched.password}
          disabled={disabled}
        />
        {mode === 'register' ? (
          <PasswordField
            name="confirmPassword"
            title="Подтверждение пароля"
            placeholder="Повторите пароль"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirmPassword}
            errors={errors.confirmPassword}
            submitCount={submitCount}
            touched={touched.confirmPassword}
            disabled={disabled}
          />
        ) : null}
      </form>
    );
  }
);

AuthForm.displayName = 'AuthForm';
