import type { Operation } from '../../../homeworks/ts1/3_write';
import { formatCurrency } from '../../shop/lib/formatCurrency';
import type { OperationCardFullProps } from '../OperationCard/OperationCardFull';
import type { OperationCardShortProps } from '../OperationCard/OperationCardShort';

function formatAmount(operation: Operation): string {
  const prefix = operation.type === 'Cost' ? '- ' : '+ ';
  return `${prefix}${formatCurrency(operation.amount)}`;
}

export function mapOperationToShortProps(operation: Operation): OperationCardShortProps {
  return {
    amount: formatAmount(operation),
    category: operation.category.name,
    name: operation.name,
    description: operation.desc ?? '',
  };
}

export function mapOperationToFullProps(operation: Operation): OperationCardFullProps {
  return {
    ...mapOperationToShortProps(operation),
    title: operation.type === 'Cost' ? 'Расход' : 'Доход',
    date: operation.createdAt.slice(0, 10),
  };
}
