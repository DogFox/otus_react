import React, { memo, type ReactNode } from 'react';
import cn from 'clsx';
import type { Help, ValidateStatus } from '../../lib/validation';
import './formItem.css';

export type FormItemProps = {
  className?: string;
  title: ReactNode;
  children: ReactNode;
  validateStatus: ValidateStatus;
  help: Help;
  required?: boolean;
};

export const FormItem = memo<FormItemProps>(({ validateStatus, required, help, className, title, children }) => (
  <div className={cn('formItem', className, validateStatus === 'error' && 'formItem--error')}>
    <label className="formItem__label">
      {title}
      {required ? <span className="formItem__required">*</span> : null}
    </label>
    {children}
    {help ? <div className="formItem__help">{help}</div> : null}
  </div>
));

FormItem.displayName = 'FormItem';
