import { styled } from 'styled-components';
import { baseTokens } from '../../theme/baseTokens';
import Spacer from '../../components-simple/Spacer';
import SearchInput from '../../components-simple/SearchInput';
import { Journal } from '../../types/common';
import SearchResults from '../../components-simple/SearchResults';
import Modal from '../../components-simple/Modal';

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
  onClickListItem: (id: string) => void;
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
    onClickListItem,
  } = props;

  const { searchResults, totalCount, totalPages, currentPage } = data || {};
  const paginationProps = {
    totalCount,
    totalPages,
    currentPage,
    goToNextPage,
    goToPreviousPage,
  };

  return (
    <Modal closeModal={closeModal}>
      <Message>Search for a journal entry</Message>
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
        paginationProps={paginationProps}
        onClickListItem={onClickListItem}
      />
    </Modal>
  );
};

export default SearchModal;
