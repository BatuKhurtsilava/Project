import { useRef, useCallback } from "react";
export const useObserver = (
  paginationLoading: boolean,
  isLoading: boolean,
  isError: boolean,
  hasMorePhotos: boolean | undefined,
  setPage: any
) => {
  const observer = useRef<any | null>(null);
  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (paginationLoading || isLoading || isError) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePhotos) {
          setPage((prev: number) => prev + 1);
        }
      });
     
      if (node) observer.current.observe(node);
    },
    [paginationLoading, isLoading, isError, hasMorePhotos, setPage]
  );

  return { lastPhotoElementRef };
};
