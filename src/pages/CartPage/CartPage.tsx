import React, { type FC } from 'react';
import { useAppSelector } from '../../app/store';
import { ProductList } from '../../widgets/ProductList/ProductList';
import './cartPage.css';

export const CartPage: FC = () => {
  const cartItems = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) =>
    state.cart
      .map((cartItem) => state.products.find((product) => product.id === cartItem.productId))
      .filter((product): product is NonNullable<typeof product> => Boolean(product))
  );

  return (
    <section className="cartPage">
      <div className="cartPage__header">
        <h1 className="cartPage__title">Cart</h1>
        <span className="cartPage__count">{cartItems.length} items</span>
      </div>

      {products.length > 0 ? (
        <ProductList items={products} variant="full" showRemoveButton />
      ) : (
        <div className="cartPage__empty">Cart is empty</div>
      )}
    </section>
  );
};
