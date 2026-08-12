import type { Product } from '../../../homeworks/ts1/3_write';
import type { ProductCardFullProps } from '../ProductCard/ProductCardFull';
import type { ProductCardShortProps } from '../ProductCard/ProductCardShort';
import { formatCurrency } from './formatCurrency';

export function mapProductToShortProps(product: Product): ProductCardShortProps {
  return {
    price: formatCurrency(product.price),
    imageUrl: product.photo,
    title: product.name,
    description: product.desc ?? '',
    product: { id: product.id },
  };
}

export function mapProductToShortPropsWithPrice(product: Product, price: number): ProductCardShortProps {
  return {
    ...mapProductToShortProps(product),
    price: formatCurrency(price),
  };
}

export function mapProductToFullProps(product: Product): ProductCardFullProps {
  return {
    ...mapProductToShortProps(product),
    category: product.category.name,
  };
}

export function mapProductToFullPropsWithPrice(product: Product, price: number): ProductCardFullProps {
  return {
    ...mapProductToFullProps(product),
    ...mapProductToShortPropsWithPrice(product, price),
  };
}
