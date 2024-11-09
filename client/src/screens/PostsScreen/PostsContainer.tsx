import React from 'react';
import PostsUI from './PostsUI';

const MemoizedPostsUI = React.memo(PostsUI);

const mockContent =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero natus fugit similique fugiat nobis corporis iusto maxime cupiditate eligendi facilis culpa cum, voluptatem blanditiis. Reprehenderit voluptatum repudiandae distinctio assumenda natus.';

const PostsContainer = () => {
  const mockData = [
    { title: 'MongoDB', content: mockContent, createdAt: Date.now(), _id: '1' },
    {
      title: 'ExpressJS',
      content: mockContent,
      createdAt: Date.now(),
      _id: '2',
    },
    { title: 'Redux', content: mockContent, createdAt: Date.now(), _id: '3' },
    {
      title: 'React Components',
      content: mockContent,
      createdAt: Date.now(),
      _id: '4',
    },
    {
      title: 'State and Props',
      content: mockContent,
      createdAt: Date.now(),
      _id: '5',
    },
    { title: 'JS 101', content: mockContent, createdAt: Date.now(), _id: '6' },
  ];

  return <MemoizedPostsUI postsData={mockData} />;
};

export default PostsContainer;
