import type { IDiscountDatabase } from './IDiscountDatabase';
import type { ProductType, UserType } from './types';

const createProductDiscountKey = (userType: UserType, productType: ProductType): string => `${userType}:${productType}`;

export class InMemoryDiscountDatabase implements IDiscountDatabase {
  private readonly userDiscounts = new Map<UserType, number>();

  private readonly productDiscounts = new Map<string, number>();

  setUserDiscount(userType: UserType, discount: number): void {
    this.userDiscounts.set(userType, discount);
  }

  getUserDiscount(userType: UserType): number | null {
    return this.userDiscounts.get(userType) ?? null;
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    this.productDiscounts.set(createProductDiscountKey(userType, productType), discount);
  }

  getProductDiscount(userType: UserType, productType: ProductType): number | null {
    return this.productDiscounts.get(createProductDiscountKey(userType, productType)) ?? null;
  }
}
