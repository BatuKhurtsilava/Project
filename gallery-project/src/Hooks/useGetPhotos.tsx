import { useInfiniteQuery, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Isrc } from "../Components/Photo";

export const useGetPhotos = (word: string | undefined) => {
  const [page, setPage] = useState<number>(1);
  const [numOfItems, setNumOfItems] = useState<number>(0);
  const [searchedPhotos, setSearchedPhotos] = useState<Isrc[]>([]);
  const [hasMorePhotos, setHasMorePhotos] = useState<boolean>();
  const [someError, setSomeError] = useState<string>();
  const API = "1kGhPnmeH4JUzOP_nzkvZJFDWAsnd1HyD3ISZ4g3xPc";

  const fetchPhotos = async () => {
    try {
      return await (
        await fetch(
          `https://api.unsplash.com/search/photos?query=${word}&per_page=${20}&page=1&client_id=${API}`
        )
      ).json();
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const fetchPhotosPagination = async () => {
    try {
      return await (
        await fetch(
          `https://api.unsplash.com/search/photos?query=${word}&per_page=${20}&page=${page}&client_id=${API}`
        )
      ).json();
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const {
    isLoading,
    isError,
    error,
    data: firstPageData,
  } = useQuery([word, "1st page"], fetchPhotos);

  const {
    isLoading: paginationLoading,
    isError: isPaginationError,
    error: paginationError,
    data: paginatedData,
  } = useQuery([word, `page ${page}}`], fetchPhotosPagination);

  useEffect(() => {
    setPage(1);
    setSearchedPhotos(firstPageData?.results);
  }, [firstPageData]);

  useEffect(() => {
    if (
      page > 1 &&
      searchedPhotos.length > 0 &&
      Array.isArray(paginatedData?.results)
    )
      setSearchedPhotos((prev) => [...prev, ...paginatedData?.results]);
  }, [paginatedData]);

  useEffect(() => {
    if (searchedPhotos && searchedPhotos.length > 0)
      setHasMorePhotos(searchedPhotos?.length < firstPageData?.total);
  }, [searchedPhotos]);

  return {
    hasMorePhotos,
    paginationLoading,
    isPaginationError,
    paginationError,
    isLoading,
    isError,
    error,
    searchedPhotos,
    setPage,
    page,
    firstPageData,
  };
};
