import { styled, keyframes } from 'styled-components';
import { baseTokens } from '../theme/baseTokens';
import Button from './Button';
import { ButtonType } from '../../constants/enums';
import Spacer from './Spacer';
import { DeleteJournalMutation } from '../screens/PostDetail/PostDetailUI';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 350px;
  height: 220px;
  padding: ${baseTokens.spacing.md};
  background-color: ${baseTokens.colors.white};
  border-radius: ${baseTokens.radius.md};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease;
`;

const Message = styled.p`
  font-size: ${baseTokens.fontSizes.lg};
  color: ${baseTokens.colors.gray400};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface DeleteModalProps {
  onDelete: DeleteJournalMutation;
  closeModal: () => void;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { onDelete, closeModal } = props;

  return (
    <Overlay>
      <Wrapper>
        <Message>Are you sure you want to delete this entry?</Message>
        <Spacer height={baseTokens.spacing.xl} />
        <ButtonWrapper>
          <Button
            type={ButtonType.DANGER}
            text='Yes - Delete it'
            onClick={onDelete}
          />
          <div
            style={{
              width: baseTokens.spacing.sm,
              height: '100%',
              backgroundColor: 'transparent',
            }}
          />
          <Button
            type={ButtonType.SECONDARY}
            text='No - Keep this!'
            onClick={closeModal}
          />
        </ButtonWrapper>
      </Wrapper>
    </Overlay>
  );
};

export default DeleteModal;
