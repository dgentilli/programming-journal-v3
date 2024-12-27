import EntryForm from '../../components/EntryForm';

const PostCreateUI = () => {
  return (
    <EntryForm
      titleText=''
      bodyText=''
      categoryText=''
      tagsArray={[]}
      isSubmitting={false}
      onSubmit={({ title, body, category, tags }) =>
        console.log('form submitted with:', { title, body, category, tags })
      }
    />
  );
};

export default PostCreateUI;
