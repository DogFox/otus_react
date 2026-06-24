import React, { type FC } from 'react';
import { Logo } from '../Logo/Logo';
import './header.css';

export interface HeaderProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({ title = 'Dashboard' }) => {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <div className="header__title">{title}</div>
      </div>
    </header>
  );
};

