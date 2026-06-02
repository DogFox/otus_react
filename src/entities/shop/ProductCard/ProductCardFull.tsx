import React, { type FC } from 'react';
import { AddToCartButton } from '../../../shared/ui/AddToCartButton/AddToCartButton';
import './productCard.css';

export interface ProductCardFullProps {
  price: string;
  imageUrl?: string;
  category: string;
  title: string;
  description: string;
  cartCount: number;
}

export const ProductCardFull: FC<ProductCardFullProps> = ({
  price,
  imageUrl,
  category,
  title,
  description,
  cartCount,
}) => {
  return (
    <div className="productCard">
      <div className="productCard__media">
        {imageUrl ? (
          <img className="productCard__img" src={imageUrl} alt={title} />
        ) : (
          <div className="productCard__placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="productCard__body">
        <div className="productCard__top">
          <div className="productCard__price">{price}</div>
          <div className="productCard__chip">{category}</div>
        </div>
        <div className="productCard__title">{title}</div>
        <div className="productCard__desc">{description}</div>
        <div className="productCard__footer">
          <AddToCartButton count={cartCount} />
        </div>
      </div>
    </div>
  );
};

