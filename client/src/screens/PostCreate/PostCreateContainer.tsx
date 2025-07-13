import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCreateUI from './PostCreateUI';
import { useUser } from '../../globalState/userStore';

const MemoizedPostCreateUI = React.memo(PostCreateUI);

const PostCreateContainer = () => {
  const navigate = useNavigate();
  const user = useUser();
  const author = user?.id;

  const createJournal = useCallback(
    async (formData: {
      title: string;
      content: string;
      category: string;
      tags: string[];
      author: string;
    }) => {
      const response = await axios.post(
        'http://localhost:5000/api/journal/create',
        formData
      );
      return response.data;
    },
    []
  );

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const onSuccess = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <MemoizedPostCreateUI
      author={author || ''}
      goBack={goBack}
      createJournal={createJournal}
      onSuccess={onSuccess}
    />
  );
};

export default PostCreateContainer;
