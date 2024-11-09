import ListItem from '../../components/ListItem';
import { Post } from '../../types/common';

interface PostsUIProps {
  postsData: Post[];
}

const PostsUI = (props: PostsUIProps) => {
  const { postsData } = props;
  console.log({ postsData });
  return (
    <div>
      {postsData.map((post) => {
        const { _id } = post;
        return <ListItem key={_id} postData={post} />;
      })}
    </div>
  );
};

export default PostsUI;
