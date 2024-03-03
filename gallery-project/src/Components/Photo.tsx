import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
  margin: 10px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const Text = styled.div`
  position: absolute;
  bottom: 3px;
  left: 0;
  width: 93%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
`;

const ContainerHover = styled(Container)`
  &:hover ${Text} {
    visibility: visible;
    opacity: 1;
    width: 95%;
  }
`;

export interface Iurl {
  small: string;
}

export interface Isrc {
  urls: Iurl;
  alt_description: string;
  id: string | null;
}
interface PhotoProps {
  ref?: (node: any) => void;
  src: Isrc;
  alt: string;
  text: string;
}

const Photo: React.FC<PhotoProps> = ({ src, alt, text }) => {
  return (
    <ContainerHover>
      <Image src={src.urls.small} alt={alt} />
      <Text>{src.alt_description}</Text>
    </ContainerHover>
  );
};

export default Photo;
