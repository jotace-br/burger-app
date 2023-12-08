interface MenuItemImage {
  id: number;
  image: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  alcoholic: number;
  price: number;
  position: number;
  visible: number;
  availabilityType: string;
  sku: string;
  images: MenuItemImage[];
  available: boolean;
  modifiers?: MenuItemModifier[];
}

interface MenuItemModifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: MenuItem[];
}

interface MenuSection {
  id: number;
  name: string;
  description: string | null;
  position: number;
  visible: number;
  images: MenuItemImage[];
  items: MenuItem[];
}

export interface IMenu {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: MenuSection[];
}
