import { INFLATE_CURRENCY } from '../constants';

export const formatCurrency = (amount: number): string => {
  return Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'SGD',
  }).format(amount);
};

export const inflateCurrency = (amount: number) => {
  return amount * INFLATE_CURRENCY;
};

export const deflateCurrency = (amount: number) => {
  return amount / INFLATE_CURRENCY;
};
