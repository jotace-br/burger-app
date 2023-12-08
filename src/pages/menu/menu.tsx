import { fetchMenuDetails } from '../../api/api';
import { useDataFetcher } from '../../hooks/use-data-fetcher';

export const Menu = () => {
  const { data, loading } = useDataFetcher({ fetcher: fetchMenuDetails });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <button type='button'>button html</button>
      <br />
      {JSON.stringify(data)}
    </>
  );
};
