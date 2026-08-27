import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AccountService, InMemoryDiscountDatabase, ProductType, UserType } from '../../../services/account';

export interface AccountContextValue {
  accountService: AccountService;
  userType: UserType;
  setUserType: (userType: UserType) => void;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
}

const seedDiscounts = (service: AccountService) => {
  service.setGeneralDiscount(UserType.Standard, 5);
  service.setGeneralDiscount(UserType.Premium, 10);
  service.setGeneralDiscount(UserType.Gold, 15);
  service.setGeneralDiscount(UserType.Free, 0);

  service.setProductDiscount(UserType.Standard, ProductType.Car, 2);
  service.setProductDiscount(UserType.Standard, ProductType.Toy, 1);
  service.setProductDiscount(UserType.Standard, ProductType.Food, 3);

  service.setProductDiscount(UserType.Premium, ProductType.Car, 4);
  service.setProductDiscount(UserType.Premium, ProductType.Toy, 2);
  service.setProductDiscount(UserType.Premium, ProductType.Food, 5);

  service.setProductDiscount(UserType.Gold, ProductType.Car, 6);
  service.setProductDiscount(UserType.Gold, ProductType.Toy, 3);
  service.setProductDiscount(UserType.Gold, ProductType.Food, 7);

  service.setProductDiscount(UserType.Free, ProductType.Car, 0);
  service.setProductDiscount(UserType.Free, ProductType.Toy, 0);
  service.setProductDiscount(UserType.Free, ProductType.Food, 0);
};

export function AccountProvider({ children }: AccountProviderProps) {
  const [userType, setUserTypeState] = useState<UserType>(UserType.Premium);

  const accountService = useMemo(() => {
    const database = new InMemoryDiscountDatabase();
    return new AccountService(database);
  }, []);

  useEffect(() => {
    seedDiscounts(accountService);
  }, [accountService]);

  const setUserType = useCallback((next: UserType) => setUserTypeState(next), []);

  const value = useMemo<AccountContextValue>(
    () => ({
      accountService,
      userType,
      setUserType,
    }),
    [accountService, setUserType, userType],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export const useAccount = (): AccountContextValue => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within AccountProvider');
  }
  return context;
};

