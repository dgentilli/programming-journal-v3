import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PostCreateUI from './PostCreateUI';

const MemoizedPostCreateUI = React.memo(PostCreateUI);

const PostCreateContainer = () => {
  const createJournal = async (formData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
  }) => {
    console.log('formData recd as prop by createJournal', formData);
    const response = await axios.post(
      'http://localhost:5000/api/journal/create',
      formData
    );
    console.log('response.data from createJournal', response.data);
    return response.data;
  };

  const author = '5e79c66ef3a2f5001741cbce';

  return <MemoizedPostCreateUI author={author} createJournal={createJournal} />;
};

export default PostCreateContainer;
