import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

interface EntryFormProps {
  titleText: string;
  bodyText: string;
  isSubmitting: boolean;
  onSubmit: ({ title, body }: { title: string; body: string }) => void;
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  border: 1px dashed red;
`;

const EntryForm = (props: EntryFormProps) => {
  const { bodyText, titleText, isSubmitting, onSubmit } = props;
  const [title, setTitle] = useState(titleText);
  const [body, setBody] = useState(bodyText);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ title, body });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const isDisabled = isSubmitting || !title.length || !body.length;

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        name='title'
        type='text'
        placeholder='Title'
        value={title}
        spellCheck={true}
        onChange={handleTitleChange}
      />
      <label htmlFor='body'>Body</label>
      <textarea
        id='body'
        name='body'
        placeholder='Body'
        value={body}
        spellCheck={true}
        onChange={handleBodyChange}
      ></textarea>
      <button type='submit' disabled={isDisabled}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </FormWrapper>
  );
};

export default EntryForm;
