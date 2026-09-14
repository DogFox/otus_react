import React, { memo, useMemo, useState } from 'react';
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
  onSubmit?: (values: ProductFormValues) => void | Promise<void>;
  submitLabel?: string;
};

const defaultValues: ProductFormValues = { name: '', price: '', oldPrice: '', photo: '', desc: '', category: '' };

const isPositiveNumber = (value: string): boolean => {
  const number = Number(value.replace(',', '.'));
  return value.trim() !== '' && Number.isFinite(number) && number > 0;
};

const isValidUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const ProductFormConnected = memo<ProductFormConnectedProps>(
  ({
    className,
    disabled,
    initialValues = defaultValues,
    onSubmit: handleExternalSubmit,
    submitLabel = 'Save product',
  }) => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { onSubmit, validate } = useMemo<Pick<FormikConfig<ProductFormValues>, 'onSubmit' | 'validate'>>(
      () => ({
        onSubmit: async (values, { resetForm }) => {
          setSubmitError(null);
          try {
            await handleExternalSubmit?.(values);
            resetForm({ values: defaultValues });
          } catch (error) {
            setSubmitError(error instanceof Error ? error.message : String(error));
          }
        },
        validate: (values) => {
          const errors: ProductFormErrors = {};

          const price = values.price.trim();
          const oldPrice = values.oldPrice.trim();

          if (isNotDefinedString(values.name)) errors.name = 'Product name is required';
          if (!price) errors.price = 'Price is required';
          else if (!isPositiveNumber(price)) errors.price = 'Enter a positive finite number';

          if (oldPrice && !isPositiveNumber(oldPrice)) {
            errors.oldPrice = 'Enter a positive finite number';
          } else if (oldPrice && Number(oldPrice.replace(',', '.')) <= Number(price.replace(',', '.'))) {
            errors.oldPrice = 'Old price must be greater than the current price';
          }

          if (values.photo.trim() && !isValidUrl(values.photo)) errors.photo = 'Enter a valid http(s) URL';
          if (isNotDefinedString(values.category)) errors.category = 'Category is required';
          return errors;
        },
      }),
      [handleExternalSubmit]
    );

    const formManager = useFormik<ProductFormValues>({ initialValues, enableReinitialize: true, onSubmit, validate });

    return (
      <div className={cn('formConnected', className)}>
        <ProductForm formManager={formManager} disabled={disabled} />
        {submitError ? (
          <p className="formSubmitError" role="alert">
            {submitError}
          </p>
        ) : null}
        <button className="formSubmit" type="button" disabled={disabled} onClick={formManager.submitForm}>
          {submitLabel}
        </button>
      </div>
    );
  }
);

ProductFormConnected.displayName = 'ProductFormConnected';
