import React, { type FC } from 'react';
import type { Product } from '../../homeworks/ts1/3_write';
import { ProductList } from '../../widgets/ProductList/ProductList';
import { useIntersectionObserver } from '../../shared/hooks/useIntersectionObserver';
import './productsPage.css';

export interface ProductsPageProps {
  products: Product[];
  canManage: boolean;
  onCreateProduct: () => void;
  onEditProduct: (product: Product) => void;
  onLoadMore: () => void;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

export const ProductsPage: FC<ProductsPageProps> = ({
  products,
  canManage,
  onCreateProduct,
  onEditProduct,
  onLoadMore,
  isLoading,
  error,
  hasMore,
}) => {
  const sentinelRef = useIntersectionObserver({
    onIntersect: onLoadMore,
    enabled: hasMore && !isLoading,
    watchKey: products.length,
  });
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
      <div ref={sentinelRef} className="productList__sentinel" aria-hidden="true" />
      {hasMore ? (
        <button className="App-actionBtn" type="button" disabled={isLoading} onClick={onLoadMore}>
          Load more
        </button>
      ) : null}
      {isLoading ? <p className="App-routeStatus">Loading products...</p> : null}
      {error ? (
        <p className="App-routeStatus" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
};
