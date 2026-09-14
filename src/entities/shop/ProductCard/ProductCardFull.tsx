import React, { type FC } from 'react';
import type { Product } from '../../../homeworks/ts1/3_write';
import { AddToCartButton } from '../../../shared/ui/AddToCartButton/AddToCartButton';
import { itemAdded, itemRemoved } from '../../../app/store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import './productCard.css';

export interface ProductCardFullProps {
  price: string;
  imageUrl?: string;
  category: string;
  title: string;
  description: string;
  product: Product;
  showRemoveButton?: boolean;
}

export const ProductCardFull: FC<ProductCardFullProps> = ({
  price,
  imageUrl,
  category,
  title,
  description,
  product,
  showRemoveButton,
}) => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(
    (state) => state.cart.find((item) => item.productId === product.id)?.quantity ?? 0
  );

  const handleAddToCart = () => {
    dispatch(itemAdded(product.id));
  };

  const handleRemoveFromCart = () => {
    dispatch(itemRemoved(product.id));
  };

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
          {showRemoveButton ? (
            <button className="App-actionBtn" type="button" onClick={handleRemoveFromCart}>
              Remove
            </button>
          ) : (
            <AddToCartButton value={cartCount} onAdd={handleAddToCart} onRemove={handleRemoveFromCart} />
          )}
        </div>
      </div>
    </div>
  );
};
