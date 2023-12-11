// CheckoutContext.js
import { CheckoutObject } from '@/types/checkout';
import { createContext, useState, useContext, ReactNode } from 'react';

interface CheckoutContextProps {
  checkoutList: CheckoutObject[] | undefined;
  addToCheckout: (product: CheckoutObject) => void;
  editCheckoutItem: (productId: number, newQuantity: number) => void;
  removeFromCheckout: (productId: number) => void;
  isInCheckout: (productId: number) => CheckoutObject | undefined;
  getTotalQuantity: () => number;
}

interface CheckoutProviderProps {
  children: ReactNode;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [checkoutList, setCheckoutList] = useState<CheckoutObject[]>([]);

  const addToCheckout = (product: CheckoutObject) => {
    const updatedList = [...checkoutList];
    const existingProductIndex = updatedList.findIndex(
      (item) => item.refIdProduct === product.refIdProduct
    );

    if (existingProductIndex !== -1) {
      updatedList[existingProductIndex].quantity += product.quantity;
    } else {
      updatedList.push({ ...product, quantity: product.quantity });
    }

    setCheckoutList(updatedList);
  };

  const editCheckoutItem = (productId: number, newQuantity: number) => {
    const updatedList = checkoutList.map((item) =>
      item.refIdProduct === productId
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: (item.price || 0) * newQuantity,
          }
        : item
    );

    setCheckoutList(updatedList);
  };

  const removeFromCheckout = (productId: number) => {
    const updatedList = checkoutList.filter(
      (item) => item.refIdProduct !== productId
    );
    setCheckoutList(updatedList);
  };

  const isInCheckout = (productId?: number): CheckoutObject | undefined => {
    if (productId) {
      return checkoutList.find((item) => item.refIdProduct === productId);
    }

    return undefined;
  };

  const getTotalQuantity = () => {
    return checkoutList.reduce((total, item) => total + item.quantity, 0);
  };

  const contextValue: CheckoutContextProps = {
    checkoutList,
    addToCheckout,
    editCheckoutItem,
    removeFromCheckout,
    isInCheckout,
    getTotalQuantity,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};
