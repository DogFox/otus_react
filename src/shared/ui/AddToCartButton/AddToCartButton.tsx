import React, { type FC, type MouseEvent } from 'react';
import './addToCartButton.css';

export interface AddToCartButtonProps {
  value: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({ value, onAdd, onRemove }) => {
  const runWithoutOpeningCard = (callback: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    callback();
  };

  if (value <= 0) {
    return (
      <button className="atc__btn" type="button" onClick={runWithoutOpeningCard(onAdd)}>
        Add to cart
      </button>
    );
  }

  return (
    <div className="atc__stepper" aria-label="Product quantity" onClick={(event) => event.stopPropagation()}>
      <button className="atc__stepperBtn" type="button" aria-label="Remove from cart" onClick={runWithoutOpeningCard(onRemove)}>
        -
      </button>
      <input className="atc__input" type="text" value={value} readOnly aria-label="Quantity" />
      <button className="atc__stepperBtn" type="button" aria-label="Increase quantity" onClick={runWithoutOpeningCard(onAdd)}>
        +
      </button>
    </div>
  );
};
