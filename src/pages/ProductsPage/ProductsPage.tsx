import React, { type FC } from 'react';
import type { Product } from '../../homeworks/ts1/3_write';
import { ProductList } from '../../widgets/ProductList/ProductList';
import './productsPage.css';

export interface ProductsPageProps {
  products: Product[];
  onCreateProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export const ProductsPage: FC<ProductsPageProps> = ({ products, onCreateProduct, onEditProduct }) => {
  return (
    <section className="productsPage">
      <div className="productsPage__header">
        <h1 className="productsPage__title">Products</h1>
        <button className="App-actionBtn App-actionBtn--primary" type="button" onClick={onCreateProduct}>
          Add product
        </button>
      </div>

      <ProductList items={products} variant="short" onProductClick={onEditProduct} />
    </section>
  );
};
