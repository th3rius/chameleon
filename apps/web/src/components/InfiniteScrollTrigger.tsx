import {ReactNode, useEffect, useRef} from "react";

export interface InfiniteScrollTriggerProps {
  onEndReached?: () => void;
  Loading?: ReactNode;
  hasNext?: boolean;
  isLoadingNext?: boolean;
}

export default function InfiniteScrollTrigger({
  onEndReached,
  hasNext,
  isLoadingNext,
  Loading,
}: InfiniteScrollTriggerProps) {
  function onIntersect() {
    if (hasNext && !isLoadingNext) {
      onEndReached?.();
    }
  }

  const observer = useRef(null);
  if (observer.current === null) {
    observer.current = new IntersectionObserver(([firstEntry]) => {
      if (firstEntry.isIntersecting) {
        onIntersect();
      }
    }, {});
  }

  const targetRef = useRef(null);
  useEffect(() => {
    const target = targetRef.current;
    observer.current.observe(target);
    return () => {
      observer.current.unobserve(target);
    };
  }, [targetRef]);

  return (
    <>
      <div ref={targetRef} />
      {hasNext && isLoadingNext && Loading}
    </>
  );
}
