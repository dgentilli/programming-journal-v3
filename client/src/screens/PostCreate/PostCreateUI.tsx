import EntryForm from '../../components-simple/EntryForm';
interface PostCreateProps {
  author: string;
  createJournal: (formData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
  }) => void;
  goBack: () => void;
  onSuccess: () => void;
}

const PostCreateUI = (props: PostCreateProps) => {
  const { author, createJournal, goBack, onSuccess } = props;

  return (
    <>
      <a
        href='#'
        onClick={(event) => {
          event.preventDefault();
          goBack();
        }}
      >
        Go Back
      </a>
      <EntryForm
        titleText=''
        bodyText=''
        categoryText=''
        tagsArray={[]}
        isSubmitting={false}
        author={author}
        onSubmit={createJournal}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default PostCreateUI;
