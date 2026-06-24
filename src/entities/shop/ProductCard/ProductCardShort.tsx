import React, { type FC } from 'react';
import { AddToCartButton } from '../../../shared/ui/AddToCartButton/AddToCartButton';
import './productCard.css';

export interface ProductCardShortProps {
  price: string;
  imageUrl?: string;
  title: string;
  description: string;
  cartCount: number;
}

export const ProductCardShort: FC<ProductCardShortProps> = ({
  price,
  imageUrl,
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
        </div>
        <div className="productCard__title">{title}</div>
        <div className="productCard__desc productCard__desc--clamp">{description}</div>
        <div className="productCard__footer">
          <AddToCartButton count={cartCount} />
        </div>
      </div>
    </div>
  );
};

