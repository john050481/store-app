import { useEffect, useState } from 'react';
import { useEvent } from './useEvent';

export const useRefetch = (
  onFetch: (...args: any) => Promise<any>,
  refetchMS: number
) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleFetch = useEvent(() => {
    onFetch(); // init fetch

    const intervalID = setInterval(() => {
      setIsFetching(true);
      onFetch()
        .finally(() => setIsFetching(false))
        .catch(console.log);
    }, refetchMS);

    return intervalID;
  });

  useEffect(() => {
    if (!refetchMS) {
      return;
    }

    const intervalID = handleFetch();

    return () => {
      clearInterval(intervalID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchMS]);

  return isFetching;
};
