import React from 'react';
import PostDetailUI from './PostDetailUI';

const MemoizedPostDetailUI = React.memo(PostDetailUI);

const PostDetailContainer = () => {
  return <MemoizedPostDetailUI />;
};

export default PostDetailContainer;
