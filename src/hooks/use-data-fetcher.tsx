import { useState, useEffect } from 'react';

interface UseDataFetcherProps {
  fetcher: () => Promise<unknown>;
}

export const useDataFetcher = ({ fetcher }: UseDataFetcherProps) => {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher();
        setData(response);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetcher]);

  return { data, error, loading };
};
