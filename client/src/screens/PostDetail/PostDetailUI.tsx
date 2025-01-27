import { styled } from 'styled-components';
import { baseTokens } from '../../theme/baseTokens';
import Button from '../../components/Button';
import TagWrapper from '../../components/TagWrapper';
import DeleteModal from '../../components/DeleteModal';
import Spacer from '../../components/Spacer';
import { ButtonType } from '../../../constants/enums';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type DeleteResponse = { message: string }; // Adjust this to match your actual response shape

// UseMutationResult Type
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
  mutation: DeleteJournalMutation;
  onClickDelete: (id: string) => void;
  closeModal: () => void;
  openModal: () => void;
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

const TextWrapper = styled.div`
  padding: ${baseTokens.spacing.xl};
  border: 1px solid ${baseTokens.colors.gray100};
  border-radius: ${baseTokens.radius.md};
`;

const TitleText = styled.h3`
  color: ${baseTokens.colors.blue500};
`;

const BodyText = styled.p`
  color: ${baseTokens.colors.gray300};
  text-align: left;
  line-height: 1.8;
  font-size: ${baseTokens.fontSizes.lg};
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
  color: ${baseTokens.colors.blue700};
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
    onClickEdit,
    closeModal,
    openModal,
  } = props;

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error: {error?.message}</div>; // Display error message
  }

  return (
    <Wrapper>
      {isModalOpen && (
        <DeleteModal
          onDelete={() => {
            mutation.mutate(id);
            closeModal();
          }}
          closeModal={closeModal}
        />
      )}
      <Row>
        <CategoryText>Category: {category}</CategoryText>
      </Row>
      <Row>
        <TagWrapper tags={tags} />
      </Row>
      <Spacer height={baseTokens.spacing.md} />
      <TextWrapper>
        <TitleText>{title}</TitleText>
        <BodyText>{content}</BodyText>
      </TextWrapper>
      <ButtonWrapper>
        <Button
          type={ButtonType.INFO}
          text='Edit Entry'
          onClick={onClickEdit}
        />
        <Button
          type={ButtonType.DANGER}
          text='Delete Entry'
          onClick={openModal}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default PostDetailUI;
