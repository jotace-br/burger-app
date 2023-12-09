import { ChangeEvent, useEffect, useState } from 'react';
import { fetchMenuDetails } from '../../api/api';
import { SearchInput } from '../../components/search-input/search-input';
import { Spinner } from '../../components/spinner';
import { useDataFetcher } from '../../hooks/use-data-fetcher';
import { IMenu, MenuItem } from '../../types/menu';
import './menu.css';
import { CategorySelector } from './components/category-selector';
import { useCategory } from '../../contexts/category-context';

export const Menu = () => {
  const { data, loading } = useDataFetcher<IMenu>(fetchMenuDetails);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>();

  const { selectedCategory } = useCategory();

  const handleSearchValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value);
  };

  const truncateString = (text: string, maxLength = 55) => {
    if (text.length <= maxLength) {
      return text;
    }

    const words = text.split(' ');
    let truncatedText = '';

    for (const word of words) {
      if (truncatedText.length + word.length + 1 <= maxLength) {
        truncatedText += word + ' ';
      } else {
        break;
      }
    }

    truncatedText =
      truncatedText.trim() + (truncatedText.length < text.length ? '...' : '');
    return truncatedText;
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
                {searchValue.length >= 2 && (
                  <ul>
                    {searchResults?.map((item) => (
                      <>
                        <li key={item.id}>{item.name}</li>
                        <p>{truncateString(item.description || '')}</p>
                        <p>R${item.price.toFixed(2)}</p>
                        {item?.images?.length ? (
                          <img
                            src={item.images[0].image}
                            alt={item.name}
                            width='50px'
                          />
                        ) : null}
                      </>
                    ))}

                    {!searchResults?.length ? (
                      <p>nenhum item encontrado.</p>
                    ) : null}
                  </ul>
                )}
              </section>
            ) : // TODO: componentizar isso, pfv
            selectedCategory ? (
              // TODO: Criar componente genérico de categoria com collapse
              <p>
                {selectedCategory.items.map((item) => (
                  <>
                    <p>{selectedCategory.name}</p>
                    <p>{item.name}</p>
                    <p>{truncateString(item.description || '')}</p>
                    <p>R${item.price.toFixed(2)}</p>
                    {item?.images?.length ? (
                      <img
                        src={item.images[0].image}
                        alt={item.name}
                        width='50px'
                      />
                    ) : null}
                  </>
                ))}
              </p>
            ) : (
              data?.sections.map((section) => (
                <>
                  <p>{section.name}</p>
                  {section.items?.map((item) => {
                    return (
                      <div style={{ margin: 16 }}>
                        <p>{item.name}</p>
                        <p>{truncateString(item.description || '')}</p>
                        {<p>R${item.price.toFixed(2)}</p>}
                        {item?.images?.length ? (
                          <img
                            src={item.images[0].image}
                            alt={item.name}
                            width='50px'
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </>
              ))
            )}
          </section>
        </div>
      </div>
    </>
  );
};
