import { useEffect, useState } from 'react';
import axiosInstance from '../axios-instance';

export default function useQuery({ url, options = {} }) {
  const [queryState, setQueryState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  async function fetchData() {
    setQueryState({
      data: null,
      isLoading: true,
      error: null,
    });

    try {
      const response = await axiosInstance(url, options);
      setQueryState({
        data: response.data,
        isLoading: false,
        error: null,
      });
    } catch (e) {
      setQueryState((prev) => ({
        ...prev,
        error: e.message,
      }));
    } finally {
      setQueryState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(options)]);

  return { refetchQuery: fetchData, ...queryState };
}
