import type { FormikContextType } from 'formik';
import type { MutableRefObject, RefObject } from 'react';

export interface FormProps<Values = unknown> {
  className?: string;
  disabled?: boolean;
  formManager: FormikContextType<Values>;
  formElement?: MutableRefObject<HTMLFormElement | null>;
  autoFocusElement?: RefObject<HTMLInputElement>;
}
