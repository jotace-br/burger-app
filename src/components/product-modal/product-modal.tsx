import { useCallback, useEffect, useState } from 'react';
import { CloseIcon } from '@assets/icons/close-icon';
import { NoImageIcon } from '@assets/icons/no-image-icon';
import { IMenuItem } from '@/types/menu';
import { numberToBRL } from '@helpers/format-number-to-brl';
import { MinusIcon } from '@assets/icons/minus-icon';
import { useWebSettings } from '@/theme-provider';
import { PlusIcon } from '@assets/icons/plus-icon';
import { ModifierSelector } from './components/modifier-selector';
import { SelectedModifier } from './components/modifier-selector/types';
import { findSelectedItemFromModifier } from '@helpers/find-selected-item-from-modifier';
import { Button } from '@components/button';
import { BtnQuantity } from '@components/button-quantity';
import './product-modal.css';
import { CheckoutObject } from '@/types/checkout';
import { useCheckout } from '@/contexts/checkout-content';
import { calculateTotalPrice } from '@helpers/calculate-total-price';

interface ProductModalProps {
  isProductModalOpen: boolean;
  onClose: () => void;
  selectedProduct: IMenuItem | undefined;
}

export const ProductModal = ({
  isProductModalOpen,
  onClose,
  selectedProduct,
}: ProductModalProps) => {
  const INITIAL_QUANTITY = 1;
  const webSettings = useWebSettings();
  const { addToCheckout } = useCheckout();

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [initialTotalPrice, setInitialTotalPrice] = useState<number>(
    selectedProduct?.price || 0
  );
  const [selectedModifier, setSelectedModifier] = useState<SelectedModifier>(
    {}
  );

  // Reset state and calculate total price when modal reopens
  useEffect(() => {
    if (isProductModalOpen && selectedProduct && selectedProduct.modifiers) {
      let totalPrice = selectedProduct.price || 0;

      selectedProduct.modifiers.forEach((modifier) => {
        const selectedItemId = selectedModifier[modifier.id];
        const selectedItem = findSelectedItemFromModifier({
          modifiers: selectedProduct.modifiers,
          modifierId: modifier.id,
          itemId: selectedItemId,
        }).selectedItem;

        if (selectedItem) {
          totalPrice += selectedItem.price;
        }
      });

      totalPrice *= quantity;

      setTotalPrice(totalPrice);
      setInitialTotalPrice(
        totalPrice - (totalPrice - selectedProduct.price * quantity)
      );
    }
  }, [isProductModalOpen, selectedProduct, quantity, selectedModifier]);

  // Without that, the totalPrice doesn't reset
  useEffect(() => {
    if (selectedProduct) {
      setInitialTotalPrice(selectedProduct.price || 0);
      setTotalPrice(selectedProduct.price || 0);
    }
  }, [selectedProduct]);

  const handleResetModal = useCallback(() => {
    setQuantity(INITIAL_QUANTITY);
    if (selectedProduct) {
      setTotalPrice(initialTotalPrice * INITIAL_QUANTITY);
    }
    if (selectedProduct?.modifiers) {
      setSelectedModifier({});
    }
  }, [initialTotalPrice, selectedProduct]);

  useEffect(() => {
    if (isProductModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
      handleResetModal();
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isProductModalOpen, handleResetModal]);

  if (!isProductModalOpen) {
    return null;
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleModifierSelection = (modifierId: number, itemId: number) => {
    setSelectedModifier((prevSelectedModifier) => ({
      ...prevSelectedModifier,
      [modifierId]: itemId,
    }));
  };

  const updateQuantityAndPrice = (newQuantity: number) => {
    setQuantity(newQuantity);
    setTotalPrice(
      calculateTotalPrice({
        selectedProduct,
        selectedModifier,
        quantity: newQuantity,
      })
    );
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateQuantityAndPrice(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity - 1;
      updateQuantityAndPrice(newQuantity);
      return newQuantity;
    });
  };

  const handleCloseModalClick = () => {
    onClose();
  };

  const handleAddToOrder = () => {
    let price = selectedProduct?.price;
    let modifier;

    if (selectedProduct?.modifiers) {
      const selectedModifierId = Number(Object.keys(selectedModifier)[0]);
      const selectedModifierItemId = Number(Object.values(selectedModifier)[0]);

      const { selectedItem: selectedModifierItemObj } =
        findSelectedItemFromModifier({
          modifiers: selectedProduct.modifiers,
          modifierId: selectedModifierId,
          itemId: selectedModifierItemId,
        });

      if (selectedModifierItemObj) {
        price = selectedModifierItemObj.price;
        modifier = selectedModifierItemObj;
      }
    }

    const formattedCheckoutObj: CheckoutObject = {
      refIdProduct: selectedProduct?.id,
      name: selectedProduct?.name,
      price,
      quantity,
      modifierProps: selectedProduct?.modifiers ? modifier : undefined,
      totalPrice: totalPrice,
      otherProps: selectedProduct,
    };

    addToCheckout(formattedCheckoutObj);
    handleCloseModalClick();
  };

  if (!isProductModalOpen || !selectedProduct) {
    return null;
  }

  return (
    <div className='modal-overlay' onClick={handleCloseModalClick}>
      <div className='modal-content' onClick={stopPropagation}>
        <button className='modal-close-button' onClick={handleCloseModalClick}>
          <CloseIcon />
        </button>

        {selectedProduct?.images ? (
          <img
            className='product-photo'
            src={selectedProduct?.images[0].image}
            alt={selectedProduct?.name}
            width='100%'
            height='320px'
            loading='lazy'
          />
        ) : (
          <div className='no-photo'>
            <NoImageIcon />
          </div>
        )}
        <div className='modal-content-container'>
          <div className='modal-content-product-info'>
            <h2 className='modal-title'>{selectedProduct?.name}</h2>
            <p className='modal-description'>
              {selectedProduct?.description
                ? selectedProduct?.description
                : 'Sem descrição adicional.'}
            </p>
          </div>

          <section className='modal-modifier-selector'>
            <ModifierSelector
              modifiers={selectedProduct?.modifiers}
              selectedModifier={selectedModifier}
              onSelectModifier={handleModifierSelection}
            />
          </section>
        </div>

        <div className='bottom-container'>
          <div className='quantity-control'>
            <BtnQuantity onClick={handleDecrement} disabled={quantity <= 1}>
              <MinusIcon
                bgColor={quantity > 1 ? webSettings?.primaryColour : '#DADADA'}
                minusIconColor={quantity > 1 ? 'white' : '#5F5F5F'}
              />
            </BtnQuantity>
            <span className='quantity-value'>{quantity}</span>
            <BtnQuantity onClick={handleIncrement}>
              <PlusIcon />
            </BtnQuantity>
          </div>
          <Button
            disabled={
              selectedProduct?.modifiers
                ? !Object.keys(selectedModifier).length
                : false
            }
            $bgColor={webSettings?.primaryColour}
            onClick={handleAddToOrder}
          >
            {selectedProduct?.modifiers && !Object.keys(selectedModifier).length
              ? 'Select a modifier'
              : 'Add to Order • '}
            {numberToBRL(totalPrice || selectedProduct?.price)}
          </Button>
        </div>
      </div>
    </div>
  );
};
