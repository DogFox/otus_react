import type { IDiscountDatabase } from './IDiscountDatabase';
import type { IAccountService } from './IAccountService';
import type { ProductType, UserType } from './types';
import { validateDiscount } from './validateDiscount';

export class AccountService implements IAccountService {
  constructor(private readonly database: IDiscountDatabase) {}

  setGeneralDiscount(userType: UserType, discount: number): void {
    validateDiscount(discount);
    this.database.setUserDiscount(userType, discount);
  }

  getGeneralDiscount(userType: UserType): number {
    return this.database.getUserDiscount(userType) ?? 0;
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    validateDiscount(discount);
    this.database.setProductDiscount(userType, productType, discount);
  }

  getProductDiscount(userType: UserType, productType: ProductType): number {
    return this.database.getProductDiscount(userType, productType) ?? 0;
  }

  calculateTotalDiscount(userType: UserType, productType: ProductType): number {
    return this.getGeneralDiscount(userType) + this.getProductDiscount(userType, productType);
  }
}
