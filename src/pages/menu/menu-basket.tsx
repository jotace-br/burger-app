import './menu-basket.css';
import { Button } from '@/components/button';
import { useState } from 'react';
import { BasketModal } from '@/components/basket-modal';
import { Basket } from '@components/basket';
import { useCheckout } from '@/contexts/checkout-content';

export const MenuBasket = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalQuantity } = useCheckout();

  const handleCloseModalClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className='basket-pc-container'>
        <Basket.Container>
          <Basket.Header headerName='Carrinho' />
          <Basket.Content />
          <Basket.Footer />
        </Basket.Container>
      </section>

      {getTotalQuantity() >= 1 && (
        <div className='basket-mobile-container'>
          <Button onClick={handleCloseModalClick}>
            Your basket • {getTotalQuantity()}{' '}
            {getTotalQuantity() > 1 ? 'items' : 'item'}
          </Button>
        </div>
      )}

      <BasketModal
        isBasketOpen={isOpen}
        onSetBasketOpen={() => setIsOpen(!isOpen)}
      />
    </>
  );
};
