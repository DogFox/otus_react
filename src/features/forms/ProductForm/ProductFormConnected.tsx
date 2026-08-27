import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { useFormik, type FormikConfig } from 'formik';
import { isNotDefinedString } from '../../../shared/lib/validation';
import { ProductForm } from './ProductForm';
import type { ProductFormErrors, ProductFormValues } from './types';
import '../formFields.css';

export type ProductFormConnectedProps = {
  className?: string;
  disabled?: boolean;
  initialValues?: ProductFormValues;
  onSubmit?: (values: ProductFormValues) => void;
  submitLabel?: string;
};

const defaultValues: ProductFormValues = {
  name: '',
  price: '',
  oldPrice: '',
  photo: '',
  desc: '',
  category: '',
};

const isPositiveNumber = (value: string): boolean => {
  const number = Number(value);
  return value.trim() !== '' && !Number.isNaN(number) && number > 0;
};

export const ProductFormConnected = memo<ProductFormConnectedProps>(
  ({
    className,
    disabled,
    initialValues = defaultValues,
    onSubmit: handleExternalSubmit,
    submitLabel = 'Сохранить товар',
  }) => {
    const { onSubmit, validate } = useMemo<Pick<FormikConfig<ProductFormValues>, 'onSubmit' | 'validate'>>(
      () => ({
        onSubmit: (values, { resetForm }) => {
          handleExternalSubmit?.(values);
          console.log('ProductForm submit:', {
            ...values,
            price: Number(values.price),
            oldPrice: values.oldPrice ? Number(values.oldPrice) : undefined,
          });
          resetForm({ values: defaultValues });
        },
        validate: (values) => {
          const errors: ProductFormErrors = {};

          if (isNotDefinedString(values.name)) {
            errors.name = 'Обязательное поле';
          }

          if (isNotDefinedString(values.price)) {
            errors.price = 'Обязательное поле';
          } else if (!isPositiveNumber(values.price)) {
            errors.price = 'Укажите положительное число';
          }

          if (values.oldPrice.trim() && !isPositiveNumber(values.oldPrice)) {
            errors.oldPrice = 'Укажите положительное число';
          }

          if (isNotDefinedString(values.photo)) {
            errors.photo = 'Обязательное поле';
          }

          if (isNotDefinedString(values.category)) {
            errors.category = 'Обязательное поле';
          }

          return errors;
        },
      }),
      [handleExternalSubmit]
    );

    const formManager = useFormik<ProductFormValues>({
      initialValues,
      enableReinitialize: true,
      onSubmit,
      validate,
    });

    return (
      <div className={cn('formConnected', className)}>
        <ProductForm formManager={formManager} disabled={disabled} />
        <button className="formSubmit" type="button" disabled={disabled} onClick={formManager.submitForm}>
          {submitLabel}
        </button>
      </div>
    );
  }
);

ProductFormConnected.displayName = 'ProductFormConnected';
