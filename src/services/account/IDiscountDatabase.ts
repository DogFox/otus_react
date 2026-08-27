import type { ProductType, UserType } from './types';

export interface IDiscountDatabase {
  setUserDiscount(userType: UserType, discount: number): void;
  getUserDiscount(userType: UserType): number | null;
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
  getProductDiscount(userType: UserType, productType: ProductType): number | null;
}
