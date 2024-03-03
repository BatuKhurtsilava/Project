import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: inline-block;
  padding: 20px 30px;
  margin: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
`;

interface WordBoxProps {
  word: string;
  onClick: () => void;
}

const WordBox: React.FC<WordBoxProps> = ({ word, onClick }) => {
  return <Box onClick={onClick}>{word}</Box>;
};

export default WordBox;
