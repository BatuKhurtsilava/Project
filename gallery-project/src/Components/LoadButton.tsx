import React from "react";
import { styled } from "styled-components";

const LoadMoreButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
`;

interface LoadButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoadButton: React.FC<LoadButtonProps> = ({ onClick }) => {
  return <LoadMoreButton onClick={onClick}>Load More</LoadMoreButton>;
};

export default LoadButton;
