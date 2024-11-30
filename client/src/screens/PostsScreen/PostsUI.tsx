import ListItem from '../../components/ListItem';
import { Post } from '../../types/common';

interface PostsUIProps {
  postsData: Post[];
  onClick: () => void;
}

const PostsUI = (props: PostsUIProps) => {
  const { postsData, onClick } = props;
  console.log({ postsData });
  return (
    <ul>
      {postsData.map((post) => {
        const { _id } = post;
        return <ListItem key={_id} postData={post} onClick={onClick} />;
      })}
    </ul>
  );
};

export default PostsUI;
