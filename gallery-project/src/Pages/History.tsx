import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WordBox from "../Components/WordBox";
import { useHistoryContext } from "../Contexts/HistoryContext";
import { useObserver } from "../Hooks/useObserver";
import PhotoGallery from "../Components/PhotoGallery";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WordBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const HistoryPage: React.FC = () => {
  const [targetWord, setTargetWord] = useState<string>("");
  const { savedWords } = useHistoryContext();

  const handleWordClick = (word: string) => {
    setTargetWord(word);
  };

  return (
    <Container>
      <WordBoxContainer>
        {savedWords
          ?.filter((w) => w !== "")
          .map((word, index) => (
            <WordBox
              key={index}
              word={word}
              onClick={() => handleWordClick(word)}
            />
          ))}
      </WordBoxContainer>
      {targetWord !== "" && <PhotoGallery word={targetWord} />}
      {savedWords.length < 1 && <p>History is Empty</p>}
    </Container>
  );
};

export default HistoryPage;
