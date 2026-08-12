import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LangProvider } from './providers/LangProvider/LangProvider';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider';
import { CartProvider } from '../entities/shop/lib/CartContext';
import { AuthFormConnected } from '../features/forms/AuthForm';
import { ProductFormConnected } from '../features/forms/ProductForm';
import { ProfileFormConnected } from '../features/forms/ProfileForm';
import './styles/themes.css';
import './App.css';
import { Header } from '../shared/ui/Header/Header';
import { Modal } from '../shared/ui/Modal/Modal';
import { InfiniteProductList } from '../widgets/ProductList/InfiniteProductList';

type OpenForm = 'auth' | 'profile' | 'product' | null;

function App() {
  const { t } = useTranslation();
  const [openForm, setOpenForm] = useState<OpenForm>(null);

  const closeForm = () => setOpenForm(null);

  return (
    <div className="App">
      <Header
        title="Homework 7"
        actions={
          <>
            <button className="App-actionBtn" type="button" onClick={() => setOpenForm('auth')}>
              {t('openAuthForm')}
            </button>
            <button className="App-actionBtn" type="button" onClick={() => setOpenForm('profile')}>
              {t('openProfileForm')}
            </button>
          </>
        }
      />
      <main className="App-main">
        <p className="App-welcome">{t('welcome')}</p>

        <section className="App-section">
          <div className="App-sectionHeader">
            <h2 className="App-sectionTitle">{t('productListTitle')}</h2>
            <button className="App-actionBtn App-actionBtn--primary" type="button" onClick={() => setOpenForm('product')}>
              {t('openProductForm')}
            </button>
          </div>
          <InfiniteProductList />
        </section>
      </main>

      <Modal visible={openForm === 'auth'} onClose={closeForm} title={t('authFormTitle')}>
        <AuthFormConnected />
      </Modal>

      <Modal visible={openForm === 'profile'} onClose={closeForm} title={t('profileFormTitle')}>
        <ProfileFormConnected />
      </Modal>

      <Modal visible={openForm === 'product'} onClose={closeForm} title={t('productFormTitle')}>
        <ProductFormConnected submitLabel={t('productFormSubmit')} />
      </Modal>
    </div>
  );
}

function AppWithProviders() {
  return (
    <ThemeProvider>
      <LangProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LangProvider>
    </ThemeProvider>
  );
}

export default AppWithProviders;
