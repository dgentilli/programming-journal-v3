import ListItem from '../../components/ListItem';
import { Post } from '../../types/common';

interface PostsUIProps {
  postsData: Post[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onClick: () => void;
}

const PostsUI = (props: PostsUIProps) => {
  const { postsData, isLoading, isError, error, onClick } = props;
  console.log('hey...', postsData);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  if (postsData?.journals.length === 0) {
    return <div>No Posts</div>;
  }

  return (
    <ul>
      {postsData.journals?.map((post) => {
        const { _id } = post;
        return <ListItem key={_id} postData={post} onClick={onClick} />;
      })}
    </ul>
  );
};

export default PostsUI;
