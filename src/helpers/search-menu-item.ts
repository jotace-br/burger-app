import { IMenu, IMenuItem, IMenuSection } from '@/types/menu';

interface SearchMenuItemProps {
  searchValue: string;
  data?: IMenu;
  selectedCategory?: IMenuSection | null;
}

const handleSearch = <T extends IMenuItem[] | undefined>(
  searchValue: string,
  data: T
) => {
  return data?.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const searchMenuItem = ({
  searchValue,
  data,
  selectedCategory = undefined,
}: SearchMenuItemProps): IMenuItem[] | undefined => {
  if (!selectedCategory) {
    const allItems = data?.sections
      .flatMap((section) => section.items)
      .map((item) => item);

    return handleSearch(searchValue, allItems);
  }

  return handleSearch(searchValue, selectedCategory.items);
};
