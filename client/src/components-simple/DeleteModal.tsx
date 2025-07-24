import { styled } from 'styled-components';
import { baseTokens } from '../theme/baseTokens';
import Button from './Button';
import { ButtonColor } from '../../constants/enums';
import Spacer from './Spacer';
import { DeleteJournalMutation } from '../screens/PostDetail/PostDetailUI';
import Modal from './Modal';

const Message = styled.p`
  font-size: ${baseTokens.fontSizes.lg};
  color: ${baseTokens.colors.gray400};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
interface DeleteModalProps {
  onDelete: DeleteJournalMutation;
  closeModal: () => void;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { onDelete, closeModal } = props;

  return (
    <Modal
      closeModal={closeModal}
      modalWrapperStyle={{ height: '300px', width: '30%' }}
    >
      <Message>What do you want to do?</Message>
      <Spacer height={baseTokens.spacing.xl} />
      <ButtonWrapper>
        <Button
          color={ButtonColor.DANGER}
          text='Delete this entry'
          //@ts-expect-error resolve this later
          onClick={onDelete}
          variant='outlined'
        />
        <div
          style={{
            width: baseTokens.spacing.sm,
            height: '100%',
            backgroundColor: 'transparent',
          }}
        />
        <Button
          color={ButtonColor.SECONDARY}
          text='Keep this!'
          onClick={closeModal}
        />
      </ButtonWrapper>
    </Modal>
  );
};

export default DeleteModal;
