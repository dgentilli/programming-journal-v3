import { styled, keyframes } from 'styled-components';
import { BaseTokens, baseTokens } from '../../theme/baseTokens';
import Button from '../../components-simple/Button';
import { ButtonType } from '../../../constants/enums';
import Spacer from '../../components-simple/Spacer';
import CustomLink from '../../components-simple/CustomLink';
import SearchInput from '../../components-simple/SearchInput';
import ListItem from '../../components-simple/ListItem';

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
  overflow-y: auto;
`;

const Message = styled.p`
  font-size: ${baseTokens.fontSizes.xxl};
  color: ${baseTokens.colors.blue500};
`;

const ButtonWrapper = styled.div`
  flex: 1;
  justify-content: space-around;
`;

export type Result = {
  id: string;
  title: string;
  text: string;
};
interface SearchModalProps {
  searchResults: Result[];
  closeModal: () => void;
}

const SearchModal = (props: SearchModalProps) => {
  const { searchResults, closeModal } = props;
  console.log('searchResults: ', searchResults);
  return (
    <Overlay>
      <Wrapper>
        <Message>Search for a journal entry</Message>
        <Spacer height={baseTokens.spacing.xl} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <SearchInput value={'test'} onChange={() => {}} />
          <ButtonWrapper>
            <Button
              type={ButtonType.SECONDARY}
              text='Submit'
              onClick={() => {}}
            />
            <CustomLink
              title='Close'
              color={baseTokens.colors.blue500}
              fontSize={
                baseTokens.fontSizes.md as keyof BaseTokens['fontSizes']
              }
              onClick={closeModal}
            />
          </ButtonWrapper>
        </div>
        <Spacer height={baseTokens.spacing.xl} />
        <ul style={{ margin: 8 }}>
          {searchResults?.map((result) => {
            return <ListItem postData={result} />;
          })}
        </ul>
      </Wrapper>
    </Overlay>
  );
};

export default SearchModal;
