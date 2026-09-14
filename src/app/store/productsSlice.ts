import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../homeworks/ts1/3_write';
import {
  createCategory,
  createProduct,
  getCategories,
  getProducts,
  updateProduct,
  type ProductPayload,
} from '../../shared/api/rest';

export interface ProductsState {
  items: Product[];
  page: number;
  total: number;
  loading: boolean;
  error: string | null;
}
const initialState: ProductsState = { items: [], page: 0, total: 0, loading: false, error: null };
type Root = { auth: { token: string | null }; products: ProductsState };

const toPayload = async (
  token: string,
  values: Omit<ProductPayload, 'categoryId'> & { category: string }
): Promise<ProductPayload> => {
  const { category: categoryName, ...product } = values;
  const categories = await getCategories(token);
  const category =
    categories.data.find((item) => item.name.toLowerCase() === categoryName.trim().toLowerCase()) ??
    (await createCategory(token, categoryName.trim()));
  return { ...product, categoryId: category.id };
};

export const loadMoreProducts = createAsyncThunk(
  'products/loadMore',
  async (_, { getState, rejectWithValue }) => {
    const { auth, products } = getState() as Root;
    if (products.total && products.items.length >= products.total) return rejectWithValue('No more products.');
    try {
      return await getProducts(products.page + 1, auth.token);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unable to load products.');
    }
  },
  {
    condition: (_, { getState }) => !(getState() as Root).products.loading,
  }
);

export const refreshProducts = createAsyncThunk('products/refresh', async (_, { getState, rejectWithValue }) => {
  const token = (getState() as Root).auth.token;
  try {
    return await getProducts(1, token);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unable to load products.');
  }
});

export const saveProduct = createAsyncThunk(
  'products/save',
  async (
    input: { id?: string; values: Omit<ProductPayload, 'categoryId'> & { category: string } },
    { getState, rejectWithValue }
  ) => {
    const token = (getState() as Root).auth.token;
    if (!token) return rejectWithValue('Please sign in to save a product.');
    try {
      const payload = await toPayload(token, input.values);
      return input.id ? await updateProduct(token, input.id, payload) : await createProduct(token, payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unable to save product.');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadMoreProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.pagination.pageNumber;
        state.total = action.payload.pagination.total;
        const known = new Set(state.items.map((product) => product.id));
        state.items.push(...action.payload.data.filter((product) => !known.has(product.id)));
      })
      .addCase(loadMoreProducts.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== 'No more products.') state.error = String(action.payload ?? action.error.message);
      })
      .addCase(refreshProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.page = action.payload.pagination.pageNumber;
        state.total = action.payload.pagination.total;
      })
      .addCase(refreshProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload ?? action.error.message ?? 'Unable to load products.');
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product.id === action.payload.id);
        if (index === -1) state.items.unshift(action.payload);
        else state.items[index] = action.payload;
      }),
});
export const productsReducer = productsSlice.reducer;
