import { styled, keyframes } from 'styled-components';
import { BaseTokens, baseTokens } from '../../theme/baseTokens';
import Button from '../../components-simple/Button';
import { ButtonType } from '../../../constants/enums';
import Spacer from '../../components-simple/Spacer';
import CustomLink from '../../components-simple/CustomLink';

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
`;

const Wrapper = styled.div`
  width: 50%;
  height: 600px;
  padding: ${baseTokens.spacing.md};
  background-color: ${baseTokens.colors.white};
  border-radius: ${baseTokens.radius.md};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease;
`;

const Message = styled.p`
  font-size: ${baseTokens.fontSizes.xxl};
  color: ${baseTokens.colors.blue500};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: ${baseTokens.spacing.lg};
`;

const SearchInput = styled.input`
  padding: ${baseTokens.spacing.md};
  width: 50%;
  border-radius: ${baseTokens.radius.md};
`;

interface SearchModalProps {
  closeModal: () => void;
}

const SearchModal = (props: SearchModalProps) => {
  const { closeModal } = props;

  return (
    <Overlay>
      <Wrapper>
        <Message>Search for a journal entry</Message>
        <Spacer height={baseTokens.spacing.xl} />
        <SearchInput
          id='search'
          name='search'
          type='search'
          placeholder='Search'
          // value={title}
          spellCheck={true}
          // onChange={handleTitleChange}
        />
        <ButtonWrapper>
          <Button
            type={ButtonType.SECONDARY}
            text='Submit'
            onClick={() => {}}
          />
          <CustomLink
            title='Close'
            color={baseTokens.colors.blue500}
            fontSize={baseTokens.fontSizes.md as keyof BaseTokens['fontSizes']}
            onClick={() => {}}
          />
        </ButtonWrapper>
        <Spacer height={baseTokens.spacing.xl} />
      </Wrapper>
    </Overlay>
  );
};

export default SearchModal;
