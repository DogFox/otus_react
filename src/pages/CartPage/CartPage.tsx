import React, { useState, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { createOrder } from '../../shared/api/rest';
import { itemRemoved } from '../../app/store/cartSlice';
import { ProductList } from '../../widgets/ProductList/ProductList';
import './cartPage.css';

export const CartPage: FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);
  const token = useAppSelector((state) => state.auth.token);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const products = useAppSelector((state) =>
    state.cart
      .map((cartItem) => state.products.items.find((product) => product.id === cartItem.productId))
      .filter((product): product is NonNullable<typeof product> => Boolean(product))
  );

  const handleCreateOrder = async () => {
    if (!token) {
      setStatus('Please sign in before creating an order.');
      return;
    }

    setPending(true);
    setStatus(null);

    try {
      await createOrder(token, cartItems.map(({ productId: id, quantity }) => ({ id, quantity })));
      cartItems.forEach((item) => dispatch(itemRemoved(item.productId)));
      setStatus('Order created successfully.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to create order.');
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="cartPage">
      <div className="cartPage__header">
        <h1 className="cartPage__title">Cart</h1>
        <span className="cartPage__count">{cartItems.length} items</span>
      </div>

      {products.length > 0 ? (
        <>
          <ProductList items={products} variant="full" showRemoveButton />
          <button className="App-actionBtn App-actionBtn--primary" type="button" disabled={pending} onClick={handleCreateOrder}>
            {pending ? 'Creating order...' : 'Create order'}
          </button>
          {status ? <p className="App-routeStatus" role="status">{status}</p> : null}
        </>
      ) : (
        <div className="cartPage__empty">Cart is empty</div>
      )}
    </section>
  );
};
