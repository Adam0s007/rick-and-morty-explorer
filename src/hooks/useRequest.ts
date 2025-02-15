import { useState, useEffect, useTransition } from 'react';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const useRequest = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData: T = await response.json();

        startTransition(() => {
          setData(jsonData);
          setError('');
        });
      } catch (err: any) {
        startTransition(() => {
          setError(err.message);
          setData(null);
        });
      }
    };

    fetchData();
  }, [endpoint, startTransition]);

  return { data, isPending, error };
};
