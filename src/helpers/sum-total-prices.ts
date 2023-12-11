import { CheckoutObject } from '@/types/checkout';
import { numberToBRL } from './format-number-to-brl';

export const sumTotalPrices = (data?: CheckoutObject[]) => {
  if (!data) {
    return numberToBRL(0);
  }

  let totalPriceSum = 0;
  for (const item of data) {
    if (item.totalPrice !== undefined) {
      totalPriceSum += item.totalPrice;
    }
  }
  return numberToBRL(totalPriceSum);
};
