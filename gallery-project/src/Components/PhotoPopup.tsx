import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import { GrView } from "react-icons/gr";
import { Isrc } from "./Photo";
import { useGetSinglePhoto } from "../Hooks/useGetSinglePhoto";
import LoadingSpinner from "./LoadingSpinner";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 420px;
  height: 470px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Image = styled.img`
  width: 380px;
  height: 320px;
  margin-bottom: 10px;
  align-self: center;
`;

const Text = styled.p`
  margin-bottom: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & .icon {
    margin-right: 5px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface modalProps {
  setSelectedPhotoId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPhotoId: string;
}

const Modal: React.FC<modalProps> = ({
  setSelectedPhotoId,
  selectedPhotoId,
}) => {
  const handleCloseModal = () => {
    setSelectedPhotoId(null);
  };

  const { isLoading, isError, error, data, photoInfo } =
    useGetSinglePhoto(selectedPhotoId);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSelectedPhotoId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!error && (
        <ModalContainer ref={modalRef}>
          <CloseButton onClick={handleCloseModal}>X</CloseButton>
          {!isLoading && (
            <>
              {" "}
              <Image src={data?.urls.regular} alt="Photo" />
              <Text>
                <LuDownload className="icon" />
                <span className="text-content">
                  Dwnloads: {data?.downloads}
                </span>
              </Text>
              <Text>
                <AiOutlineLike className="icon" />

                <span className="text-content"> Likes: {data?.likes}</span>
              </Text>
              <Text>
                <GrView className="icon" />

                <span className="text-content">Views: {data?.views}</span>
              </Text>
            </>
          )}
          {isLoading && (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          )}
        </ModalContainer>
      )}
      {error && (
        <ModalContainer>
          <Text>Error Occured, try again later</Text>
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
