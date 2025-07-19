import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import PostsUI from './PostsUI';
import { useUser } from '../../globalState/userStore';

const MemoizedPostsUI = React.memo(PostsUI);

// Define the API fetch function
const fetchJournals = async (
  userId: string,
  token: string,
  page = 1,
  limit = 10
) => {
  if (userId && token) {
    const response = await axios.get(
      `http://localhost:5000/api/journal/all/${userId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
};

const PostsContainer = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const LIMIT = 10;
  const user = useUser();
  const id = user?.id || '';
  const token = user?.token || '';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['journals', 'list', id, page],
    queryFn: () => fetchJournals(id, token, page, LIMIT),
    enabled: Boolean(id && token),
    refetchInterval: 300000, // 5 min in ms
  });

  const { currentPage, totalPages, totalCount, journals } = data || {};

  const onClickPostButton = useCallback(
    (id: string) => {
      navigate(`/detail/${id}`);
    },
    [navigate]
  );

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

  const createNewEntry = useCallback(() => {
    navigate('/create');
  }, [navigate]);

  return (
    <MemoizedPostsUI
      journals={journals}
      isLoading={isLoading}
      isError={isError}
      error={error}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={currentPage}
      onClick={onClickPostButton}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      createNewEntry={createNewEntry}
    />
  );
};

export default PostsContainer;
