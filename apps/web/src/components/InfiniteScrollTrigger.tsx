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

  const observer = useRef<IntersectionObserver | null>(null);
  if (observer.current === null) {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    }, {});
  }

  const targetRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const target = targetRef.current;
    observer.current!.observe(target!);
    return () => {
      observer.current!.unobserve(target!);
    };
  }, [targetRef]);

  return (
    <>
      <div ref={targetRef} />
      {hasNext && isLoadingNext && Loading}
    </>
  );
}
