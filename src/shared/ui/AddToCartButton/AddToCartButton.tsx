import React, { type FC } from 'react';
import './addToCartButton.css';

export interface AddToCartButtonProps {
  count: number;
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({ count }) => {
  if (count <= 0) {
    return (
      <button className="atc__btn" type="button" disabled>
        В корзину
      </button>
    );
  }

  return (
    <div className="atc__stepper" aria-label="Количество товара">
      <button className="atc__stepperBtn" type="button" aria-label="Уменьшить" disabled>
        −
      </button>
      <input className="atc__input" type="text" value={count} readOnly aria-label="Количество" />
      <button className="atc__stepperBtn" type="button" aria-label="Увеличить" disabled>
        +
      </button>
    </div>
  );
};

