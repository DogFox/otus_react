import React, { type FC } from 'react';
import type { Product } from '../../homeworks/ts1/3_write';
import { ProductCardFull } from '../../entities/shop/ProductCard/ProductCardFull';
import { ProductCardShort } from '../../entities/shop/ProductCard/ProductCardShort';
import {
  mapProductToFullProps,
  mapProductToShortProps,
} from '../../entities/shop/lib/mapProductToCard';
import './productList.css';

export type ProductListVariant = 'short' | 'full';

export interface ProductListProps {
  items: Product[];
  variant?: ProductListVariant;
  onProductClick?: (product: Product) => void;
}

export const ProductList: FC<ProductListProps> = ({
  items,
  variant = 'short',
  onProductClick,
}) => {
  return (
    <ul className="productList">
      {items.map((product) => (
        <li
          key={product.id}
          className="productList__item productList__item--clickable"
          onClick={() => onProductClick?.(product)}
        >
          {variant === 'full' ? (
            <ProductCardFull {...mapProductToFullProps(product)} />
          ) : (
            <ProductCardShort {...mapProductToShortProps(product)} />
          )}
        </li>
      ))}
    </ul>
  );
};