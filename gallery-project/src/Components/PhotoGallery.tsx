import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Photo from "./Photo";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./PhotoPopup";
import LoadButton from "./LoadButton";
import { Isrc } from "./Photo";
import { useGetPhotos } from "../Hooks/useGetPhotos";
import { useHistoryContext } from "../Contexts/HistoryContext";
import { useObserver } from "../Hooks/useObserver";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(5px); 
  z-index: 9; 
`;


interface IPhotoGalleryProps {
  photos?: Isrc[];
  word?: string;
  inputValue?: string | undefined;
}
const PhotoGallery: React.FC<IPhotoGalleryProps> = ({
  photos,
  word,
  inputValue,
}) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const handlePhotoClick = (photo: Isrc) => {
    setSelectedPhotoId(photo.id || null);
  };

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
    firstPageData,
  } = useGetPhotos(inputValue || word);

  const { lastPhotoElementRef } = useObserver(
    paginationLoading,
    isLoading,
    isError,
    hasMorePhotos,
    setPage
  );

  return (
    <>
      <Container>
        <Grid>
          {photos &&
            inputValue === "" &&
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
        {(isLoading || paginationLoading) && <LoadingSpinner />}
      </Container>
      <>
        {paginationError && (
          <Text className="error">Error while fetching pagination data </Text>
        )}
        {isError && <Text className="error">Error while fetching data </Text>}
        {selectedPhotoId && (
          <>
            <Backdrop />
            <Modal
              selectedPhotoId={selectedPhotoId}
              setSelectedPhotoId={setSelectedPhotoId}
            />
            
          </>
        )}
        {!hasMorePhotos ||
          !isLoading ||
          (!paginationLoading && (
            <Text> No More Photos Found on '{inputValue || word}'</Text>
          ))}
        {firstPageData?.results.length < 1 && (
          <Text> Cant find photos on keyword '{inputValue || word}'</Text>
        )}
      </>
    </>
  );
};

export default PhotoGallery;
