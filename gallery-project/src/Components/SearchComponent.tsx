import React, { useRef } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 400px;
  height: 20px;
  margin-top: 20px;
  margin-bottom: 100px;
`;

interface ISearchProps {
  setInputValue: (value: string) => void;
}
const SearchComponent: React.FC<ISearchProps> = ({ setInputValue }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      <h1>Search Any Photos with Unsplash API</h1>
      <Input
        ref={inputRef}
        type="text"
        placeholder={"Type to search"}
        onChange={() =>
          setInputValue(inputRef.current ? inputRef.current.value : "")
        }
      />
    </Container>
  );
};

export default SearchComponent;
