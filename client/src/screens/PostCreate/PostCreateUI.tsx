import EntryForm from '../../components/EntryForm';
interface PostCreateProps {
  author: string;
  createJournal: (formData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
  }) => void;
}

const PostCreateUI = (props: PostCreateProps) => {
  const { author, createJournal } = props;

  return (
    <EntryForm
      titleText=''
      bodyText=''
      categoryText=''
      tagsArray={[]}
      isSubmitting={false}
      author={author}
      onSubmit={createJournal}
    />
  );
};

export default PostCreateUI;
