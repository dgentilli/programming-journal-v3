import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  label?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
  const {
    name,
    value,
    placeholder = 'Type in here…',
    label = '',
    handleChange,
  } = props;

  return (
    <div>
      <FormLabel>{label || name}</FormLabel>
      <Input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
