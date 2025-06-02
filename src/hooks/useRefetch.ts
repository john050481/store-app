import { useEffect, useState } from 'react';
import { useEvent } from './useEvent';
import { DEFAULT_REFETCH_MS } from '@api/constants';

export const useRefetch = (onFetch: (...args: any) => Promise<any>) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = useEvent(() => {
    onFetch(); // init fetch

    const intervalID = setInterval(() => {
      setIsFetching(true);
      onFetch()
        .finally(() => setIsFetching(false))
        .catch(console.log);
    }, DEFAULT_REFETCH_MS);

    return intervalID;
  });

  useEffect(() => {
    const intervalID = handleFetch();

    return () => {
      clearInterval(intervalID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isFetching;
};
