import Spacer from '../../components-simple/Spacer';
import TextInput from '../../components-simple/TextInput';
import { baseTokens } from '../../theme/baseTokens';

interface Props {
  formData: { email: string; password: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginSignupUI = (props: Props) => {
  const { formData, handleChange } = props;

  return (
    <>
      <TextInput
        name='email'
        label='Email'
        value={formData.email}
        placeholder='Email'
        onChange={handleChange}
      />
      <Spacer height={baseTokens.spacing.xxl} />
      <TextInput
        name='password'
        label='Password'
        type='password'
        value={formData.password}
        placeholder='Password'
        onChange={handleChange}
      />
    </>
  );
};

export default LoginSignupUI;
