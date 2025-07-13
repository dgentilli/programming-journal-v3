import Spacer from '../../components-simple/Spacer';
import TextInput from '../../components-simple/TextInput';
import Checkbox from '../../components-simple/Checkbox';
import { baseTokens } from '../../theme/baseTokens';
import { FormData } from './LoginSignupContainer';
interface LoginSignupProps {
  formData: FormData;
  error?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginSignupUI = (props: LoginSignupProps) => {
  const { formData, error, handleChange, handleFormSubmission } = props;

  return (
    <form onSubmit={handleFormSubmission}>
      <TextInput
        name='email'
        label='Email'
        value={formData.email}
        placeholder='Email'
        isRequired
        errorMessage={error}
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
        errorMessage={error}
        onChange={handleChange}
      />
      <Spacer height={baseTokens.spacing.xxl} />
      <Checkbox
        name='shouldCreateNewAccount'
        isChecked={formData.shouldCreateNewAccount}
        label='I am creating a new account'
        onChange={handleChange}
      />
      <Spacer height={baseTokens.spacing.lg} />
      <div>
        <input
          type='submit'
          value='Submit'
          style={{
            height: 50,
            width: 200,
            borderRadius: baseTokens.radius.full,
            backgroundColor: baseTokens.colors.blue100,
            color: baseTokens.colors.white,
            fontSize: baseTokens.fontSizes.lg,
            fontWeight: 600,
            border: 'none',
          }}
        />
      </div>
    </form>
  );
};

export default LoginSignupUI;
