import React, { type FC, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '../Logo/Logo';
import { LangSwitcher } from '../../LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from '../../ThemeSwitcher/ThemeSwitcher';
import './header.css';

export interface HeaderProps {
  title?: string;
  actions?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ title = 'Dashboard', actions }) => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <Logo text={t('appTitle')} />
          <div className="header__title">{title}</div>
        </div>
        <div className="header__right">
          {actions}
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
};
