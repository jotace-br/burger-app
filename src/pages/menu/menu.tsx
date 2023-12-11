import { ChangeEvent, useEffect, useState } from 'react';
import { fetchMenuDetails } from '@api/api';
import { SearchInput } from '@components/search-input';
import { Spinner } from '@components/spinner';
import { useDataFetcher } from '@hooks/use-data-fetcher';
import { IMenu, IMenuItem } from '@/types/menu';
import { useCategory } from '@contexts/category-context';
import './menu.css';
import { Menu } from '.';

export const PageMenu = () => {
  const { data, loading } = useDataFetcher<IMenu>(fetchMenuDetails);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<IMenuItem[]>();

  const { selectedCategory } = useCategory();

  const handleSearchValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!selectedCategory) {
      const allItems = data?.sections
        .flatMap((section) => section.items)
        .map((item) => item);

      const filteredData = allItems?.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      return setSearchResults(filteredData);
    }

    const filteredCategoryData = selectedCategory.items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return setSearchResults(filteredCategoryData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, selectedCategory]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='menu-container'>
        <div className='menu-search-container'>
          <SearchInput value={searchValue} onChange={handleSearchValue} />
        </div>
        <div className='content-container'>
          <Menu.Content
            menuDetails={data}
            searchValue={searchValue}
            searchResults={searchResults}
            selectedCategory={selectedCategory}
          >
            <section className='allergen-link'>
              <a
                href='https://www.mcdonalds.com/gb/en-gb/good-to-know/allergen-booklet.html'
                target='_blank'
              >
                View allergy information
              </a>
            </section>
          </Menu.Content>
          <Menu.Basket />
        </div>
      </div>
    </>
  );
};
