export const formatCurrency = (amount: number): string => {
  return Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'SGD',
  }).format(amount);
};
