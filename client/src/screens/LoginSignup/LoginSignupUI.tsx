import Spacer from '../../components-simple/Spacer';
import TextInput from '../../components-simple/TextInput';
import Checkbox from '../../components-simple/Checkbox';
import { baseTokens } from '../../theme/baseTokens';

interface Props {
  formData: {
    email: string;
    password: string;
    shouldCreateNewAccount: boolean;
  };
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
        isRequired
        onChange={handleChange}
      />
      <Spacer height={baseTokens.spacing.xxl} />
      <TextInput
        name='password'
        label='Password'
        type='password'
        value={formData.password}
        placeholder='Password'
        isRequired
        onChange={handleChange}
      />
      <Spacer height={baseTokens.spacing.xxl} />
      <Checkbox
        isChecked={formData.shouldCreateNewAccount}
        label='I need to create a new account'
        onChange={() => {}}
      />
    </>
  );
};

export default LoginSignupUI;
