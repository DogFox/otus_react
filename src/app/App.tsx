import React, { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import type { Product } from '../homeworks/ts1/3_write';
import { createRandomProduct } from '../homeworks/ts1/3_write';
import { LangProvider } from './providers/LangProvider/LangProvider';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider';
import { CartProvider } from '../entities/shop/lib/CartContext';
import { AccountProvider, useAccount } from './providers/AccountProvider/AccountProvider';
import { ProductFormConnected } from '../features/forms/ProductForm';
import type { ProductFormValues } from '../features/forms/ProductForm/types';
import { CartPage } from '../pages/CartPage/CartPage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { UserType } from '../services/account';
import { Header } from '../shared/ui/Header/Header';
import { Modal } from '../shared/ui/Modal/Modal';
import './styles/themes.css';
import './App.css';

const APP_ROUTES = {
  Cart: '/cart',
  Products: '/products',
  Profile: '/profile',
} as const;

const EDITOR_MODE = {
  Create: 'create',
  Edit: 'edit',
} as const;

type EditorState =
  | { mode: typeof EDITOR_MODE.Create }
  | { mode: typeof EDITOR_MODE.Edit; item: Product }
  | null;

const makeProducts = (): Product[] => {
  const createdAt = new Date().toISOString();
  return Array.from({ length: 6 }, () => createRandomProduct(createdAt));
};

const productToFormValues = (product: Product): ProductFormValues => ({
  name: product.name,
  price: String(product.price),
  oldPrice: product.oldPrice ? String(product.oldPrice) : '',
  photo: product.photo,
  desc: product.desc ?? '',
  category: product.category.name,
});

function App() {
  const { userType, setUserType } = useAccount();
  const [products, setProducts] = useState<Product[]>(makeProducts);
  const [editor, setEditor] = useState<EditorState>(null);

  const closeEditor = () => setEditor(null);

  const saveProduct = (values: ProductFormValues) => {
    const isEditMode = editor?.mode === EDITOR_MODE.Edit;

    const nextProduct: Product = {
      id: isEditMode ? editor.item.id : `${Date.now()}`,
      name: values.name,
      photo: values.photo,
      desc: values.desc,
      createdAt: isEditMode ? editor.item.createdAt : new Date().toISOString(),
      oldPrice: values.oldPrice ? Number(values.oldPrice) : undefined,
      price: Number(values.price),
      category: {
        id: values.category.toLowerCase().replace(/\s+/g, '-'),
        name: values.category,
      },
    };

    setProducts((currentProducts) => {
      if (isEditMode) {
        return currentProducts.map((product) => (product.id === editor.item.id ? nextProduct : product));
      }

      return [nextProduct, ...currentProducts];
    });
    closeEditor();
  };

  const editorTitle = useMemo(() => {
    if (!editor) {
      return '';
    }

    return editor.mode === EDITOR_MODE.Create ? 'Create product' : 'Edit product';
  }, [editor]);

  return (
    <div className="App">
      <Header
        title="Homework 8"
        navigation={
          <>
            <NavLink
              className={({ isActive }) =>
                `header__navButton ${isActive ? 'header__navButton--active' : ''}`
              }
              to={APP_ROUTES.Profile}
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `header__navButton ${isActive ? 'header__navButton--active' : ''}`
              }
              to={APP_ROUTES.Products}
            >
              Products
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `header__navButton ${isActive ? 'header__navButton--active' : ''}`
              }
              to={APP_ROUTES.Cart}
            >
              Cart
            </NavLink>
            <label className="App-userTypeSelect">
              Тип пользователя:{' '}
              <select value={userType} onChange={(e) => setUserType(e.target.value as UserType)}>
                <option value={UserType.Standard}>Standard</option>
                <option value={UserType.Premium}>Premium</option>
                <option value={UserType.Gold}>Gold</option>
                <option value={UserType.Free}>Free</option>
              </select>
            </label>
          </>
        }
      />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Navigate to={APP_ROUTES.Products} replace />} />
          <Route path={APP_ROUTES.Profile} element={<ProfilePage />} />
          <Route
            path={APP_ROUTES.Products}
            element={
              <ProductsPage
                products={products}
                onCreateProduct={() => setEditor({ mode: EDITOR_MODE.Create })}
                onEditProduct={(product) => setEditor({ mode: EDITOR_MODE.Edit, item: product })}
              />
            }
          />
          <Route path={APP_ROUTES.Cart} element={<CartPage />} />
          <Route path="*" element={<Navigate to={APP_ROUTES.Products} replace />} />
        </Routes>
      </main>

      <Modal visible={editor !== null} onClose={closeEditor} title={editorTitle}>
        {editor ? (
          <ProductFormConnected
            initialValues={editor.mode === EDITOR_MODE.Edit ? productToFormValues(editor.item) : undefined}
            onSubmit={saveProduct}
            submitLabel="Save product"
          />
        ) : null}
      </Modal>
    </div>
  );
}

function AppWithProviders() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <AccountProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AccountProvider>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppWithProviders;
