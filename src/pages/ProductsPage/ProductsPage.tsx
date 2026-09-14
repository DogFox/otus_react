import React, { type FC } from 'react';
import type { Product } from '../../homeworks/ts1/3_write';
import { ProductList } from '../../widgets/ProductList/ProductList';
import './productsPage.css';

export interface ProductsPageProps {
  products: Product[];
  canManage: boolean;
  onCreateProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const ProductsPage: FC<ProductsPageProps> = ({ products, canManage, onCreateProduct, onEditProduct }) => {
  return (
    <section className="productsPage">
      <div className="productsPage__header">
        <h1 className="productsPage__title">Products</h1>
        {canManage ? (
          <button className="App-actionBtn App-actionBtn--primary" type="button" onClick={onCreateProduct}>
            Add product
          </button>
        ) : null}
      </div>

      <ProductList items={products} variant="short" onProductClick={canManage ? onEditProduct : undefined} />
    </section>
  );
};
