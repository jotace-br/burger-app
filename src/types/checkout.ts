import { IMenuItem } from '@/types/menu';

export type CheckoutObject = {
  refIdProduct?: number;
  name?: string;
  price?: number;
  quantity: number;
  totalPrice?: number;
  modifierProps?: IMenuItem;
  otherProps?: IMenuItem;
};
