import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../homeworks/ts1/3_write';
import { LangProvider } from './providers/LangProvider/LangProvider';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider';
import { AccountProvider } from './providers/AccountProvider/AccountProvider';
import { ProductFormConnected } from '../features/forms/ProductForm';
import type { ProductFormValues } from '../features/forms/ProductForm/types';
import { CartPage } from '../pages/CartPage/CartPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { Header } from '../shared/ui/Header/Header';
import { Modal } from '../shared/ui/Modal/Modal';
import { AdminRoute, ProtectedRoute } from './routing/ProtectedRoutes';
import { logout } from './store/authSlice';
import { productAdded, productUpdated } from './store/productsSlice';
import { startTokenSynchronization, useAppDispatch, useAppSelector } from './store';
import './styles/themes.css';
import './App.css';

const APP_ROUTES = {
  Cart: '/cart',
  Login: '/login',
  Products: '/products',
  Profile: '/profile',
} as const;

const productToFormValues = (product: Product): ProductFormValues => ({
  name: product.name,
  price: String(product.price),
  oldPrice: product.oldPrice ? String(product.oldPrice) : '',
  photo: product.photo,
  desc: product.desc ?? '',
  category: product.category.name,
});

const ProductEditorModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useAppSelector((state) => state.products.find((item) => item.id === productId));
  const isEditMode = Boolean(productId);

  if (isEditMode && !product) {
    return <Navigate to={APP_ROUTES.Products} replace />;
  }

  const close = () => navigate(APP_ROUTES.Products);
  const save = (values: ProductFormValues) => {
    const nextProduct: Product = {
      id: product?.id ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: values.name,
      photo: values.photo,
      desc: values.desc,
      createdAt: product?.createdAt ?? new Date().toISOString(),
      oldPrice: values.oldPrice ? Number(values.oldPrice) : undefined,
      price: Number(values.price),
      category: {
        id: values.category.toLowerCase().replace(/\s+/g, '-'),
        name: values.category,
      },
    };

    dispatch(product ? productUpdated(nextProduct) : productAdded(nextProduct));
    close();
  };

  return (
    <Modal visible onClose={close} title={product ? 'Edit product' : 'Create product'}>
      <ProductFormConnected
        initialValues={product ? productToFormValues(product) : undefined}
        onSubmit={save}
        submitLabel="Save product"
      />
    </Modal>
  );
};

const ProductsRoute = () => {
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.products);
  const isAdmin = useAppSelector((state) => state.auth.profile?.role === 'admin');

  return (
    <>
      <ProductsPage
        products={products}
        canManage={isAdmin}
        onCreateProduct={() => navigate('new')}
        onEditProduct={(product) => navigate(`${product.id}/edit`)}
      />
      <Outlet />
    </>
  );
};

function App() {
  const dispatch = useAppDispatch();
  const { initialized, profile, token } = useAppSelector((state) => state.auth);
  const cartCount = useAppSelector((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  useEffect(() => {
    return startTokenSynchronization();
  }, []);

  return (
    <div className="App">
      <Header
        title="Redux Shop"
        navigation={
          <>
            {token ? <NavItem to={APP_ROUTES.Profile}>Profile</NavItem> : null}
            <NavItem to={APP_ROUTES.Products}>Products</NavItem>
            <NavItem to={APP_ROUTES.Cart}>Cart ({cartCount})</NavItem>
          </>
        }
        actions={
          initialized && token ? (
            <div className="App-authActions">
              <span className="App-userName">{profile?.name}</span>
              <button className="App-actionBtn" type="button" onClick={() => dispatch(logout())}>
                Log out
              </button>
            </div>
          ) : (
            <NavLink className="App-actionBtn" to={APP_ROUTES.Login}>
              Log in
            </NavLink>
          )
        }
      />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Navigate to={APP_ROUTES.Products} replace />} />
          <Route path={APP_ROUTES.Login} element={<LoginPage />} />
          <Route path={APP_ROUTES.Products} element={<ProductsRoute />}>
            <Route element={<AdminRoute />}>
              <Route path="new" element={<ProductEditorModal />} />
              <Route path=":productId/edit" element={<ProductEditorModal />} />
            </Route>
          </Route>
          <Route path={APP_ROUTES.Cart} element={<CartPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={APP_ROUTES.Profile} element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to={APP_ROUTES.Products} replace />} />
        </Routes>
      </main>
    </div>
  );
}

const NavItem = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <NavLink
    className={({ isActive }) => `header__navButton ${isActive ? 'header__navButton--active' : ''}`}
    to={to}
  >
    {children}
  </NavLink>
);

function AppWithProviders() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppWithProviders;
