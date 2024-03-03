import { useInfiniteQuery, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Isrc } from "../Components/Photo";

export const useGetSinglePhoto = (id: string) => {
  const [photoInfo, setPhotoInfo] = useState();
  const API = "1kGhPnmeH4JUzOP_nzkvZJFDWAsnd1HyD3ISZ4g3xPc";

  const fetchPhoto = async () => {
    try {
      return await (
        await fetch(`https://api.unsplash.com/photos/${id}?client_id=${API}`)
      ).json();
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const { isLoading, isError, error, data } = useQuery(
    ["singlePhoto", `${id}`],
    fetchPhoto
  );

  useEffect(() => {
    setPhotoInfo(data);
  }, [data]);

  return {
    isLoading,
    isError,
    error,
    data,
    photoInfo,
  };
};
