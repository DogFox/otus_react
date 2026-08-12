import { AccountService, InMemoryDiscountDatabase, ProductType, UserType } from '../../../services/account';
import { applyDiscount, getDiscountedPrice } from './pricing';

describe('pricing', () => {
  it('applies discount to price', () => {
    expect(applyDiscount(1000, 10)).toBe(900);
    expect(applyDiscount(1000, 0)).toBe(1000);
  });

  it('calculates discounted price using account service', () => {
    const database = new InMemoryDiscountDatabase();
    const accountService = new AccountService(database);

    accountService.setGeneralDiscount(UserType.Premium, 10);
    accountService.setProductDiscount(UserType.Premium, ProductType.Car, 5);

    expect(getDiscountedPrice(20000, ProductType.Car, accountService, UserType.Premium)).toBe(17000);
  });
});
