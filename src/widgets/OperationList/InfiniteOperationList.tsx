import React, { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { createRandomOperation } from '../../homeworks/ts1/3_write';
import { useIntersectionObserver } from '../../shared/hooks/useIntersectionObserver';
import { OperationList, type OperationListProps } from './OperationList';
import './operationList.css';

const INITIAL_COUNT = 6;
const LOAD_COUNT = 4;

function createInitialOperations() {
  const createdAt = new Date().toISOString();

  return Array.from({ length: INITIAL_COUNT }, () => createRandomOperation(createdAt));
}

export const InfiniteOperationList: FC<Omit<OperationListProps, 'items'>> = ({ variant = 'short' }) => {
  const [items, setItems] = useState(createInitialOperations);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    const createdAt = new Date().toISOString();
    const nextItems = Array.from({ length: LOAD_COUNT }, () => createRandomOperation(createdAt));

    setItems((currentItems) => [...currentItems, ...nextItems]);
  }, []);

  useEffect(() => {
    isLoadingRef.current = false;
  }, [items]);

  const sentinelRef = useIntersectionObserver({ onIntersect: loadMore, watchKey: items.length });

  return (
    <div className="operationList__wrapper">
      <OperationList items={items} variant={variant} />
      <div ref={sentinelRef} className="operationList__sentinel" aria-hidden="true" />
    </div>
  );
};
