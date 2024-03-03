import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Photo from "../Components/Photo";
import LoadingSpinner from "../Components/LoadingSpinner";
import Modal from "../Components/PhotoPopup";
import LoadButton from "../Components/LoadButton";
import { Isrc } from "../Components/Photo";
import { useGetPhotos } from "../Hooks/useGetPhotos";
import { useHistoryContext } from "../Contexts/HistoryContext";
import PhotoGallery from "../Components/PhotoGallery";
import SearchComponent from "../Components/SearchComponent";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;

  & h1 {
    font-size: 40px;
  }
`;

const MainPage: React.FC = () => {
  const [photos, setPhotos] = useState<Isrc[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const { savedWords, setSavedWords } = useHistoryContext();
  const [words, setWords] = useState<string[]>([]);

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
      const alreadyInHistory = words?.includes(inputValue);
      if (!alreadyInHistory && inputValue !== "") {
        setWords((prev) => (prev ? [...prev, inputValue] : [inputValue]));
      } else {
        return;
      }
    }, 5000);

    return () => {
      if (wordSaver) clearTimeout(wordSaver);
    };
  }, [inputValue]);

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
    setSavedWords(words);
  }, [words]);

  useEffect(() => {
    setWords(savedWords);
  }, []);

  console.log(process.env.REACT_APP_WOW);

  return (
    <Container>
      <SearchComponent setInputValue={setInputValue} />
      <PhotoGallery photos={photos} inputValue={inputValue} />
    </Container>
  );
};

export default MainPage;
