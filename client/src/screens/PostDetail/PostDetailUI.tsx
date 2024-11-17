import { styled } from 'styled-components';
import { baseTokens } from '../../theme/baseTokens';

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

const EditButton = styled.button`
  padding: ${baseTokens.spacing.md};
  background-color: ${baseTokens.colors.blue100};
  color: ${baseTokens.colors.white};
`;

const DeleteButton = styled.button`
  padding: ${baseTokens.spacing.md};
  background-color: ${baseTokens.colors.red};
  color: ${baseTokens.colors.white};
`;
const PostDetailUI = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <TitleText>My Awesome Post</TitleText>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, earum.
          Praesentium, impedit? Vero quod a animi repudiandae error, velit
          itaque numquam at iure atque sunt aperiam harum dolor voluptates eos.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, earum.
          Praesentium, impedit? Vero quod a animi repudiandae error, velit
          itaque numquam at iure atque sunt aperiam harum dolor voluptates eos.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, earum.
          Praesentium, impedit? Vero quod a animi repudiandae error, velit
          itaque numquam at iure atque sunt aperiam harum dolor voluptates eos.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, earum.
          Praesentium, impedit? Vero quod a animi repudiandae error, velit
          itaque numquam at iure atque sunt aperiam harum dolor voluptates eos.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, earum.
          Praesentium, impedit? Vero quod a animi repudiandae error, velit
          itaque numquam at iure atque sunt aperiam harum dolor voluptates eos.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, earum.
          Praesentium, impedit? Vero quod a animi repudiandae error, velit
          itaque numquam at iure atque sunt aperiam harum dolor voluptates eos.
        </BodyText>
      </TextWrapper>
      <ButtonWrapper>
        <EditButton>Edit Post</EditButton>
        <DeleteButton>Delete Post</DeleteButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default PostDetailUI;
