import { styled, keyframes } from 'styled-components';
import { BaseTokens, baseTokens } from '../../theme/baseTokens';
import Spacer from '../../components-simple/Spacer';
import CustomLink from '../../components-simple/CustomLink';
import SearchInput from '../../components-simple/SearchInput';
import { Journal } from '../../types/common';
import SearchResults from '../../components-simple/SearchResults';

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

export type Result = {
  id: string;
  title: string;
  text: string;
};

type SearchResultData = {
  searchResults: Journal[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
interface SearchModalProps {
  data: SearchResultData;
  query: string;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  setQuery: (arg: string) => void;
  closeModal: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const SearchModal = (props: SearchModalProps) => {
  const {
    data,
    query,
    isLoading,
    isError,
    error,
    setQuery,
    closeModal,
    goToNextPage,
    goToPreviousPage,
  } = props;

  const { searchResults, totalCount, totalPages, currentPage } = data || {};

  return (
    <Overlay>
      <Wrapper>
        <Message>Search for a journal entry</Message>
        <CustomLink
          title='Close'
          color={baseTokens.colors.blue500}
          fontSize={baseTokens.fontSizes.md as keyof BaseTokens['fontSizes']}
          onClick={closeModal}
        />
        <Spacer height={baseTokens.spacing.xl} />
        <SearchInput
          value={query}
          onChange={(input: string) => setQuery(input)}
        />
        <Spacer height={baseTokens.spacing.xl} />
        <SearchResults
          searchResults={searchResults}
          isLoading={isLoading}
          isError={isError}
          error={error}
          query={query}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </Wrapper>
    </Overlay>
  );
};

export default SearchModal;
