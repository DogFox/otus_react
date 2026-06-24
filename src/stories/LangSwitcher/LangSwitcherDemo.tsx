import React from 'react';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../../shared/LangSwitcher/LangSwitcher';

export function LangSwitcherDemo() {
  const { t } = useTranslation();

  return (
    <div style={{ padding: 24 }}>
      <LangSwitcher />
      <p style={{ marginTop: 16, fontSize: 18 }}>{t('welcome')}</p>
      <p style={{ color: 'var(--color-text-secondary)' }}>{t('appTitle')}</p>
    </div>
  );
}
