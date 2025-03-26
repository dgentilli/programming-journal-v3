import { Journal } from '../types/common';
import CustomLink from './CustomLink';
import ListItem from './ListItem';

interface SearchResultsProps {
  searchResults: Journal[];
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  query: string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

const SearchResults = (props: SearchResultsProps) => {
  const {
    searchResults,
    isLoading,
    isError,
    error,
    query,
    totalCount,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
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
      <div>
        <CustomLink title='<<< Prev' onClick={goToPreviousPage} />
        {`Page ${currentPage} of ${totalPages} / (${totalCount}) Total Journal Entries`}
        <CustomLink title='>>> Next' onClick={goToNextPage} />
      </div>
      <ul style={{ margin: 8 }}>
        {searchResults?.map((result: Journal) => {
          //@ts-expect-error guard clause above should handle this
          return <ListItem postData={result} />;
        })}
      </ul>
    </>
  );
};

export default SearchResults;
