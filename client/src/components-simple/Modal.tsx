import { styled, keyframes } from 'styled-components';
import { BaseTokens, baseTokens } from '../theme/baseTokens';
import React from 'react';
import CustomLink from './CustomLink';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 50%;
  height: 600px;
  padding: ${baseTokens.spacing.md};
  background-color: ${baseTokens.colors.white};
  border-radius: ${baseTokens.radius.md};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease;
  overflow-y: auto;
  z-index: 3;
`;

interface SearchModalProps {
  closeModal: () => void;
  children: React.ReactElement[];
  // to do -- implement a style prop to adjust height and width
  modalWrapperStyle?: { height: string; width: string };
}

const Modal = (props: SearchModalProps) => {
  const { closeModal, children } = props;

  return (
    <Overlay>
      <Wrapper>
        <CustomLink
          title='Close'
          color={baseTokens.colors.blue500}
          fontSize={baseTokens.fontSizes.md as keyof BaseTokens['fontSizes']}
          onClick={closeModal}
        />
        {children}
      </Wrapper>
    </Overlay>
  );
};

export default Modal;
