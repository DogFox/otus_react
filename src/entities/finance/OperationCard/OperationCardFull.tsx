import React, { type FC } from 'react';
import './operationCard.css';

export interface OperationCardFullProps {
  amount: string;
  category: string;
  name: string;
  title: string;
  description: string;
  date: string;
}

export const OperationCardFull: FC<OperationCardFullProps> = ({ amount, category, name, title, description, date }) => {
  return (
    <div className="card">
      <div className="card__top">
        <div className="card__amount">{amount}</div>
        <div className="card__chip">{category}</div>
      </div>

      <div className="card__title">{title}</div>
      <div className="card__name">{name}</div>
      <div className="card__desc">{description}</div>

      <div className="card__meta">
        <div>{date}</div>
        <button className="card__btn" type="button" disabled>
          Редактировать
        </button>
      </div>
    </div>
  );
};

