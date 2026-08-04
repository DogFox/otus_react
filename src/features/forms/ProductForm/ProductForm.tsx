import React, { memo } from 'react';
import cn from 'clsx';
import type { ProductFormProps } from './types';
import { TextAreaField, TextField } from './Fields';
import '../formFields.css';

export const ProductForm = memo<ProductFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled }) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn('formRoot', className)}>
        <TextField
          autoFocusElement={autoFocusElement}
          name="name"
          title="Название"
          placeholder="Название товара"
          required
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          errors={errors.name}
          submitCount={submitCount}
          touched={touched.name}
          disabled={disabled}
        />
        <TextField
          name="price"
          title="Цена"
          placeholder="0"
          type="number"
          required
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.price}
          errors={errors.price}
          submitCount={submitCount}
          touched={touched.price}
          disabled={disabled}
        />
        <TextField
          name="oldPrice"
          title="Старая цена"
          placeholder="Необязательно"
          type="number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.oldPrice}
          errors={errors.oldPrice}
          submitCount={submitCount}
          touched={touched.oldPrice}
          disabled={disabled}
        />
        <TextField
          name="photo"
          title="Фото (URL)"
          placeholder="https://..."
          type="url"
          required
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.photo}
          errors={errors.photo}
          submitCount={submitCount}
          touched={touched.photo}
          disabled={disabled}
        />
        <TextField
          name="category"
          title="Категория"
          placeholder="Категория"
          required
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.category}
          errors={errors.category}
          submitCount={submitCount}
          touched={touched.category}
          disabled={disabled}
        />
        <TextAreaField
          name="desc"
          title="Описание"
          placeholder="Описание товара"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.desc}
          errors={errors.desc}
          submitCount={submitCount}
          touched={touched.desc}
          disabled={disabled}
        />
      </form>
    );
  }
);

ProductForm.displayName = 'ProductForm';
