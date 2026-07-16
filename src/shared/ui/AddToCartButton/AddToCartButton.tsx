import React, { type FC } from 'react';
import './addToCartButton.css';

export interface AddToCartButtonProps {
  value: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({ value, onAdd, onRemove }) => {
  if (value <= 0) {
    return (
      <button className="atc__btn" type="button" onClick={onAdd}>
        В корзину
      </button>
    );
  }

  return (
    <div className="atc__stepper" aria-label="Количество товара">
      <button className="atc__stepperBtn" type="button" aria-label="Уменьшить" onClick={onRemove}>
        −
      </button>
      <input className="atc__input" type="text" value={value} readOnly aria-label="Количество" />
      <button className="atc__stepperBtn" type="button" aria-label="Увеличить" onClick={onAdd}>
        +
      </button>
    </div>
  );
};
