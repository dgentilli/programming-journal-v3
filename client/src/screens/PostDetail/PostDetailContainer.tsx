import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import PostDetailUI from './PostDetailUI';
import { TEMP_TOKEN } from '../PostsScreen/temp';

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
  console.log('id from detail screen', id);

  const goToEditPage = useCallback(() => {
    navigate(`/edit/${id}`);
  }, [id, navigate]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['journals', id],
    queryFn: () => fetchJournalEntry(journalId),
    refetchInterval: 300000, // 5 min in ms
  });

  console.log('DATA!!', data);

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
