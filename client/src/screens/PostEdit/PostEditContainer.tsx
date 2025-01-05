import React from 'react';
import PostEditUI from './PostEditUI';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Journal } from '../../types/common';
import { TEMP_ID } from '../PostsScreen/temp';

const MemoizedPostEditUI = React.memo(PostEditUI);

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

  const { title, content, tags, category } = data || {};

  return (
    <MemoizedPostEditUI
      title={title}
      content={content}
      tags={tags}
      category={category}
      isLoading={isLoading}
      author={TEMP_ID}
    />
  );
};

export default PostEditContainer;
