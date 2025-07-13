import { createBrowserRouter } from 'react-router-dom';

import PostsContainer from './screens/PostsScreen/PostsContainer';
import PostCreateContainer from './screens/PostCreate/PostCreateContainer';
import PostEditContainer from './screens/PostEdit/PostEditContainer';
import PostDetailContainer from './screens/PostDetail/PostDetailContainer';
import LoginSignupContainer from './screens/LoginSignup/LoginSignupContainer';

export function createAppRouter(token?: string) {
  return createBrowserRouter([
    {
      path: '/',
      element: token ? <PostsContainer /> : <LoginSignupContainer />,
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
      path: 'edit/:id',
      element: <PostEditContainer />,
    },
  ]);
}
