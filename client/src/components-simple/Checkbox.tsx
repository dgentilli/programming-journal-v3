import MUICheckbox, {
  CheckboxProps as MUICheckboxProps,
} from '@mui/joy/Checkbox';

interface CheckboxProps extends Omit<MUICheckboxProps, 'checked' | 'onChange'> {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { isChecked, onChange, ...rest } = props;

  return <MUICheckbox checked={isChecked} onChange={onChange} {...rest} />;
};

export default Checkbox;
