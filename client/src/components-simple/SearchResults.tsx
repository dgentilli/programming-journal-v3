import { Journal } from '../types/common';
import CustomLink from './CustomLink';
import ListItem from './ListItem';

interface SearchResultsProps {
  searchResults: Journal[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  query: string;
}

const SearchResults = (props: SearchResultsProps) => {
  const { searchResults, isLoading, isError, error, query } = props;
  const currentPage = 1;
  const totalPages = 5;
  const totalCount = 10;
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
      <div>{`Page ${currentPage} of ${totalPages} / (${totalCount}) Total Journal Entries`}</div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <CustomLink title='<<< Prev' onClick={() => {}} />
        <CustomLink title='>>> Next' onClick={() => {}} />
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
