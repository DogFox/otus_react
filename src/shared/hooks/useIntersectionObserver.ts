import { useCallback, useEffect, useRef } from 'react';

type UseIntersectionObserverOptions = {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  // колхозный способ отслеживанияю. Обзервер не трекает пересечение если спутник сразу виден, загружаем до полного сокрытия
  watchKey?: unknown;
};

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = '120px',
  watchKey,
}: UseIntersectionObserverOptions) {
  const sentinelNodeRef = useRef<HTMLDivElement | null>(null);
  const onIntersectRef = useRef(onIntersect);

  onIntersectRef.current = onIntersect;

  const setSentinelRef = useCallback((node: HTMLDivElement | null) => {
    sentinelNodeRef.current = node;
  }, []);

  useEffect(() => {
    const sentinel = sentinelNodeRef.current;

    if (!enabled || !sentinel) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersectRef.current();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [enabled, rootMargin, watchKey]);

  return setSentinelRef;
}
