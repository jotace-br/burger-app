import { useEffect, useState } from 'react';
import { CloseIcon } from '@assets/icons/close-icon';
import { NoImageIcon } from '@assets/icons/no-image-icon';
import { IMenuItem } from '@/types/menu';
import { numberToBRL } from '@helpers/format-number-to-brl';
import { MinusIcon } from '@assets/icons/minus-icon';
import { useWebSettings } from '@/theme-provider';
import { PlusIcon } from '@assets/icons/plus-icon';
import { ModifierSelector } from '@components/modifier-selector';
import { SelectedModifier } from '@components/modifier-selector/types';
import { findSelectedItemFromModifier } from '@helpers/find-selected-item-from-modifier';
import { Button } from '@components/button';
import { BtnQuantity } from '@components/button-quantity';
import './product-edit-modal.css';
import { CheckoutObject } from '@/types/checkout';
import { useCheckout } from '@/contexts/checkout-content';
import { calculateTotalPrice } from '@helpers/calculate-total-price';

interface ProductEditModalProps {
  isProductModalOpen: boolean;
  onClose: () => void;
  selectedProductToEdit?: IMenuItem;
}

export const ProductEditModal = ({
  isProductModalOpen,
  onClose,
  selectedProductToEdit,
}: ProductEditModalProps) => {
  const INITIAL_QUANTITY = 1;
  const webSettings = useWebSettings();
  const { updateCheckoutProduct } = useCheckout();

  const [quantity, setQuantity] = useState(
    selectedProductToEdit?.quantity || INITIAL_QUANTITY
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedModifier, setSelectedModifier] = useState<SelectedModifier>(
    () => {
      const itemId = Number(selectedProductToEdit?.modifierProps?.id);
      const modifierId = Number(selectedProductToEdit?.modifiers?.[0]?.id);
      return { [modifierId]: itemId };
    }
  );

  useEffect(() => {
    if (isProductModalOpen && selectedProductToEdit?.quantity) {
      setQuantity(selectedProductToEdit.quantity);
      setTotalPrice(
        calculateTotalPrice({
          selectedProduct: selectedProductToEdit,
          selectedModifier,
          quantity: selectedProductToEdit.quantity,
        })
      );

      const itemId = Number(selectedProductToEdit?.modifierProps?.id);
      const modifierId = Number(selectedProductToEdit?.modifiers?.[0]?.id);
      setSelectedModifier({ [modifierId]: itemId });
    }
  }, [isProductModalOpen, selectedProductToEdit]);

  useEffect(() => {
    if (isProductModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isProductModalOpen]);

  if (!isProductModalOpen) {
    return null;
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleModifierSelection = (modifierId: number, itemId: number) => {
    const updatedSelectedModifier = { ...selectedModifier };
    updatedSelectedModifier[modifierId] = itemId;
    setSelectedModifier(updatedSelectedModifier);
    setTotalPrice(
      calculateTotalPrice({
        selectedProduct: selectedProductToEdit,
        selectedModifier: updatedSelectedModifier,
        quantity,
      })
    );
  };

  const updateQuantityAndPrice = (newQuantity: number) => {
    setQuantity(newQuantity);
    setTotalPrice(
      calculateTotalPrice({
        selectedProduct: selectedProductToEdit,
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

  const handleUpdateOrder = () => {
    let price = selectedProductToEdit?.price;
    let modifier;

    if (selectedProductToEdit?.modifiers) {
      const selectedModifierId = Number(Object.keys(selectedModifier || {})[0]);
      const selectedModifierItemId = Number(
        Object.values(selectedModifier || {})[0]
      );

      const { selectedItem } = findSelectedItemFromModifier({
        modifiers: selectedProductToEdit.modifiers,
        modifierId: selectedModifierId,
        itemId: selectedModifierItemId,
      });

      if (selectedItem) {
        price = selectedItem.price;
        modifier = selectedItem;
      }
    }

    const formattedCheckoutObj: CheckoutObject = {
      refIdProduct: selectedProductToEdit?.id,
      name: selectedProductToEdit?.name,
      price,
      quantity,
      modifierProps: selectedProductToEdit?.modifiers ? modifier : undefined,
      totalPrice: totalPrice,
      otherProps: selectedProductToEdit,
    };

    updateCheckoutProduct(formattedCheckoutObj);

    handleCloseModalClick();
  };

  if (!isProductModalOpen || !selectedProductToEdit) {
    return null;
  }

  return (
    <div className='modal-overlay' onClick={handleCloseModalClick}>
      <div className='modal-content' onClick={stopPropagation}>
        <button className='modal-close-button' onClick={handleCloseModalClick}>
          <CloseIcon />
        </button>

        {selectedProductToEdit?.images ? (
          <img
            className='product-photo'
            src={selectedProductToEdit?.images[0].image}
            alt={selectedProductToEdit?.name}
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
            <h2 className='modal-title'>{selectedProductToEdit?.name}</h2>
            <p className='modal-description'>
              {selectedProductToEdit?.description
                ? selectedProductToEdit?.description
                : 'Sem descrição adicional.'}
            </p>
          </div>

          <section className='modal-modifier-selector'>
            <ModifierSelector
              modifiers={selectedProductToEdit?.modifiers}
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
              selectedProductToEdit?.modifiers
                ? !Object.keys(selectedModifier).length
                : false
            }
            $bgColor={webSettings?.primaryColour}
            onClick={handleUpdateOrder}
          >
            {selectedProductToEdit?.modifiers &&
            !Object.keys(selectedModifier).length
              ? 'Select a modifier • '
              : 'Update Order • '}
            {numberToBRL(totalPrice || selectedProductToEdit?.price)}
          </Button>
        </div>
      </div>
    </div>
  );
};
