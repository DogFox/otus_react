import type { ReactNode } from 'react';

export type ValidateStatus = 'error' | '';
export type Help = null | ReactNode;

const MIN_LENGTH_PASSWORD = 6;
const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getValidateStatus = (errors: unknown, touched: unknown, submitCount: number): ValidateStatus =>
  submitCount && errors && touched ? 'error' : '';

export const getHelp = (errors: unknown, touched: unknown, submitCount: number): Help =>
  submitCount && errors && touched ? (errors as Help) : null;

export const getValidates = (
  errors: unknown,
  touched: unknown,
  submitCount: number
): { validateStatus: ValidateStatus; help: Help } => ({
  validateStatus: getValidateStatus(errors, touched, submitCount),
  help: getHelp(errors, touched, submitCount),
});

export const isNotDefinedString = (string?: string): boolean => !string?.trim();

export const isLongEnough = (word: string, minLength: number = MIN_LENGTH_PASSWORD): boolean =>
  Boolean(word) && word.length >= minLength;

export const isValidEmail = (email: string): boolean => EMAIL_REGEXP.test(email.trim());
