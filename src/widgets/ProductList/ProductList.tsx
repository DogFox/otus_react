import React, { type FC, useMemo } from 'react';
import type { Product } from '../../homeworks/ts1/3_write';
import { useAccount } from '../../app/providers/AccountProvider/AccountProvider';
import { applyDiscount, getDiscountedPrice } from '../../entities/account/lib/pricing';
import { getProductTypeFromCategoryName } from '../../entities/account/lib/productTypeFromCategoryName';
import { ProductCardFull } from '../../entities/shop/ProductCard/ProductCardFull';
import { ProductCardShort } from '../../entities/shop/ProductCard/ProductCardShort';
import { mapProductToFullPropsWithPrice, mapProductToShortPropsWithPrice } from '../../entities/shop/lib/mapProductToCard';
import './productList.css';

export type ProductListVariant = 'short' | 'full';

export interface ProductListProps {
  items: Product[];
  variant?: ProductListVariant;
  onProductClick?: (product: Product) => void;
}

export const ProductList: FC<ProductListProps> = ({ items, variant = 'short', onProductClick }) => {
  const { accountService, userType } = useAccount();

  const memoizedItems = useMemo(() => {
    return items.map((product) => {
      const productType = getProductTypeFromCategoryName(product.category.name);
      const generalDiscount = accountService.getGeneralDiscount(userType);
      const price = productType
        ? getDiscountedPrice(product.price, productType, accountService, userType)
        : applyDiscount(product.price, generalDiscount);

      return {
        shortProps: mapProductToShortPropsWithPrice(product, price),
        fullProps: mapProductToFullPropsWithPrice(product, price),
      };
    });
  }, [accountService, items, userType]);

  return (
    <ul className="productList">
      {items.map((product, index) => (
        <li
          key={product.id}
          className="productList__item productList__item--clickable"
          onClick={() => onProductClick?.(product)}
        >
          {variant === 'full' ? (
            <ProductCardFull {...memoizedItems[index].fullProps} />
          ) : (
            <ProductCardShort {...memoizedItems[index].shortProps} />
          )}
        </li>
      ))}
    </ul>
  );
};
