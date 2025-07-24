import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import Button from './Button';
import { baseTokens } from '../theme/baseTokens';
import { ButtonColor } from '../../constants/enums';
import { EntryFormProps } from '../types/common';
import Spacer from './Spacer';
import { useMutation } from '@tanstack/react-query';
import TagWrapper from './TagWrapper';

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

  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const Label = styled.label`
  text-align: left;
  color: ${baseTokens.colors.gray400};
`;

const OneLineInput = styled.input`
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${baseTokens.spacing.md};
`;

const EntryForm = (props: EntryFormProps) => {
  const {
    bodyText,
    titleText,
    categoryText,
    tagsArray,
    isSubmitting,
    author,
    onSubmit,
    onSuccess,
  } = props;
  const [title, setTitle] = useState(titleText);
  const [body, setBody] = useState(bodyText);
  const [category, setCategory] = useState(categoryText);
  const [tagTextInput, setTagTextInput] = useState('');
  const [tags, setTags] = useState(tagsArray || []);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    console.log('EntryForm Mounts');
  }, [bodyText, titleText, categoryText, tagsArray]);
  console.log('titleText recd by entry form', titleText);
  const mutation = useMutation({
    //@ts-expect-error fix this later, smt wrong with type safety here
    mutationFn: ({ title, content, category, tags, author }) => {
      return onSubmit({ title, content, category, tags, author });
    },
    onSuccess: () => onSuccess(),
  });

  const formatTags = () => {
    const temp = tagTextInput
      .split(/[\s,]+/) // split on a space and strip commas
      .filter((tag) => tag.trim() !== ''); // make sure we remove empty strings
    setTags(temp);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formatTags();
    const formData = { title, content: body, category, tags, author };
    mutation.mutate(formData);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagTextInput(event.target.value);
  };

  const handleTagsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagTextInput.trim() !== '') {
      setTags((prevTags) => [...prevTags, tagTextInput.trim()]);
      setTagTextInput(''); // Clear the input
      event.preventDefault(); // Prevent form submission if inside a form
    }
  };

  const isDisabled =
    mutation.isPending || title?.length === 0 || body?.length === 0;

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

  const renderItems = () => {
    if (mutation.isPending) return <div>Loading....</div>;
    if (mutation.isError) {
      return <div>{mutation.error.message || 'Something went wrong'}</div>;
    }

    return (
      <PageWrapper>
        {mutation.isPending && <div>Submitting....</div>}
        {mutation.isError && <div>Error!!!</div>}
        <PageHeader>
          {titleText?.length > 0
            ? 'Edit Your Journal Entry'
            : 'Create a Journal Entry'}
        </PageHeader>

        <FormWrapper onSubmit={handleSubmit}>
          <Label htmlFor='title'>Title</Label>
          <OneLineInput
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
          <Label htmlFor='category'>Category</Label>
          <OneLineInput
            id='category'
            name='category'
            type='text'
            placeholder='Category'
            value={category}
            spellCheck={true}
            onChange={handleCategoryChange}
          />
          <Label htmlFor='tags'>Tags (Press Enter to Save)</Label>
          <OneLineInput
            id='tags'
            name='tags'
            type='text'
            placeholder='Tags'
            value={tagTextInput}
            spellCheck={true}
            onChange={handleTagsChange}
            onKeyDown={handleTagsKeyDown}
          />
          <Row>
            <TagWrapper tags={tags} />
          </Row>
          <Spacer height={baseTokens.spacing.md} />
          <Button
            type={ButtonColor.SUBMIT}
            text={isSubmitting ? 'Submitting...' : 'Submit'}
            disabled={isDisabled}
            onClick={() => {}}
          />
        </FormWrapper>
      </PageWrapper>
    );
  };

  return renderItems();
};

export default EntryForm;
