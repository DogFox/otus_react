import type { FormProps } from '../types';

export type ProfileFormValues = {
  name: string;
  about: string;
};

export type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;
export type ProfileFormTouched = Partial<Record<keyof ProfileFormValues, boolean>>;

export type ProfileFormProps = FormProps<ProfileFormValues>;
