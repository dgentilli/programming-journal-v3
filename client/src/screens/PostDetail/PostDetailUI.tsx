import { styled } from 'styled-components';
import { baseTokens } from '../../theme/baseTokens';
import Button from '../../components/Button';
import { ButtonType } from '../../../constants/enums';

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
