import React, { useCallback } from 'react';
import PostEditUI from './PostEditUI';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUser } from '../../globalState/userStore';

const MemoizedPostEditUI = React.memo(PostEditUI);

const PostEditContainer = () => {
  const { id: postId } = useParams();
  const user = useUser();
  const { id, token } = user || {};
  const journalId = postId || '';
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['journals', 'detail', id, journalId],
    queryFn: () => fetchJournalEntry(journalId, token),
    enabled: Boolean(journalId && token),
  });

  const { title, content, tags, category } = data || {};

  const fetchJournalEntry = async (id: string, token?: string) => {
    if (!token || !id) return;

    const response = await axios.get(
      `http://localhost:5000/api/journal/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response?.data;
  };

  const editJournal = useCallback(
    async (formData: {
      title: string;
      content: string;
      category: string;
      tags: string[];
      author: string;
    }) => {
      const response = await axios.put(
        `http://localhost:5000/api/journal/${journalId}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    },
    [journalId, token]
  );

  const onSuccess = () => {
    navigate(`/detail/${journalId}`);
  };

  return (
    <MemoizedPostEditUI
      title={title}
      content={content}
      tags={tags}
      category={category}
      isLoading={isLoading}
      author={id || ''}
      error={error}
      isError={isError}
      onSuccess={onSuccess}
      onSubmit={editJournal}
    />
  );
};

export default PostEditContainer;
