import EntryForm from '../../components/EntryForm';

const PostCreateUI = () => {
  return (
    <EntryForm
      titleText=''
      bodyText=''
      isSubmitting={false}
      onSubmit={({ title, body }) =>
        console.log('form submitted with:', { title, body })
      }
    />
  );
};

export default PostCreateUI;
