import type { ProductType } from '../../../services/account/types';

export const getProductTypeFromCategoryName = (categoryName: string): ProductType | null => {
  switch (categoryName) {
    case 'Car':
      return 'Car';
    case 'Toy':
      return 'Toy';
    case 'Food':
      return 'Food';
    default:
      return null;
  }
};

