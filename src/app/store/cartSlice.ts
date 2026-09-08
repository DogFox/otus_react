import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartEntry {
  productId: string;
  quantity: number;
}

const initialState: CartEntry[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<string>) {
      const item = state.find((entry) => entry.productId === action.payload);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ productId: action.payload, quantity: 1 });
      }
    },
    itemRemoved(state, action: PayloadAction<string>) {
      return state.filter((entry) => entry.productId !== action.payload);
    },
  },
});

export const { itemAdded, itemRemoved } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

