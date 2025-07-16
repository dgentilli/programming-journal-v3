import Typography from '@mui/joy/Typography';
import Button from './Button';
import { ButtonType } from '../../constants/enums';
import Spacer from './Spacer';

interface EmptyScreenProps {
  onClick: () => void;
}

const EmptyScreen = (props: EmptyScreenProps) => {
  const { onClick } = props;

  return (
    <Typography>
      <Spacer />
      <div>You don't have any posts yet</div>
      <Spacer />
      <Button type={ButtonType.INFO} text='Get Started!' onClick={onClick} />
    </Typography>
  );
};

export default EmptyScreen;
