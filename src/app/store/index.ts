import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { authReducer, fakeLogin, logout, TOKEN_STORAGE_KEY, tokenSynchronized } from './authSlice';
import { cartReducer } from './cartSlice';
import { productsReducer } from './productsSlice';

const tokenStorageMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (fakeLogin.fulfilled.match(action)) {
    localStorage.setItem(TOKEN_STORAGE_KEY, action.payload);
  } else if (logout.match(action)) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const startTokenSynchronization = (): (() => void) => {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === TOKEN_STORAGE_KEY) {
      store.dispatch(tokenSynchronized(event.newValue));
    }
  };

  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
};

