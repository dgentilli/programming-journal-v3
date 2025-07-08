import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import { InputHTMLAttributes } from 'react';
import { ColorPaletteProp } from '@mui/joy';
interface TextInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'value' | 'onChange'
  > {
  name: string;
  value: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
/** name, value, and onChange are actually optional on the HTMLInputElement
 * So omit them, then add them in manually as required props
 */
const TextInput = (props: TextInputProps) => {
  const {
    name,
    value,
    placeholder = 'Type in here…',
    label = '',
    errorMessage,
    isRequired,
    onChange,
    ...rest
  } = props;

  const inputColor: ColorPaletteProp = errorMessage ? 'danger' : 'neutral';

  const renderErrorMessage = () => {
    if (errorMessage) {
      return (
        <Typography level='body-md' color='danger' sx={{ mt: 0.5 }}>
          {errorMessage}
        </Typography>
      );
    }

    return <></>;
  };

  return (
    <div>
      <FormLabel required={isRequired}>
        <Typography level='body-md'>{label || name}</Typography>
      </FormLabel>
      <Input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        //@ts-expect-error this uses the ColorPaletteProp from mui
        color={inputColor}
        {...rest}
      />
      {renderErrorMessage()}
    </div>
  );
};

export default TextInput;
