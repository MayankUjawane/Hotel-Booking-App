import { useState } from 'react';
import { default as axiosInstance } from '../axios-instance';

export function useMutation(url, method) {
  const [mutateState, setMutateState] = useState({
    data: null,
    pending: false,
    error: null,
  });

  const mutate = async (payload, cb) => {
    setMutateState({ data: null, pending: true, error: null });
    try {
      const response = await axiosInstance({
        method: method,
        url: url,
        data: payload,
      });

      setMutateState((prev) => ({ ...prev, data: response.data }));
      if (cb && cb.onSuccess && typeof cb.onSuccess === 'function') {
        cb.onSuccess(response);
      }
    } catch (e) {
      setMutateState((prev) => ({
        ...prev,
        error: e.message,
      }));
      if (cb && cb.onError && typeof cb.onError === 'function') {
        cb.onError(e);
      }
    } finally {
      setMutateState((prev) => ({ ...prev, pending: false }));
    }
  };

  return {
    ...mutateState,
    mutate,
  };
}
