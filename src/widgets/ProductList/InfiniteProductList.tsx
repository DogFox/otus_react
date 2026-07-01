import React, { useCallback, useEffect, useRef, useState, type FC } from 'react';
import type { Product } from '../../homeworks/ts1/3_write';
import { createRandomProduct } from '../../homeworks/ts1/3_write';
import { ProductCardFull } from '../../entities/shop/ProductCard/ProductCardFull';
import { mapProductToFullProps } from '../../entities/shop/lib/mapProductToCard';
import { Modal } from '../../shared/ui/Modal/Modal';
import { useIntersectionObserver } from '../../shared/hooks/useIntersectionObserver';
import { ProductList, type ProductListProps } from './ProductList';
import './productList.css';

export const InfiniteProductList: FC<Omit<ProductListProps, 'items'>> = ({ variant = 'short' }) => {
  const createdAt = new Date().toISOString();
  const [items, setItems] = useState(Array.from({ length: 6 }, () => createRandomProduct(createdAt)));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    const createdAt = new Date().toISOString();
    const nextItems = Array.from({ length: 4 }, () => createRandomProduct(createdAt));

    setItems((currentItems) => [...currentItems, ...nextItems]);
  }, []);

  useEffect(() => {
    isLoadingRef.current = false;
  }, [items]);

  const sentinelRef = useIntersectionObserver({ onIntersect: loadMore, watchKey: items.length });

  return (
    <div className="productList__wrapper">
      <ProductList items={items} variant={variant} onProductClick={setSelectedProduct} />
      <div ref={sentinelRef} className="productList__sentinel" aria-hidden="true" />
      <Modal visible={selectedProduct !== null} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && <ProductCardFull {...mapProductToFullProps(selectedProduct)} />}
      </Modal>
    </div>
  );
};
