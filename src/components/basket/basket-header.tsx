import { CloseIcon } from '@/assets/icons/close-icon';

export interface BasketHeaderProps {
  headerName: string;
  hasCloseBtn?: boolean;
  onBasketBtn?: () => void;
}

export const BasketHeader = ({
  headerName,
  hasCloseBtn = false,
  onBasketBtn = () => 0,
}: BasketHeaderProps) => (
  <div className='checkout-header'>
    {hasCloseBtn && (
      <button className='checkout-close-button' onClick={onBasketBtn}>
        <CloseIcon />
      </button>
    )}

    <span>{headerName}</span>
  </div>
);
