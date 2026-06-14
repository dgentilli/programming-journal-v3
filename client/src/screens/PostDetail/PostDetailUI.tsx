import { styled } from 'styled-components';
import ReactMarkdown, { Components } from 'react-markdown';
import { BaseTokens, baseTokens } from '../../theme/baseTokens';
import Button from '../../components-simple/Button';
import TagWrapper from '../../components-simple/TagWrapper';
import DeleteModal from '../../components-simple/DeleteModal';
import Spacer from '../../components-simple/Spacer';
import { ButtonColor } from '../../../constants/enums';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ScreenWrapper from '../../components-simple/ScreenWrapper';
import DateDisplay from '../../components-simple/DateDisplay';
import CustomLink from '../../components-simple/CustomLink';

type DeleteResponse = { message: string };

export type DeleteJournalMutation = UseMutationResult<
  DeleteResponse, // TData (API response type)
  AxiosError, // TError (error type)
  string // TVariables (argument passed to mutationFn, in this case, the id)
>;

interface JournalDetailProps {
  title: string;
  id: string | undefined;
  content: string;
  tags: string[];
  category: string;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  isModalOpen: boolean;
  renderMap: Components;
  allowedMarkdownElements: string[];
  mutation: DeleteJournalMutation;
  date: string;
  closeModal: () => void;
  openModal: () => void;
  onClickEdit: () => void;
  goBack: () => void;
}

const BodyTextWrapper = styled.div`
  padding: ${baseTokens.spacing.xl};
  border: 1px solid ${baseTokens.colors.gray100};
  border-radius: ${baseTokens.radius.md};
  text-align: left;
  max-width: 80%;

  @media (min-width: 600px) {
    min-width: 500px;
  }

  @media (min-width: 1100px) {
    min-width: 900px;
  }
`;

const TitleWrapper = styled.div`
  padding: ${baseTokens.spacing.xl};
`;

const TitleText = styled.h3`
  color: ${baseTokens.colors.gray400};
`;

const MetaDataTextWrapper = styled.div`
  text-align: left;
`;

const ButtonWrapper = styled.div`
  margin-top: ${baseTokens.spacing.md};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${baseTokens.spacing.md};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${baseTokens.spacing.md};
`;

const CategoryText = styled.p`
  color: ${baseTokens.colors.gray400};
`;

const PostDetailUI = (props: JournalDetailProps) => {
  const {
    title,
    id = '',
    content,
    tags,
    category,
    isLoading,
    isError,
    error,
    isModalOpen,
    mutation,
    renderMap,
    allowedMarkdownElements,
    onClickEdit,
    date,
    closeModal,
    openModal,
    goBack,
  } = props;

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error: {error?.message}</div>; // Display error message
  }

  return (
    <ScreenWrapper>
      {isModalOpen && (
        <DeleteModal
          //@ts-expect-error disregard
          onDelete={() => {
            mutation.mutate(id);
            closeModal();
          }}
          closeModal={closeModal}
        />
      )}
      <CustomLink
        title={'Go Back'}
        color={baseTokens.colors.blue700}
        fontSize={baseTokens.fontSizes.lg as keyof BaseTokens['fontSizes']}
        onClick={goBack}
      />
      <Row>
        <CategoryText>Category: {category}</CategoryText>
      </Row>
      <Row>
        <MetaDataTextWrapper>Tags:</MetaDataTextWrapper>
        <TagWrapper tags={tags} />
      </Row>
      <Spacer height={baseTokens.spacing.md} />
      <Row>
        <MetaDataTextWrapper>Created:</MetaDataTextWrapper>
        <DateDisplay dateString={date} format='EEEE, MMMM do, yyyy' />
      </Row>
      <Spacer height={baseTokens.spacing.md} />
      <TitleWrapper>
        <TitleText>{title}</TitleText>
      </TitleWrapper>
      <BodyTextWrapper>
        <ReactMarkdown
          children={content}
          components={renderMap}
          allowedElements={allowedMarkdownElements}
        />
      </BodyTextWrapper>
      <ButtonWrapper>
        <Button
          color={ButtonColor.INFO}
          text='Edit Entry'
          onClick={onClickEdit}
        />
        <Button
          color={ButtonColor.DANGER}
          text='Delete Entry'
          onClick={openModal}
        />
      </ButtonWrapper>
    </ScreenWrapper>
  );
};

export default PostDetailUI;
