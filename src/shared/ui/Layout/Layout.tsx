import React, { type FC, type ReactNode } from 'react';
import { Header } from '../Header/Header';
import './layout.css';

export interface LayoutProps {
  children: ReactNode;
  headerTitle?: string;
}

export const Layout: FC<LayoutProps> = ({ children, headerTitle }) => {
  return (
    <div className="layout">
      <Header title={headerTitle} />
      <main className="layout__main">{children}</main>
    </div>
  );
};
