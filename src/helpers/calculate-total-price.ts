import { IMenuItem } from '@/types/menu';
import { findSelectedItemFromModifier } from './find-selected-item-from-modifier';
import { SelectedModifier } from '@/components/product-modal/components/modifier-selector/types';

interface CalculateTotalPriceProps {
  selectedProduct?: IMenuItem;
  selectedModifier: SelectedModifier;
  quantity: number;
}

export const calculateTotalPrice = ({
  selectedProduct,
  selectedModifier,
  quantity,
}: CalculateTotalPriceProps) => {
  if (!selectedProduct) {
    return 0;
  }

  let totalPrice = selectedProduct.price || 0;

  if (selectedProduct.modifiers) {
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

  return totalPrice * quantity;
};
