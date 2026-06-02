import React, { type FC } from 'react';
import './operationCard.css';

export interface OperationCardShortProps {
  amount: string;
  category: string;
  name: string;
  description: string;
}

export const OperationCardShort: FC<OperationCardShortProps> = ({ amount, category, name, description }) => {
  return (
    <div className="card">
      <div className="card__top">
        <div className="card__amount">{amount}</div>
        <div className="card__chip">{category}</div>
      </div>

      <div className="card__title">{name}</div>
      <div className="card__desc card__desc--clamp">{description}</div>
    </div>
  );
};

