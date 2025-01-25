import React, { useCallback } from 'react';
import PostEditUI from './PostEditUI';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Journal } from '../../types/common';
import { TEMP_ID, TEMP_TOKEN } from '../PostsScreen/temp';

const MemoizedPostEditUI = React.memo(PostEditUI);

const fetchJournalEntry = async (id: string) => {
  const response = await axios.get(`http://localhost:5000/api/journal/${id}`, {
    headers: {
      Authorization: `Bearer ${TEMP_TOKEN}`,
    },
  });
  return response.data;
};

const PostEditContainer = () => {
  const { id } = useParams();
  const journalId = id || '';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const editJournal = useCallback(
    async (formData: {
      title: string;
      content: string;
      category: string;
      tags: string[];
      author: string;
    }) => {
      const response = await axios.put(
        `http://localhost:5000/api/journal/${id}`,
        formData
      );
      return response.data;
    },
    [id]
  );

  const onSuccess = () => {
    navigate(`/detail/${id}`);
  };

  const { title, content, tags, category } = data || {};

  return (
    <MemoizedPostEditUI
      title={title}
      content={content}
      tags={tags}
      category={category}
      isLoading={isLoading}
      author={TEMP_ID}
      error={error}
      isError={isError}
      onSuccess={onSuccess}
      onSubmit={editJournal}
    />
  );
};

export default PostEditContainer;
