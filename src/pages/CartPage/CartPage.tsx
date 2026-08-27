import React, { type FC } from 'react';
import { useCart } from '../../entities/shop/lib/CartContext';
import { ProductList } from '../../widgets/ProductList/ProductList';
import './cartPage.css';

export const CartPage: FC = () => {
  const { cartItems } = useCart();
  const products = cartItems.map((item) => item.product);

  return (
    <section className="cartPage">
      <div className="cartPage__header">
        <h1 className="cartPage__title">Cart</h1>
        <span className="cartPage__count">{cartItems.length} items</span>
      </div>

      {products.length > 0 ? (
        <ProductList items={products} variant="full" />
      ) : (
        <div className="cartPage__empty">Cart is empty</div>
      )}
    </section>
  );
};
