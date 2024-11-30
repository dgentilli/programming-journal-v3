import React, { useCallback } from 'react';
import PostsUI from './PostsUI';
import { useNavigate } from 'react-router-dom';

const MemoizedPostsUI = React.memo(PostsUI);

const mockContent =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero natus fugit similique fugiat nobis corporis iusto maxime cupiditate eligendi facilis culpa cum, voluptatem blanditiis. Reprehenderit voluptatum repudiandae distinctio assumenda natus.';

const PostsContainer = () => {
  const navigate = useNavigate();

  const onClickPostButton = useCallback(() => {
    navigate('/detail');
  }, [navigate]);

  const mockData = [
    {
      title: 'MongoDB',
      content: mockContent,
      createdAt: '2024-11-10',
      _id: '1',
    },
    {
      title: 'ExpressJS',
      content: mockContent,
      createdAt: '2024-11-09',
      _id: '2',
    },
    { title: 'Redux', content: mockContent, createdAt: '2024-11-09', _id: '3' },
    {
      title: 'React Components',
      content: mockContent,
      createdAt: '2024-11-08',
      _id: '4',
    },
    {
      title: 'State and Props',
      content: mockContent,
      createdAt: '2024-11-07',
      _id: '5',
    },
    {
      title: 'JS 101',
      content: mockContent,
      createdAt: '2024-11-05',
      _id: '6',
    },
  ];

  return <MemoizedPostsUI postsData={mockData} onClick={onClickPostButton} />;
};

export default PostsContainer;
