import MUICheckbox from '@mui/joy/Checkbox';

interface CheckboxProps {
  isChecked: boolean;
  label: string;
  onChange: () => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { isChecked, label, onChange } = props;

  return <MUICheckbox checked={isChecked} label={label} onChange={onChange} />;
};

export default Checkbox;
