import { useEffect } from 'react';

const useInfiniteScroll = (
  elementRef: React.MutableRefObject<null>,
  fetchCallback: () => Promise<void>,
  page: number,
  hasMore: boolean,
) => {
  const observerCallback = (entries: Array<IntersectionObserverEntry>) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      fetchCallback();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore, page]);
};

export default useInfiniteScroll;
