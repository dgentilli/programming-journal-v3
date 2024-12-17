import { createBrowserRouter } from 'react-router-dom';

import PostsContainer from './screens/PostsScreen/PostsContainer';
import PostCreateContainer from './screens/PostCreate/PostCreateContainer';
import PostEditContainer from './screens/PostEdit/PostEditContainer';
import PostDetailContainer from './screens/PostDetail/PostDetailContainer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PostsContainer />,
  },
  {
    path: 'detail/:id',
    element: <PostDetailContainer />,
  },
  {
    path: 'create',
    element: <PostCreateContainer />,
  },
  {
    path: 'edit',
    element: <PostEditContainer />,
  },
]);
