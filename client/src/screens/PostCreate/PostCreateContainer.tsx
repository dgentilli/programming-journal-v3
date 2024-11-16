import React from 'react';
import PostCreateUI from './PostCreateUI';

const MemoizedPostCreateUI = React.memo(PostCreateUI);

const PostCreateContainer = () => {
  return <MemoizedPostCreateUI />;
};

export default PostCreateContainer;
