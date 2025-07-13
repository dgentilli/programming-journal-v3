import React, { useCallback, useState } from 'react';
import SearchModal from './SearchModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../globalState/userStore';

const MemoizedSearchModal = React.memo(SearchModal);
interface SearchContainerProps {
  closeModal: () => void;
}

const searchJournals = async (query: string, page: number, token?: string) => {
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

const SearchContainer = (props: SearchContainerProps) => {
  const user = useUser();
  const token = user?.token;
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { closeModal } = props;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['searchResults', query, page],
    queryFn: () => searchJournals(query, page, token),
    refetchInterval: 300000, // 5 min in ms
  });

  const { currentPage, totalPages } = data || {};

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [totalPages, currentPage]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const onClickListItem = useCallback(
    (id: string) => {
      navigate(`/detail/${id}`);
    },
    [navigate]
  );

  return (
    <MemoizedSearchModal
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      query={query}
      setQuery={setQuery}
      closeModal={closeModal}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      onClickListItem={onClickListItem}
    />
  );
};

export default SearchContainer;
