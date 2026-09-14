import type { Category, Product } from '../../homeworks/ts1/3_write';

export const API_BASE_URL = 'http://19429ba06ff2.vps.myjino.ru/api';

type ServerError = { errors?: Array<{ message?: string }>; message?: string };

export class ApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
  }
}

const getErrorMessage = (body: ServerError | null, status: number): string =>
  body?.errors?.[0]?.message ?? body?.message ?? `Request failed with status ${status}.`;

export const request = async <T>(path: string, options: RequestInit = {}, token?: string | null): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError('Unable to connect to the server. Please try again later.');
  }

  if (!response.ok) {
    const body = await response.json().catch((): null => null) as ServerError | null;
    throw new ApiError(getErrorMessage(body, response.status), response.status);
  }

  return response.json() as Promise<T>;
};

export type AuthResult = { token: string };
export type ServerProfile = { id: string; name: string; email: string; signUpDate: string; commandId: string };
export type Page<T> = { data: T[]; pagination: { pageSize: number; pageNumber: number; total: number } };
export type ProductPayload = { name: string; photo?: string; desc?: string; oldPrice?: number; price: number; categoryId: string };

export const signIn = (email: string, password: string) =>
  request<AuthResult>('/signin', { method: 'POST', body: JSON.stringify({ email, password }) });
export const signUp = (email: string, password: string) =>
  request<AuthResult>('/signup', { method: 'POST', body: JSON.stringify({ email, password, commandId: 'otus-react-homework' }) });
export const getProfile = (token: string) => request<ServerProfile>('/profile', {}, token);
export const updateProfile = (token: string, name: string) =>
  request<ServerProfile>('/profile', { method: 'PATCH', body: JSON.stringify({ name }) }, token);
export const getProducts = (pageNumber: number, token?: string | null) => {
  const query = new URLSearchParams({ pagination: JSON.stringify({ pageSize: 8, pageNumber }) });
  return request<Page<Product>>(`/products?${query}`, {}, token);
};
export const getCategories = (token: string) => request<Page<Category>>('/categories', {}, token);
export const createCategory = (token: string, name: string) =>
  request<Category>('/categories', { method: 'POST', body: JSON.stringify({ name }) }, token);
export const createProduct = (token: string, product: ProductPayload) =>
  request<Product>('/products', { method: 'POST', body: JSON.stringify(product) }, token);
export const updateProduct = (token: string, id: string, product: ProductPayload) =>
  request<Product>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }, token);
export const createOrder = (token: string, products: Array<{ id: string; quantity: number }>) =>
  request<{ id: string }>('/orders', { method: 'POST', body: JSON.stringify({ products }) }, token);
