import { useCallback, useEffect, useState } from 'react';
import { CloseIcon } from '../../assets/icons/close-icon';
import { NoImageIcon } from '../../assets/icons/no-image-icon';
import { IMenuItem } from '../../types/menu';
import './product-modal.css';
import { numberToBRL } from '../../helpers/format-number-to-brl';
import { MinusIcon } from '../../assets/icons/minus-icon';
import { useWebSettings } from '../../theme-provider';
import { PlusIcon } from '../../assets/icons/plus-icon';
import { BtnAddToOrder } from './add-to-order';
import {
  ModifierSelector,
  SelectedModifier,
} from './components/modifier-selector/modifier-selector';
import { findSelectedItemFromModifier } from '../../helpers/find-selected-item-from-modifier';

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
    () => {
      const defaultSelection: SelectedModifier = {};

      if (selectedProduct?.modifiers) {
        selectedProduct.modifiers.forEach((modifier) => {
          if (modifier.items.length > 0) {
            defaultSelection[modifier.id] = modifier.items[0].id;
          }
        });
      }

      return defaultSelection;
    }
  );

  // Reset state and calculate total price when modal reopens
  useEffect(() => {
    if (isOpen && selectedProduct && selectedProduct.modifiers) {
      const defaultSelection: SelectedModifier = {};

      selectedProduct.modifiers.forEach((modifier) => {
        if (modifier.items.length > 0) {
          defaultSelection[modifier.id] = modifier.items[0].id;
        }
      });

      setSelectedModifier(defaultSelection); // Reset selected modifiers to defaults

      let initialTotal = selectedProduct.price || 0;
      let modifierTotal = 0;

      selectedProduct.modifiers.forEach((modifier) => {
        const selectedItemId = defaultSelection[modifier.id];
        const selectedItem = findSelectedItemFromModifier({
          modifiers: selectedProduct.modifiers,
          modifierId: modifier.id,
          itemId: selectedItemId,
        }).selectedItem;

        if (selectedItem) {
          modifierTotal += selectedItem.price;
        }
      });

      initialTotal += modifierTotal * quantity;

      setTotalPrice(initialTotal);
      setInitialTotalPrice(initialTotal - modifierTotal); // Store initial price without modifiers
    }
  }, [isOpen, selectedProduct, quantity]);

  // Recalculate total price when selected modifier changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.modifiers) {
      // Calculate the new total price based on the selected modifier and quantity
      const selectedModifierId = Number(Object.keys(selectedModifier)[0]);
      const selectedModifierItemId = Number(Object.values(selectedModifier)[0]);

      const { selectedItem: selectedModifierItemObj } =
        findSelectedItemFromModifier({
          modifiers: selectedProduct.modifiers,
          modifierId: selectedModifierId,
          itemId: selectedModifierItemId,
        });

      if (selectedModifierItemObj) {
        setTotalPrice(selectedModifierItemObj.price * quantity);
      }
    }
  }, [selectedModifier, selectedProduct, quantity]);

  useEffect(() => {
    if (selectedProduct) {
      setInitialTotalPrice(selectedProduct.price || 0);
      setTotalPrice(selectedProduct.price || 0);
    }
  }, [selectedProduct]);

  const resetModal = useCallback(() => {
    setQuantity(INITIAL_QUANTITY);
    if (selectedProduct) {
      // ISSO AQUI TÁ DANDO UMA MERDA
      // selectedProduct.price = initialTotalPrice; // Reset selectedProduct price
      setTotalPrice(initialTotalPrice * INITIAL_QUANTITY); // Reset totalPrice based on initialTotalPrice and INITIAL_QUANTITY
    }
  }, [initialTotalPrice, selectedProduct]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
      resetModal();
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, resetModal]);

  if (!isOpen) {
    return null;
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent the click from propagating to the overlay
  };

  const handleIncrement = () => {
    if (selectedProduct?.modifiers) {
      const selectedModifierId = Number(Object.keys(selectedModifier)[0]);
      const selectedModifierItemId = Number(Object.values(selectedModifier)[0]);

      const { selectedItem: selectedModifierItemObj } =
        findSelectedItemFromModifier({
          modifiers: selectedProduct.modifiers,
          modifierId: selectedModifierId,
          itemId: selectedModifierItemId,
        });

      return setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        if (selectedModifierItemObj) {
          setTotalPrice(selectedModifierItemObj.price * newQuantity);
        }
        return newQuantity;
      });
    }

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice(initialTotalPrice * newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    if (selectedProduct?.modifiers) {
      const selectedModifierId = Number(Object.keys(selectedModifier)[0]);
      const selectedModifierItemId = Number(Object.values(selectedModifier)[0]);

      const { selectedItem: selectedModifierItemObj } =
        findSelectedItemFromModifier({
          modifiers: selectedProduct.modifiers,
          modifierId: selectedModifierId,
          itemId: selectedModifierItemId,
        });

      return setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        if (selectedModifierItemObj) {
          setTotalPrice(selectedModifierItemObj.price * newQuantity);
        }
        return newQuantity;
      });
    }

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity - 1;
      setTotalPrice(initialTotalPrice * newQuantity);
      return newQuantity;
    });
  };

  const handleCloseModal = () => {
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
    console.log(
      `Added ${quantity} ${selectedProduct?.name}(s) to the order. Product value is (un.): ${price}`
    );
    console.log(`Total value is: ${totalPrice}`);
    handleCloseModal();
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content' onClick={stopPropagation}>
        <button className='close-button' onClick={handleCloseModal}>
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
              setSelectedModifier={setSelectedModifier}
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
          <BtnAddToOrder
            className='add-to-order'
            // disabled={!!selectedProduct?.modifiers}
            $bgColor={webSettings?.primaryColour}
            onClick={handleAddToOrder}
          >
            Add to Order • {numberToBRL(totalPrice || selectedProduct?.price)}
          </BtnAddToOrder>
        </div>
      </div>
    </div>
  );
};
