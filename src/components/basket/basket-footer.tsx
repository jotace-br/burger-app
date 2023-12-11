import { useCheckout } from '@/contexts/checkout-content';
import './basket-footer.css';
import { sumTotalPrices } from '@/helpers/sum-total-prices';
import { useEffect, useState } from 'react';

export const BasketFooter = () => {
  const { checkoutList } = useCheckout();
  const [total, setTotal] = useState<string>();

  useEffect(() => {
    setTotal(sumTotalPrices(checkoutList));
  }, [checkoutList]);

  return (
    !!checkoutList?.length && (
      <div className='checkout-footer'>
        <div className='footer-subtotal'>
          <p>Sub total</p>
          <p>{total}</p>
        </div>
        <div className='footer-divider' />
        <div className='footer-total'>
          <p>Total:</p>
          <p>{total}</p>
        </div>
      </div>
    )
  );
};
