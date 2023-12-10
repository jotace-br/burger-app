import './modifier-selector.css'; // Style this file according to your UI requirements
import { IMenuItemModifier } from '../../../../types/menu';
import { numberToBRL } from '../../../../helpers/format-number-to-brl';

export type SelectedModifier = {
  [key: string]: number;
};

interface ModifierSelectorProps {
  modifiers?: IMenuItemModifier[];
  selectedModifier: SelectedModifier;
  setSelectedModifier: React.Dispatch<React.SetStateAction<SelectedModifier>>;
}

export const ModifierSelector = ({
  modifiers,
  selectedModifier,
  setSelectedModifier,
}: ModifierSelectorProps) => {
  const handleSelection = (modifierId: number, itemId: number) => {
    setSelectedModifier((prevSelectedModifier) => ({
      ...prevSelectedModifier,
      [modifierId]: itemId,
    }));
  };

  if (!modifiers) {
    return null;
  }

  return (
    <div className='modifier-selector'>
      {modifiers.map((modifier) => (
        <div className='modal-modifier' key={modifier.id}>
          <div className='modal-modifier-title-container'>
            <p className='modifier-name'>{modifier.name}</p>
            <p className='modifier-subtitle'>Select 1 option</p>
          </div>
          <div className='modifier-items'>
            {modifier.items.map((item) => (
              <div
                className='modifier-item-wrapper'
                key={item.id}
                onClick={() => handleSelection(modifier.id, item.id)}
              >
                <div className='modifier-items-attributes'>
                  <span className='item-name'>{item.name}</span>
                  <span className='item-price'>{numberToBRL(item.price)}</span>
                </div>
                <input
                  type='radio'
                  name={modifier.name}
                  value={item.id.toString()}
                  checked={selectedModifier[modifier.id] === item.id}
                  onChange={() => handleSelection(modifier.id, item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
