import React, { type FC } from 'react';
import { AddToCartButton } from '../../../shared/ui/AddToCartButton/AddToCartButton';
import { useCart } from '../lib/CartContext';
import './productCard.css';

export interface ProductCardShortProps {
  price: string;
  imageUrl?: string;
  title: string;
  description: string;
  product: { id: string };
}

export const ProductCardShort: FC<ProductCardShortProps> = ({ price, imageUrl, title, description, product }) => {
  const { getQuantity, addItem, removeItem } = useCart();
  const cartCount = getQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleRemoveFromCart = () => {
    removeItem(product.id);
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
        </div>
        <div className="productCard__title">{title}</div>
        <div className="productCard__desc productCard__desc--clamp">{description}</div>
        <div className="productCard__footer">
          <AddToCartButton value={cartCount} onAdd={handleAddToCart} onRemove={handleRemoveFromCart} />
        </div>
      </div>
    </div>
  );
};
