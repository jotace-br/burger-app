import { IMenuItemModifier } from '@/types/menu';

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
  if (!modifiers || !modifiers.length) {
    return { selectedModifier: null, selectedItem: null };
  }

  const selectedModifier = modifiers.find(
    (modifier) => modifier.id === modifierId
  );

  if (
    !selectedModifier ||
    !selectedModifier.items ||
    !selectedModifier.items.length
  ) {
    return { selectedModifier: null, selectedItem: null };
  }

  const selectedItem = selectedModifier.items.find(
    (item) => item.id === itemId
  );

  if (!selectedItem) {
    return { selectedModifier, selectedItem: null };
  }

  return { selectedModifier, selectedItem };
};
