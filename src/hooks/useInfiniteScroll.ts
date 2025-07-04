import { useEffect, useState, useCallback, useRef } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 300,
}: UseInfiniteScrollProps) {
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollTop + clientHeight + threshold >= scrollHeight;

    if (isNearBottom && hasMore && !isLoading && !isFetching) {
      setIsFetching(true);
    }
  }, [hasMore, isLoading, isFetching, threshold]);

  useEffect(() => {
    if (isFetching && hasMore && !isLoading) {
      onLoadMore();
      setIsFetching(false);
    }
  }, [isFetching, hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isFetching, containerRef };
}
