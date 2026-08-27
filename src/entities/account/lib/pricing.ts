import type { IAccountService } from '../../../services/account/IAccountService';
import type { ProductType, UserType } from '../../../services/account/types';

export const applyDiscount = (price: number, discountPercent: number): number => {
  if (discountPercent <= 0) {
    return price;
  }

  return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
};

export const getDiscountedPrice = (
  price: number,
  productType: ProductType,
  accountService: IAccountService,
  userType: UserType
): number => {
  const totalDiscount = accountService.calculateTotalDiscount(userType, productType);

  return applyDiscount(price, totalDiscount);
};
