import Typography from '@mui/joy/Typography';
import Button from './Button';
import { ButtonColor } from '../../constants/enums';
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
      <Button color={ButtonColor.INFO} text='Get Started!' onClick={onClick} />
    </Typography>
  );
};

export default EmptyScreen;
