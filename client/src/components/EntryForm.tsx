import {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

interface EntryFormProps {
  titleText: string;
  bodyText: string;
  isSubmitting: boolean;
  onSubmit: ({ title, body }: { title: string; body: string }) => void;
}

const PageWrapper = styled.div`
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageHeader = styled.h1`
  margin-bottom: 3rem;
  color: ${baseTokens.colors.blue700};
`;

const FormWrapper = styled.form`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  text-align: left;
  color: ${baseTokens.colors.gray400};
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: ${baseTokens.fontSizes.md};
  border: 1px solid ${baseTokens.colors.gray100};
  border-radius: ${baseTokens.radius.md};

  &:focus {
    outline: none;
    border-color: ${baseTokens.colors.blue100};
  }
`;

const BodyTextarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 0.75rem;
  font-size: ${baseTokens.fontSizes.md};
  border: 1px solid ${baseTokens.colors.gray100};
  border-radius: ${baseTokens.radius.md};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${baseTokens.colors.blue100};
  }
`;

const Button = styled.button`
  background-color: ${baseTokens.colors.blue700};
  color: ${baseTokens.colors.white};
  font-size: ${baseTokens.fontSizes.lg};
  font-weight: 700;
`;

const EntryForm = (props: EntryFormProps) => {
  const { bodyText, titleText, isSubmitting, onSubmit } = props;
  const [title, setTitle] = useState(titleText);
  const [body, setBody] = useState(bodyText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  useLayoutEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    adjustHeight();

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('input', adjustHeight);
      return () => textarea.removeEventListener('input', adjustHeight);
    }
  }, []);

  return (
    <PageWrapper>
      <PageHeader>Create a journal entry</PageHeader>
      <FormWrapper onSubmit={handleSubmit}>
        <Label htmlFor='title'>Title</Label>
        <TitleInput
          id='title'
          name='title'
          type='text'
          placeholder='Title'
          value={title}
          spellCheck={true}
          onChange={handleTitleChange}
        />
        <Label htmlFor='body'>Body</Label>
        <BodyTextarea
          id='body'
          name='body'
          placeholder='Body'
          value={body}
          spellCheck={true}
          onChange={handleBodyChange}
        />
        <Button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </FormWrapper>
    </PageWrapper>
  );
};

export default EntryForm;
