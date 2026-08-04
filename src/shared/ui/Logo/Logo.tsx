import React, { type FC } from 'react';
import './logo.css';

export interface LogoProps {
  text?: string;
}

export const Logo: FC<LogoProps> = ({ text = 'DogFox' }) => {
  return (
    <div className="logo" aria-label="Логотип">
      <div className="logo__mark" aria-hidden="true" />
      <div className="logo__text">{text}</div>
    </div>
  );
};
