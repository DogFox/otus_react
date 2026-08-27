const MIN_DISCOUNT = 0;
const MAX_DISCOUNT = 100;

export const validateDiscount = (discount: number): void => {
  if (discount < MIN_DISCOUNT || discount > MAX_DISCOUNT) {
    throw new Error('Discount must be between 0 and 100');
  }
};
