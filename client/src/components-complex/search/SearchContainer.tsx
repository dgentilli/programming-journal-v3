import React, { useState } from 'react';
import SearchModal from './SearchModal';
import axios from 'axios';
import { TEMP_TOKEN } from '../../screens/PostsScreen/temp';
import { useQuery } from '@tanstack/react-query';

const MemoizedSearchModal = React.memo(SearchModal);
interface SearchContainerProps {
  closeModal: () => void;
}

const searchJournals = async (query: string, page: number, token: string) => {
  const response = await axios.get(
    `http://localhost:5000/api/journal/search?query=${query}&page=${page}&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const PAGE = 1;

const SearchContainer = (props: SearchContainerProps) => {
  const token = TEMP_TOKEN;
  const [query, setQuery] = useState('');
  // const [page, setPage] = useState(1);
  const { closeModal } = props;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['searchResults', query, PAGE],
    queryFn: () => searchJournals(query, PAGE, token),
    refetchInterval: 300000, // 5 min in ms
  });

  console.log('data from search', data);

  return (
    <MemoizedSearchModal
      searchResults={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      query={query}
      setQuery={setQuery}
      closeModal={closeModal}
    />
  );
};

export default SearchContainer;
