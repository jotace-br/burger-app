import './basket.css';
import { ReactNode } from 'react';

export interface BasketProps {
  children: ReactNode;
}

export const BasketContainer = ({ children }: BasketProps) => {
  return <section className='checkout-container'>{children}</section>;
};
