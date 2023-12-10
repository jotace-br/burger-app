import { IMenuItemModifier } from '../types/menu';

interface FindSelectedItemFromModifierProps {
  modifiers?: IMenuItemModifier[];
  modifierId: number;
  itemId: number;
}

export const findSelectedItemFromModifier = ({
  modifiers,
  modifierId,
  itemId,
}: FindSelectedItemFromModifierProps) => {
  // Find the modifier based on modifierId
  const selectedModifier = modifiers?.find(
    (modifier) => modifier.id === modifierId
  );

  if (!selectedModifier) {
    return { selectedModifier: null, selectedItem: null };
  }

  // Find the item based on itemId within the selected modifier
  const selectedItem = selectedModifier.items.find(
    (item) => item.id === itemId
  );

  if (!selectedItem) {
    return { selectedModifier, selectedItem: null };
  }

  return { selectedModifier, selectedItem };
};
