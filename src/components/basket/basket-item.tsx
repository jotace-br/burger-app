import { CheckoutObject } from '@/types/checkout';
import { numberToBRL } from '@helpers/format-number-to-brl';
import { BtnQuantity } from '@/components/button-quantity';
import { MinusIcon } from '@/assets/icons/minus-icon';
import { useWebSettings } from '@/theme-provider';
import { PlusIcon } from '@/assets/icons/plus-icon';
import './basket-item.css';
import { useCheckout } from '@/contexts/checkout-content';
import { TrashcanIcon } from '@/assets/icons/trashcan-icon';

export interface BasketItemProps {
  basketItem: CheckoutObject;
}

export const BasketItem = ({ basketItem }: BasketItemProps) => {
  const { editCheckoutQuantityItem, removeFromCheckout } = useCheckout();

  const webSettings = useWebSettings();

  const handleIncrement = () => {
    if (basketItem.refIdProduct) {
      editCheckoutQuantityItem(
        basketItem.refIdProduct,
        basketItem.quantity + 1
      );
    }
  };

  const handleDecrement = () => {
    if (!basketItem.refIdProduct) {
      return;
    }

    if (basketItem.quantity > 1) {
      editCheckoutQuantityItem(
        basketItem.refIdProduct,
        basketItem.quantity - 1
      );
    }
  };

  const handleRemoveItem = () => {
    if (!basketItem.refIdProduct) {
      return;
    }

    if (basketItem.quantity === 1) {
      removeFromCheckout(basketItem.refIdProduct);
    }
  };

  const renderBasketDecrementBtn = () => {
    if (basketItem.quantity > 1) {
      return (
        <BtnQuantity $height='20px' $width='20px' onClick={handleDecrement}>
          <MinusIcon
            bgColor={webSettings?.primaryColour}
            minusIconColor={'white'}
          />
        </BtnQuantity>
      );
    }

    return (
      <BtnQuantity $height='20px' $width='20px' onClick={handleRemoveItem}>
        <TrashcanIcon />
      </BtnQuantity>
    );
  };

  return (
    <div className='basket-item'>
      <div className='basket-label-wrapper'>
        <p>{basketItem.name}</p>
        <p>{numberToBRL((basketItem.price || 0) * basketItem.quantity)}</p>
      </div>
      {basketItem.modifierProps && (
        <div className='basket-label-selected-modifier'>
          <p>{basketItem.modifierProps.name}</p>
        </div>
      )}

      <div className='basket-quantity-wrapper'>
        <div className='basket-quantity-controls'>
          {renderBasketDecrementBtn()}
          <span className='basket-quantity-value'>{basketItem.quantity}</span>
          <BtnQuantity $height='20px' $width='20px' onClick={handleIncrement}>
            <PlusIcon />
          </BtnQuantity>
        </div>
      </div>
    </div>
  );
};
