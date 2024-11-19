import EntryForm from '../../components/EntryForm';

const testBody =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque perspiciatis iure magnam sapiente repudiandae sunt architecto laudantium eum dolorem ea.';
const testTitle = 'My Post!!!';
const PostEditUI = () => {
  return (
    <EntryForm
      titleText={testTitle}
      bodyText={testBody}
      isSubmitting={false}
      onSubmit={({ title, body }) =>
        console.log('form submitted with:', { title, body })
      }
    />
  );
};

export default PostEditUI;
