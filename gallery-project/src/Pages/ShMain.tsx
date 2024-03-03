import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Photo from "../Components/Photo";
import Modal from "../Components/PhotoPopup";
import LoadButton from "../Components/LoadButton";
import { Isrc } from "../Components/Photo";
import { useGetPhotos } from "../Hooks/useGetPhotos";
import { useHistoryContext } from "../Contexts/HistoryContext";

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  height: 20px;
  margin-bottom: 100px;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  & h1 {
    font-size: 40px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 40px;
  justify-content: space-between;
`;

const Text = styled.p`
  color: black;
  font-size: 30px;
  text-align: center;

  & .error {
    color: red;
  }
`;

const ShMainPage: React.FC = () => {
  const [photos, setPhotos] = useState<Isrc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { savedWords, setSavedWords } = useHistoryContext();
  const handlePhotoClick = (photo: Isrc) => {
    setSelectedPhotoId(photo.id || null);
  };

  useEffect(() => {
    const fetchPopularPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos?&per_page=20&page=1&order_by=popular&client_id=1kGhPnmeH4JUzOP_nzkvZJFDWAsnd1HyD3ISZ4g3xPc`
        );
        if (!response.ok) {
          throw new Error("Unsuccessful response");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        throw new Error(error as string | undefined);
      }
    };

    fetchPopularPhotos();
  }, []);

  useEffect(() => {
    const wordSaver = setTimeout(() => {
      const alreadyInHistory = savedWords?.includes(inputValue);
      if (!alreadyInHistory || inputValue !== "")
        setSavedWords((prev) => (prev ? [...prev, inputValue] : [inputValue]));
    }, 10000);

    return () => {
      clearTimeout(wordSaver);
    };
  }, [inputValue, savedWords]);

  useEffect(() => {
    if (savedWords && savedWords.length > 0)
      localStorage.setItem("words", JSON.stringify(savedWords));
  }, [savedWords]);

  const {
    paginationLoading,
    isPaginationError,
    paginationError,
    isLoading,
    isError,
    error,
    searchedPhotos,
    setPage,
    page,
    hasMorePhotos,
  } = useGetPhotos(inputValue);

  const observer = useRef<any | null>(null);
  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (paginationLoading || isLoading || isError) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePhotos) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [paginationLoading, isLoading, isError, hasMorePhotos, setPage]
  );

  return (
    <>
      <Container>
        <h1>Search Any Photos with Unsplash API</h1>
        <Input
          ref={inputRef}
          type="text"
          placeholder={"Type to search"}
          onChange={() => setInputValue(inputRef.current!.value)}
        />
        <Grid>
          {inputValue === "" &&
            photos.map((photo, index) => (
              <div key={index} onClick={() => handlePhotoClick(photo)}>
                <Photo src={photo} alt={`Photo ${index}`} text="Some text" />
              </div>
            ))}
          {inputValue !== "" &&
            searchedPhotos?.map((photo: Isrc, index: number) => {
              if (searchedPhotos.length === index + 1) {
                return (
                  <div
                    key={index}
                    ref={lastPhotoElementRef}
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <Photo
                      src={photo}
                      alt={`Photo ${index}`}
                      text="Some text"
                    ></Photo>
                  </div>
                );
              } else {
                return (
                  <div onClick={() => handlePhotoClick(photo)}>
                    <Photo
                      key={index}
                      src={photo}
                      alt={`Photo ${index}`}
                      text="Some text"
                    />
                  </div>
                );
              }
            })}
        </Grid>
        {/* {(isLoading || paginationLoading) && <LoadingSpinner />} */}
      </Container>
      <>
        {paginationError && (
          <Text className="error">paginationError.message</Text>
        )}
        {selectedPhotoId && (
          <Modal
            selectedPhotoId={selectedPhotoId}
            setSelectedPhotoId={setSelectedPhotoId}
          />
        )}
        {!hasMorePhotos &&
          inputValue !== "" &&
          !paginationLoading &&
          !isLoading && <Text> No More Photos Found on '{inputValue}'</Text>}
      </>
    </>
  );
};

export default ShMainPage;
