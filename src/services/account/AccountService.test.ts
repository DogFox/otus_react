import { AccountService } from './AccountService';
import type { IDiscountDatabase } from './IDiscountDatabase';
import { InMemoryDiscountDatabase } from './InMemoryDiscountDatabase';
import { ProductType, UserType } from './types';

const createMockDatabase = (): jest.Mocked<IDiscountDatabase> => ({
  setUserDiscount: jest.fn(),
  getUserDiscount: jest.fn(),
  setProductDiscount: jest.fn(),
  getProductDiscount: jest.fn(),
});

describe('AccountService', () => {
  describe('general discounts', () => {
    it.each([
      [UserType.Standard, 5],
      [UserType.Premium, 10],
      [UserType.Gold, 15],
      [UserType.Free, 0],
    ])('sets and reads general discount for %s user type', (userType, discount) => {
      const database = new InMemoryDiscountDatabase();
      const service = new AccountService(database);

      service.setGeneralDiscount(userType, discount);

      expect(service.getGeneralDiscount(userType)).toBe(discount);
    });

    it('persists general discounts in database', () => {
      const database = createMockDatabase();
      const service = new AccountService(database);

      service.setGeneralDiscount(UserType.Premium, 12);

      expect(database.setUserDiscount).toHaveBeenCalledWith(UserType.Premium, 12);
    });

    it('reads general discount from database', () => {
      const database = createMockDatabase();
      database.getUserDiscount.mockReturnValue(7);
      const service = new AccountService(database);

      expect(service.getGeneralDiscount(UserType.Gold)).toBe(7);
      expect(database.getUserDiscount).toHaveBeenCalledWith(UserType.Gold);
    });

    it('returns 0 when general discount is not set', () => {
      const database = createMockDatabase();
      database.getUserDiscount.mockReturnValue(null);
      const service = new AccountService(database);

      expect(service.getGeneralDiscount(UserType.Standard)).toBe(0);
    });

    it.each([-1, 101])('throws when general discount is invalid (%s)', (discount) => {
      const service = new AccountService(new InMemoryDiscountDatabase());

      expect(() => service.setGeneralDiscount(UserType.Standard, discount)).toThrow(
        'Discount must be between 0 and 100'
      );
    });
  });

  describe('product discounts', () => {
    it.each([
      [UserType.Standard, ProductType.Car, 3],
      [UserType.Premium, ProductType.Toy, 7],
      [UserType.Gold, ProductType.Food, 12],
      [UserType.Free, ProductType.Car, 0],
    ])('sets and reads product discount for %s and %s', (userType, productType, discount) => {
      const database = new InMemoryDiscountDatabase();
      const service = new AccountService(database);

      service.setProductDiscount(userType, productType, discount);

      expect(service.getProductDiscount(userType, productType)).toBe(discount);
    });

    it('stores different discounts for different product types of the same user', () => {
      const service = new AccountService(new InMemoryDiscountDatabase());

      service.setProductDiscount(UserType.Premium, ProductType.Car, 4);
      service.setProductDiscount(UserType.Premium, ProductType.Toy, 6);
      service.setProductDiscount(UserType.Premium, ProductType.Food, 8);

      expect(service.getProductDiscount(UserType.Premium, ProductType.Car)).toBe(4);
      expect(service.getProductDiscount(UserType.Premium, ProductType.Toy)).toBe(6);
      expect(service.getProductDiscount(UserType.Premium, ProductType.Food)).toBe(8);
    });

    it('stores different discounts for different user types on the same product', () => {
      const service = new AccountService(new InMemoryDiscountDatabase());

      service.setProductDiscount(UserType.Standard, ProductType.Car, 2);
      service.setProductDiscount(UserType.Gold, ProductType.Car, 9);

      expect(service.getProductDiscount(UserType.Standard, ProductType.Car)).toBe(2);
      expect(service.getProductDiscount(UserType.Gold, ProductType.Car)).toBe(9);
    });

    it('persists product discounts in database', () => {
      const database = createMockDatabase();
      const service = new AccountService(database);

      service.setProductDiscount(UserType.Gold, ProductType.Food, 5);

      expect(database.setProductDiscount).toHaveBeenCalledWith(UserType.Gold, ProductType.Food, 5);
    });

    it('reads product discount from database', () => {
      const database = createMockDatabase();
      database.getProductDiscount.mockReturnValue(11);
      const service = new AccountService(database);

      expect(service.getProductDiscount(UserType.Premium, ProductType.Toy)).toBe(11);
      expect(database.getProductDiscount).toHaveBeenCalledWith(UserType.Premium, ProductType.Toy);
    });

    it('returns 0 when product discount is not set', () => {
      const database = createMockDatabase();
      database.getProductDiscount.mockReturnValue(null);
      const service = new AccountService(database);

      expect(service.getProductDiscount(UserType.Standard, ProductType.Food)).toBe(0);
    });

    it.each([-5, 150])('throws when product discount is invalid (%s)', (discount) => {
      const service = new AccountService(new InMemoryDiscountDatabase());

      expect(() => service.setProductDiscount(UserType.Premium, ProductType.Car, discount)).toThrow(
        'Discount must be between 0 and 100'
      );
    });
  });

  describe('total discount calculation', () => {
    it('returns only general discount when product discount is not set', () => {
      const service = new AccountService(new InMemoryDiscountDatabase());
      service.setGeneralDiscount(UserType.Premium, 10);

      expect(service.calculateTotalDiscount(UserType.Premium, ProductType.Car)).toBe(10);
    });

    it('returns only product discount when general discount is not set', () => {
      const service = new AccountService(new InMemoryDiscountDatabase());
      service.setProductDiscount(UserType.Gold, ProductType.Toy, 8);

      expect(service.calculateTotalDiscount(UserType.Gold, ProductType.Toy)).toBe(8);
    });

    it('sums general and product discounts', () => {
      const service = new AccountService(new InMemoryDiscountDatabase());
      service.setGeneralDiscount(UserType.Gold, 10);
      service.setProductDiscount(UserType.Gold, ProductType.Car, 5);

      expect(service.calculateTotalDiscount(UserType.Gold, ProductType.Car)).toBe(15);
    });

    it('returns 0 when no discounts are configured', () => {
      const service = new AccountService(new InMemoryDiscountDatabase());

      expect(service.calculateTotalDiscount(UserType.Free, ProductType.Food)).toBe(0);
    });

    it('calculates total discount using database values', () => {
      const database = createMockDatabase();
      database.getUserDiscount.mockReturnValue(6);
      database.getProductDiscount.mockReturnValue(4);
      const service = new AccountService(database);

      expect(service.calculateTotalDiscount(UserType.Standard, ProductType.Food)).toBe(10);
    });
  });
});

describe('InMemoryDiscountDatabase', () => {
  it('stores and returns user discounts', () => {
    const database = new InMemoryDiscountDatabase();

    database.setUserDiscount(UserType.Premium, 10);

    expect(database.getUserDiscount(UserType.Premium)).toBe(10);
    expect(database.getUserDiscount(UserType.Standard)).toBeNull();
  });

  it('stores and returns product discounts', () => {
    const database = new InMemoryDiscountDatabase();

    database.setProductDiscount(UserType.Gold, ProductType.Car, 7);

    expect(database.getProductDiscount(UserType.Gold, ProductType.Car)).toBe(7);
    expect(database.getProductDiscount(UserType.Gold, ProductType.Toy)).toBeNull();
  });

  it('overwrites existing discounts', () => {
    const database = new InMemoryDiscountDatabase();

    database.setUserDiscount(UserType.Standard, 5);
    database.setUserDiscount(UserType.Standard, 9);

    expect(database.getUserDiscount(UserType.Standard)).toBe(9);
  });
});
