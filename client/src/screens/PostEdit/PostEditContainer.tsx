import React from 'react';
import PostEditUI from './PostEditUI';

const MemoizedPostEditUI = React.memo(PostEditUI);

const PostEditContainer = () => {
  return <MemoizedPostEditUI />;
};

export default PostEditContainer;
