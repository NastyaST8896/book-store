const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formatPrice = (price: string) => {
  return `${priceFormatter.format(+price)} USD`;
};
