import React, { type FC } from 'react';
import type { Operation } from '../../homeworks/ts1/3_write';
import { OperationCardFull } from '../../entities/finance/OperationCard/OperationCardFull';
import { OperationCardShort } from '../../entities/finance/OperationCard/OperationCardShort';
import { mapOperationToFullProps, mapOperationToShortProps } from '../../entities/finance/lib/mapOperationToCard';
import './operationList.css';

export type OperationListVariant = 'short' | 'full';

export interface OperationListProps {
  items: Operation[];
  variant?: OperationListVariant;
}

export const OperationList: FC<OperationListProps> = ({ items, variant = 'short' }) => {
  return (
    <ul className="operationList">
      {items.map((operation) => (
        <li key={operation.id} className="operationList__item">
          {variant === 'full' ? (
            <OperationCardFull {...mapOperationToFullProps(operation)} />
          ) : (
            <OperationCardShort {...mapOperationToShortProps(operation)} />
          )}
        </li>
      ))}
    </ul>
  );
};
