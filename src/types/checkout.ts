import { IMenuItem } from './menu';

export type CheckoutObject = {
  refIdProduct: number | undefined;
  name: string | undefined;
  price: number | undefined;
  quantity: number;
  totalPrice: number | undefined;
  modifierProps: IMenuItem | undefined;
  otherProps: IMenuItem | undefined;
};
