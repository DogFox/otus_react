import { authReducer, fakeLogin, initializeApplication, logout, profileUpdated } from './authSlice';
import { cartReducer, itemAdded, itemRemoved } from './cartSlice';
import { productAdded, productsReducer, productUpdated } from './productsSlice';
import type { Product } from '../../homeworks/ts1/3_write';

const product: Product = {
  id: 'product-1',
  name: 'Coffee',
  photo: 'https://example.com/coffee.jpg',
  createdAt: '2026-09-08T00:00:00.000Z',
  price: 500,
  category: { id: 'food', name: 'Food' },
};

describe('application store slices', () => {
  test('initializes and clears a profile together with its token', () => {
    const token = 'fake:admin%40example.com:token';
    const initialized = authReducer(undefined, initializeApplication(token));

    expect(initialized.initialized).toBe(true);
    expect(initialized.token).toBe(token);
    expect(initialized.profile).toMatchObject({ email: 'admin@example.com', role: 'admin' });

    const updated = authReducer(initialized, profileUpdated({ name: 'New name', about: 'Updated' }));
    expect(updated.profile?.name).toBe('New name');

    const signedOut = authReducer(updated, logout());
    expect(signedOut.token).toBeNull();
    expect(signedOut.profile).toBeNull();
  });

  test('creates a user profile after fake login', () => {
    const state = authReducer(undefined, fakeLogin.fulfilled('fake:user%40example.com:token', '', 'user@example.com'));
    expect(state.profile).toMatchObject({ email: 'user@example.com', role: 'user' });
  });

  test('adds quantities and removes a product from the cart', () => {
    const withTwoItems = cartReducer(cartReducer(undefined, itemAdded(product.id)), itemAdded(product.id));
    expect(withTwoItems).toEqual([{ productId: product.id, quantity: 2 }]);
    expect(cartReducer(withTwoItems, itemRemoved(product.id))).toEqual([]);
  });

  test('adds and edits products', () => {
    const added = productsReducer([], productAdded(product));
    const changed = { ...product, name: 'Tea' };
    expect(productsReducer(added, productUpdated(changed))).toEqual([changed]);
  });
});
