import { styled } from 'styled-components';
import { baseTokens } from '../../theme/baseTokens';
import Button from '../../components/Button';
import { ButtonType } from '../../../constants/enums';

interface JournalDetailProps {
  title: string;
  content: string;
  tags: string[];
  category: string;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
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

const PostDetailUI = (props: JournalDetailProps) => {
  const { title, content, tags, category, isLoading, isError, error } = props;
  console.log(tags, category);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error: {error?.message}</div>; // Display error message
  }

  return (
    <Wrapper>
      <TextWrapper>
        <TitleText>{title}</TitleText>
        <BodyText>{content}</BodyText>
      </TextWrapper>
      <ButtonWrapper>
        <Button type={ButtonType.INFO} text='Edit Entry' onClick={() => {}} />
        <Button
          type={ButtonType.DANGER}
          text='Delete Entry'
          onClick={() => {}}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default PostDetailUI;
