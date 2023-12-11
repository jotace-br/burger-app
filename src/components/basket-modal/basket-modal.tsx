import { useCallback, useEffect, useState } from 'react';
import { Button } from '@components/button';
import { Basket } from '@components/basket';
import './basket-modal.css';
import { ThanksModal } from '@components/thanks-for-using-the-program-modal';

export interface BasketModalProps {
  isBasketOpen: boolean;
  onSetBasketOpen: () => void;
}

export const BasketModal = ({
  isBasketOpen,
  onSetBasketOpen,
}: BasketModalProps) => {
  const [isThanksModalOpen, setIsThanksModalOpen] = useState(false);

  const handleBasketOpen = useCallback(() => {
    onSetBasketOpen();
  }, [onSetBasketOpen]);

  useEffect(() => {
    if (isBasketOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isBasketOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isBasketOpen) {
        handleBasketOpen();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleBasketOpen, isBasketOpen, onSetBasketOpen]);

  const handleCheckoutNow = () => {
    setIsThanksModalOpen(true);
  };

  if (!isBasketOpen) return null;

  return (
    <>
      <div className='basket-modal-overlay'>
        <section className='checkout-container'>
          <Basket.Container>
            <Basket.Header
              headerName='Basket'
              hasCloseBtn
              onBasketBtn={handleBasketOpen}
            />
            <Basket.Content />
            <Basket.Footer />
            <div className='checkout-now-container'>
              <Button onClick={handleCheckoutNow}>Checkout now</Button>
            </div>
          </Basket.Container>
        </section>
      </div>

      <ThanksModal
        isOpen={isThanksModalOpen}
        onClose={() => setIsThanksModalOpen(false)}
      />
    </>
  );
};
