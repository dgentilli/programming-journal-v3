import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import PostDetailUI, { DeleteJournalMutation } from './PostDetailUI';
import { Journal } from '../../types/common';
import { useUser } from '../../globalState/userStore';

const MemoizedPostDetailUI = React.memo(PostDetailUI);

// Define the API fetch function
const fetchJournalEntry = async (id: string, token?: string) => {
  if (!token) return;
  const response = await axios.get(`http://localhost:5000/api/journal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteJournalEntry = async (id: string) => {
  const response = await axios.delete(
    `http://localhost:5000/api/journal/${id}`
  );
  console.log('response.data from delete', response.data);
  return response.data;
};

const PostDetailContainer = () => {
  const user = useUser();
  const token = user?.token;
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const journalId = id || '';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goToEditPage = useCallback(() => {
    navigate(`/edit/${id}`);
  }, [id, navigate]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['journals', 'detail', id],
    queryFn: () => fetchJournalEntry(journalId, token),
    refetchInterval: 300000, // 5 min in ms
    initialData: () => {
      return queryClient
        .getQueryData<Journal[]>(['journals', 'list'])
        ?.find((journal) => journal._id === id);
    },
  });

  const mutation = useMutation({
    mutationFn: deleteJournalEntry, // Function to call for deletion
    onSuccess: () => {
      // Navigate to /home after successful deletion
      navigate('/');

      // Invalidate the query cache for the journal list
      //@ts-expect-error fix this later
      queryClient.invalidateQueries(['journals']);
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const { title, content, tags, category } = data || {};

  return (
    <MemoizedPostDetailUI
      title={title}
      id={id}
      content={content}
      tags={tags}
      category={category}
      isLoading={isLoading}
      isError={isError}
      error={error}
      isModalOpen={isModalOpen}
      mutation={mutation as DeleteJournalMutation}
      onClickEdit={goToEditPage}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default PostDetailContainer;
