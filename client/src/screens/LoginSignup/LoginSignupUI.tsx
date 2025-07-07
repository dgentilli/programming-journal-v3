import TextInput from '../../components-simple/TextInput';

interface Props {
  formData: { email: string; password: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginSignupUI = (props: Props) => {
  const { formData, handleChange } = props;

  return (
    <TextInput
      name='email'
      label='Email'
      value={formData.email}
      placeholder='Email'
      handleChange={handleChange}
    />
  );
};

export default LoginSignupUI;
