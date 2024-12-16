import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import PostsUI from './PostsUI';

const MemoizedPostsUI = React.memo(PostsUI);

// Define the API fetch function
const fetchJournals = async (
  userId: string,
  token: string,
  page = 1,
  limit = 10
) => {
  const response = await axios.get(
    `http://localhost:5000/api/journal/all/${userId}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
const PostsContainer = () => {
  const navigate = useNavigate();

  // hard code userId and token until you finish the auth
  const userId = TEMP_ID;
  const token = TEMP_TOKEN;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['journals', userId],
    queryFn: () => fetchJournals(userId, token),
    refetchInterval: 300000, // 5 min in ms
  });

  const onClickPostButton = useCallback(() => {
    navigate('/detail');
  }, [navigate]);

  return (
    <MemoizedPostsUI
      postsData={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onClick={onClickPostButton}
    />
  );
};

export default PostsContainer;
