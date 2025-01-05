import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCreateUI from './PostCreateUI';
import { TEMP_ID } from '../PostsScreen/temp';

const MemoizedPostCreateUI = React.memo(PostCreateUI);

const PostCreateContainer = () => {
  const navigate = useNavigate();
  const author = TEMP_ID;

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
      author={author}
      goBack={goBack}
      createJournal={createJournal}
      onSuccess={onSuccess}
    />
  );
};

export default PostCreateContainer;
