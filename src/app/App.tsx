import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import type { Product } from '../homeworks/ts1/3_write';
import { LangProvider } from './providers/LangProvider/LangProvider';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider';
import { AccountProvider } from './providers/AccountProvider/AccountProvider';
import { ProductFormConnected } from '../features/forms/ProductForm';
import type { ProductFormValues } from '../features/forms/ProductForm/types';
import { CartPage } from '../pages/CartPage/CartPage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { Header } from '../shared/ui/Header/Header';
import { Modal } from '../shared/ui/Modal/Modal';
import { ProtectedRoute } from './routing/ProtectedRoutes';
import { logout, restoreSession } from './store/authSlice';
import { loadMoreProducts, refreshProducts, saveProduct } from './store/productsSlice';
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

const parsePrice = (value: string): number => Number(value.replace(',', '.'));

const ProductEditorModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useAppSelector((state) => state.products.items.find((item) => item.id === productId));
  const isEditMode = Boolean(productId);

  if (isEditMode && !product) {
    return <Navigate to={APP_ROUTES.Products} replace />;
  }

  const close = () => navigate(APP_ROUTES.Products);
  const save = async (values: ProductFormValues) => {
    await dispatch(
      saveProduct({
        id: product?.id,
        values: {
          name: values.name,
          photo: values.photo || undefined,
          desc: values.desc || undefined,
          oldPrice: values.oldPrice ? parsePrice(values.oldPrice) : undefined,
          price: parsePrice(values.price),
          category: values.category,
        },
      })
    ).unwrap();
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.products.items);
  const { loading, error, total } = useAppSelector((state) => state.products);
  const canManage = useAppSelector((state) => Boolean(state.auth.token));

  return (
    <>
      <ProductsPage
        products={products}
        canManage={canManage}
        onCreateProduct={() => navigate('new')}
        onEditProduct={(product) => navigate(`${product.id}/edit`)}
        onLoadMore={() => dispatch(loadMoreProducts())}
        isLoading={loading}
        error={error}
        hasMore={products.length < total}
      />
      <Outlet />
    </>
  );
};

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { initialized, profile, token } = useAppSelector((state) => state.auth);
  const cartCount = useAppSelector((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  useEffect(() => {
    return startTokenSynchronization();
  }, []);

  useEffect(() => {
    if (token && !profile) dispatch(restoreSession(token));
  }, [dispatch, profile, token]);

  useEffect(() => {
    if (location.pathname === APP_ROUTES.Products) {
      dispatch(refreshProducts());
    }
  }, [dispatch, location.pathname, token]);

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
          <Route path={APP_ROUTES.Login} element={<SignupPage />} />
          <Route path={APP_ROUTES.Products} element={<ProductsRoute />}>
            <Route element={<ProtectedRoute />}>
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
  <NavLink className={({ isActive }) => `header__navButton ${isActive ? 'header__navButton--active' : ''}`} to={to}>
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
