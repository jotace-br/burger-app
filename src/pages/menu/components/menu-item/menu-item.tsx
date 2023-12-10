import { useState } from 'react';
import { ProductModal } from '@components/product-modal';
import { numberToBRL } from '@helpers/format-number-to-brl';
import { truncateString } from '@helpers/truncate-string';
import { IMenuItem } from '@/types/menu';
import './menu-item.css';

export interface MenuItemProps {
  items?: IMenuItem[];
}

export const MenuItem = ({ items }: MenuItemProps) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IMenuItem>();

  const priceFormatter = (item: IMenuItem) => {
    if (item.price > 0) {
      return numberToBRL(item.price);
    }

    return numberToBRL(item.modifiers?.[0].items[0].price || 0);
  };

  const handleModal = (item: IMenuItem) => {
    setIsProductModalOpen(!isProductModalOpen);
    setSelectedProduct(item);
  };

  return (
    <>
      <div className='card'>
        <div className='card-item'>
          {items?.map((item) => {
            if (!item.available) {
              return null;
            }

            return (
              <div
                key={item.id}
                className='card-content'
                onClick={() => handleModal(item)}
              >
                <div className='info-left'>
                  <h3>{item.name}</h3>
                  <p className='description'>
                    {truncateString(item.description || '')}
                  </p>
                  <p className='price'>{priceFormatter(item)}</p>
                </div>
                <div className='info-right'>
                  {item.images && (
                    <img src={item.images[0].image} alt={item.name} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        selectedProduct={selectedProduct}
      />
    </>
  );
};
