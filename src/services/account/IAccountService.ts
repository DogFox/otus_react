import type { ProductType, UserType } from './types';

export interface IAccountService {
  setGeneralDiscount(userType: UserType, discount: number): void;
  getGeneralDiscount(userType: UserType): number;
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
  getProductDiscount(userType: UserType, productType: ProductType): number;
  calculateTotalDiscount(userType: UserType, productType: ProductType): number;
}
