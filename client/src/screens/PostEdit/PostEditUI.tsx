import EntryForm from '../../components/EntryForm';

interface JournalEditProps {
  title: string;
  content: string;
  tags: string[];
  category: string;
  author: string;
  isLoading: boolean;
  onSubmit: (formData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
  }) => void;
  onSuccess: () => void;
}

const PostEditUI = (props: JournalEditProps) => {
  const {
    title,
    content,
    category,
    tags,
    isLoading,
    author,
    onSubmit,
    onSuccess,
  } = props;

  return (
    <EntryForm
      titleText={title}
      bodyText={content}
      categoryText={category}
      tagsArray={tags}
      author={author}
      isSubmitting={isLoading}
      onSubmit={onSubmit}
      onSuccess={onSuccess}
    />
  );
};

export default PostEditUI;
