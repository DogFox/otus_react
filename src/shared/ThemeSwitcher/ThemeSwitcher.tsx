import React from 'react';
import { useTheme } from '../../app/providers/ThemeProvider/ThemeContext';
import './themeSwitcher.css';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className="theme-switcher" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
