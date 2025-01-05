import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import PostDetailUI from './PostDetailUI';
import { TEMP_TOKEN } from '../PostsScreen/temp';
import { Journal } from '../../types/common';

const MemoizedPostDetailUI = React.memo(PostDetailUI);

// Define the API fetch function
const fetchJournalEntry = async (id: string) => {
  const response = await axios.get(`http://localhost:5000/api/journal/${id}`, {
    headers: {
      Authorization: `Bearer ${TEMP_TOKEN}`,
    },
  });
  return response.data;
};

const PostDetailContainer = () => {
  const { id } = useParams();
  const journalId = id || '';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goToEditPage = useCallback(() => {
    navigate(`/edit/${id}`);
  }, [id, navigate]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['journals', 'detail', id],
    queryFn: () => fetchJournalEntry(journalId),
    refetchInterval: 300000, // 5 min in ms
    initialData: () => {
      return queryClient
        .getQueryData<Journal[]>(['journals', 'list'])
        ?.find((journal) => journal._id === id);
    },
  });

  const { title, content, tags, category } = data || {};

  return (
    <MemoizedPostDetailUI
      title={title}
      content={content}
      tags={tags}
      category={category}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onClickEdit={goToEditPage}
    />
  );
};

export default PostDetailContainer;
