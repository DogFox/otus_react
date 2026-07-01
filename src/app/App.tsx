import React from 'react';
import { useTranslation } from 'react-i18next';
import { LangProvider } from './providers/LangProvider/LangProvider';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider';
import './styles/themes.css';
import './App.css';
import { Header } from '../shared/ui/Header/Header';
import { InfiniteProductList } from '../widgets/ProductList/InfiniteProductList';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <Header title="Homework 6" />
      <main className="App-main">
        <p className="App-welcome">{t('welcome')}</p>
        <section className="App-section">
          <h2 className="App-sectionTitle">{t('productListTitle')}</h2>
          <InfiniteProductList />
        </section>
      </main>
    </div>
  );
}

function AppWithProviders() {
  return (
    <ThemeProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </ThemeProvider>
  );
}

export default AppWithProviders;
