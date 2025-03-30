import { Journal } from '../types/common';
import ListItem from './ListItem';
import Pagination, { PaginationProps } from './Pagination';

interface SearchResultsProps {
  searchResults: Journal[];
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  query: string;
  paginationProps: PaginationProps;
  onClickListItem: (id: string) => void;
}

const SearchResults = (props: SearchResultsProps) => {
  const {
    searchResults,
    isLoading,
    isError,
    error,
    query,
    paginationProps,
    onClickListItem,
  } = props;

  if (query.length === 0) {
    return <div>Enter a Search Term</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!searchResults || searchResults?.length === 0) {
    return <div>No Posts</div>;
  }

  return (
    <>
      <Pagination {...paginationProps} />
      <ul style={{ margin: 8 }}>
        {searchResults?.map((result: Journal) => {
          const { _id } = result;
          return (
            //@ts-expect-error this works correctly based on manual testing
            <ListItem postData={result} onClick={() => onClickListItem(_id)} />
          );
        })}
      </ul>
    </>
  );
};

export default SearchResults;
