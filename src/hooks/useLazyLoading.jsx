import { useEffect, useRef, useCallback } from 'react';

const useLazyLoading = (fetchMoreData) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchMoreData]
  );

  return lastElementRef;
};

export default useLazyLoading;
