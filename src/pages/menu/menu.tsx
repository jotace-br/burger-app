import { ChangeEvent, useEffect, useState } from 'react';
import { fetchMenuDetails } from '../../api/api';
import { SearchInput } from '../../components/search-input';
import { Spinner } from '../../components/spinner';
import { useDataFetcher } from '../../hooks/use-data-fetcher';
import { IMenu, IMenuItem } from '../../types/menu';
import './menu.css';
import { CategorySelector } from './components/category-selector';
import { useCategory } from '../../contexts/category-context';
import { Accordion } from './components/accordion/accordion';
import { MenuItem } from './components/menu-item/menu-item';

export const Menu = () => {
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
          <section className='main-content'>
            <CategorySelector data={data?.sections} />

            {searchValue.length >= 2 ? (
              <section className='search-results'>
                {searchValue.length >= 2 && <MenuItem items={searchResults} />}
              </section>
            ) : selectedCategory ? (
              <Accordion
                key={selectedCategory.id}
                sectionName={selectedCategory.name}
              >
                <MenuItem items={selectedCategory.items} />
              </Accordion>
            ) : (
              data?.sections.map((section) => (
                <Accordion key={section.id} sectionName={section.name}>
                  <MenuItem items={section.items} />
                </Accordion>
              ))
            )}
            {
              <section className='allergen-link'>
                <a href='https://www.pudim.com.br' target='_blank'>
                  View allergy information
                </a>
              </section>
            }
          </section>
        </div>
      </div>
    </>
  );
};
