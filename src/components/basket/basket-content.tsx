import { BasketItem } from '../basket';
import { useCheckout } from '@/contexts/checkout-content';

export const BasketContent = () => {
  const { checkoutList } = useCheckout();

  return (
    <div className='checkout-content'>
      {checkoutList?.length ? (
        checkoutList?.map((basketItem) => (
          <BasketItem key={basketItem.refIdProduct} basketItem={basketItem} />
        ))
      ) : (
        <div className='empty-basket'>Seu carrinho está vazio</div>
      )}
    </div>
  );
};
