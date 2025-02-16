import { useState, useEffect } from "react";

const BASE_URL = "https://rickandmortyapi.com/api";

export const useRequest = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        const jsonData = await response.json();

        if (!response.ok) {
          throw new Error(jsonData.error || "Failed to fetch data");
        }

        setData(jsonData);
        setError("");
      } catch (err: any) {
        setError(err.message);
        setData(null);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isPending, error };
};
