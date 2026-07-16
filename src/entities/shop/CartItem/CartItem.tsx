import React, { type FC } from 'react';
import './cartItem.css';

export interface CartItemProps {
  title: string;
  subtitle?: string;
}

export const CartItem: FC<CartItemProps> = ({ title, subtitle }) => {
  return (
    <div className="cartItem">
      <div>
        <div className="cartItem__title">{title}</div>
        {subtitle ? <div className="cartItem__subtitle">{subtitle}</div> : null}
      </div>
      <div className="cartItem__actions">
        <button className="cartItem__remove" type="button" disabled>
          Удалить
        </button>
      </div>
    </div>
  );
};
