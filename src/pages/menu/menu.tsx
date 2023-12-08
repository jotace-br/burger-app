import { fetchMenuDetails } from '../../api/api';
import { SearchInput } from '../../components/search-input/search-input';
import { Spinner } from '../../components/spinner';
import { useDataFetcher } from '../../hooks/use-data-fetcher';
import { IMenu } from '../../types/menu';
import './menu.css';

export const Menu = () => {
  const { data, loading } = useDataFetcher<IMenu>(fetchMenuDetails);

  if (loading) {
    return <Spinner />;
  }

  console.log(data);

  return (
    <>
      <div className='menu-container'>
        <div className='menu-search-container'>
          <SearchInput />
        </div>
        <div className='content-container'>aaaaaaaaaaaaaaa</div>
      </div>
    </>
  );
};
