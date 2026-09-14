import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../homeworks/ts1/3_write';
import { createRandomProduct } from '../../homeworks/ts1/3_write';

const createdAt = new Date().toISOString();
const initialState: Product[] = Array.from({ length: 6 }, () => createRandomProduct(createdAt));

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productAdded(state, action: PayloadAction<Product>) {
      state.unshift(action.payload);
    },
    productUpdated(state, action: PayloadAction<Product>) {
      const index = state.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { productAdded, productUpdated } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

