interface MenuItemImage {
  id: number;
  image: string;
}

export interface IMenuItem {
  id: number;
  name: string;
  description?: string;
  alcoholic?: number;
  price: number;
  maxChoices?: number;
  position: number;
  visible?: number;
  availabilityType: string;
  sku?: string;
  images?: MenuItemImage[];
  available: boolean;
  qty?: number;
  modifiers?: IMenuItemModifier[];
}

export interface IMenuItemModifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: IMenuItem[];
}

export interface IMenuSection {
  id: number;
  name: string;
  description?: string | null;
  position: number;
  visible?: number;
  images: MenuItemImage[];
  items: IMenuItem[];
}

export interface IMenu {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: IMenuSection[];
  items?: IMenuItem[];
}
