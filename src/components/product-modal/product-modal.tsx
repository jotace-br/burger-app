import { useCallback, useEffect, useMemo, useState } from 'react';
import { CloseIcon } from '../../assets/icons/close-icon';
import { NoImageIcon } from '../../assets/icons/no-image-icon';
import { IMenuItem } from '../../types/menu';
import './product-modal.css';
import { numberToBRL } from '../../helpers/format-number-to-brl';
import { MinusIcon } from '../../assets/icons/minus-icon';
import { useWebSettings } from '../../theme-provider';
import { PlusIcon } from '../../assets/icons/plus-icon';
import {
  ModifierSelector,
  SelectedModifier,
} from './components/modifier-selector/modifier-selector';
import { findSelectedItemFromModifier } from '../../helpers/find-selected-item-from-modifier';
import { Button } from '../button';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: IMenuItem | undefined;
}

export const ProductModal = ({
  isOpen,
  onClose,
  selectedProduct,
}: ProductModalProps) => {
  const INITIAL_QUANTITY = 1;
  const webSettings = useWebSettings();

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [initialTotalPrice, setInitialTotalPrice] = useState<number>(
    selectedProduct?.price || 0
  );
  const [selectedModifier, setSelectedModifier] = useState<SelectedModifier>(
    {}
  );

  const calculateTotalPrice = useMemo(
    () => (newQuantity: number) => {
      let totalPrice = initialTotalPrice;

      if (selectedProduct && selectedProduct.modifiers) {
        // Recalculate total price based on selected modifiers and quantity
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
      }

      return totalPrice * newQuantity;
    },
    [initialTotalPrice, selectedModifier, selectedProduct]
  );

  // Reset state and calculate total price when modal reopens
  useEffect(() => {
    if (isOpen && selectedProduct && selectedProduct.modifiers) {
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
  }, [isOpen, selectedProduct, quantity, selectedModifier]);

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

  // Hide overflow when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
      handleResetModal();
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, handleResetModal]);

  if (!isOpen) {
    return null;
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent the click from propagating to the overlay
  };

  const handleModifierSelection = (modifierId: number, itemId: number) => {
    const updatedSelectedModifier = { ...selectedModifier };
    updatedSelectedModifier[modifierId] = itemId;
    setSelectedModifier(updatedSelectedModifier);
  };

  const updateQuantityAndPrice = (newQuantity: number) => {
    setQuantity(newQuantity);
    setTotalPrice(calculateTotalPrice(newQuantity));
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
    // TODO: ADD CHECKOUT CONTEXT TO MAKE THIS THING PRETTY OMG
    let price = selectedProduct?.price;

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
      }
    }

    const formattedCheckoutObj = {
      refIdProduct: selectedProduct?.id,
      name: selectedProduct?.name,
      price,
      quantity,
      totalPrice: totalPrice,
      otherProps: selectedProduct,
    };
    console.log(formattedCheckoutObj);

    handleCloseModalClick();
  };

  if (!isOpen || !selectedProduct) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content' onClick={stopPropagation}>
        <button className='modal-close-button' onClick={handleCloseModalClick}>
          <CloseIcon />
        </button>

        {selectedProduct?.images ? (
          <img
            className='product-photo'
            src={selectedProduct?.images[0].image}
            alt={selectedProduct?.name}
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
            <button
              className='quantity-btn'
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <MinusIcon
                bgColor={quantity > 1 ? webSettings?.primaryColour : '#DADADA'}
                minusIconColor={quantity > 1 ? 'white' : '#5F5F5F'}
              />
            </button>
            <span className='quantity-value'>{quantity}</span>
            <button className='quantity-btn' onClick={handleIncrement}>
              <PlusIcon bgColor={webSettings?.primaryColour} />
            </button>
          </div>
          <Button
            className='add-to-order'
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
