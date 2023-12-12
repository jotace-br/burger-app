import { CheckoutObject } from '@/types/checkout';
import { numberToBRL } from '@helpers/format-number-to-brl';
import { BtnQuantity } from '@/components/button-quantity';
import { MinusIcon } from '@/assets/icons/minus-icon';
import { useWebSettings } from '@/theme-provider';
import { PlusIcon } from '@/assets/icons/plus-icon';
import './basket-item.css';
import { useCheckout } from '@/contexts/checkout-content';
import { TrashcanIcon } from '@/assets/icons/trashcan-icon';
import { useState } from 'react';
import { ProductEditModal } from '../product-edit-modal';
import { IMenu, IMenuItem } from '@/types/menu';
import { useDataFetcher } from '@/hooks/use-data-fetcher';
import { fetchMenuDetails } from '@/api/api';

export interface BasketItemProps {
  basketItem: CheckoutObject;
}

export const BasketItem = ({ basketItem }: BasketItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IMenuItem>();

  const { data } = useDataFetcher<IMenu>(fetchMenuDetails);
  const { editCheckoutQuantityItem, removeFromCheckout } = useCheckout();

  const webSettings = useWebSettings();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditModal = async (event: React.MouseEvent) => {
    const target = event.target as Element;
    const isClickInQuantityWrapper = target.closest('.basket-quantity-wrapper');

    if (isClickInQuantityWrapper) {
      return;
    }

    const selectedItem = await data?.sections
      ?.flatMap((section) => section.items)
      .find((item) => item.id === basketItem.refIdProduct);

    setModalContent({ ...selectedItem, ...basketItem } as IMenuItem);
    setIsModalOpen(!isModalOpen);
  };

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
    <>
      <div className='basket-item' onClick={handleEditModal}>
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

      <ProductEditModal
        isProductModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProductToEdit={modalContent}
        shouldResetUserScroll={false}
      />
    </>
  );
};
