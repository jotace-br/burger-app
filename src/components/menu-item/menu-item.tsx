import { useState } from 'react';
import { ProductModal } from '@components/product-modal';
import { numberToBRL } from '@helpers/format-number-to-brl';
import { truncateString } from '@helpers/truncate-string';
import { IMenuItem } from '@/types/menu';
import './menu-item.css';
import { useCheckout } from '@/contexts/checkout-content';
import { useWebSettings } from '@/theme-provider';
import { ProductEditModal } from '../product-edit-modal';

export interface MenuItemProps {
  items?: IMenuItem[];
}

export const MenuItem = ({ items }: MenuItemProps) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductEditModalOpen, setIsProductEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IMenuItem>();

  const webSettings = useWebSettings();
  const { isInCheckout } = useCheckout();

  const priceFormatter = (item: IMenuItem) => {
    if (item.price > 0) {
      return numberToBRL(item.price);
    }

    return numberToBRL(item.modifiers?.[0].items[0].price || 0);
  };

  const handleCounterValue = (itemId: number): number | null => {
    const itemInCheckout = isInCheckout(itemId);

    if (itemInCheckout) {
      return itemInCheckout.quantity;
    }
    return null;
  };

  const handleModal = (item: IMenuItem) => {
    const itemInCheckout = isInCheckout(item.id);

    if (itemInCheckout) {
      setSelectedProduct({ ...item, ...itemInCheckout });
      return setIsProductEditModalOpen(!isProductEditModalOpen);
    }
    setSelectedProduct(item);
    return setIsProductModalOpen(!isProductModalOpen);
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
                  <h3>
                    {handleCounterValue(item.id) && (
                      <>
                        <span
                          className='item-counter-checkout'
                          style={{ background: webSettings?.primaryColour }}
                        >
                          {handleCounterValue(item.id)}
                        </span>{' '}
                      </>
                    )}
                    {item.name}
                  </h3>
                  <p className='description'>
                    {truncateString(item.description || '')}
                  </p>
                  <p className='price'>{priceFormatter(item)}</p>
                </div>
                <div className='info-right'>
                  {item.images && (
                    <img
                      src={item.images[0].image}
                      alt={item.name}
                      width='128px'
                      height='85px'
                      loading='lazy'
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProductModal
        isProductModalOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        selectedProduct={selectedProduct}
      />

      <ProductEditModal
        isProductModalOpen={isProductEditModalOpen}
        onClose={() => setIsProductEditModalOpen(false)}
        selectedProductToEdit={selectedProduct}
      />
    </>
  );
};
