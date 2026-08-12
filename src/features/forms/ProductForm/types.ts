import type { FormProps } from '../types';

export type ProductFormValues = {
  name: string;
  price: string;
  oldPrice: string;
  photo: string;
  desc: string;
  category: string;
};

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

export type ProductFormProps = FormProps<ProductFormValues>;
