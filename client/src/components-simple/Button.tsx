import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/joy/Button';
import { ButtonColor } from '../../constants/enums';
import { baseTokens } from '../theme/baseTokens';

interface CustomButtonProps extends Omit<MUIButtonProps, 'color' | 'children'> {
  text: string;
  color: ButtonColor;
}

const getButtonBgColor = (color: ButtonColor) => {
  switch (color) {
    case ButtonColor.DANGER:
      return baseTokens.colors.red;
    case ButtonColor.WARNING:
      return baseTokens.colors.orange;
    case ButtonColor.SECONDARY:
      return 'transparent';
    default:
      return baseTokens.colors.blue700;
  }
};

const getButtonTextColor = (color: ButtonColor) => {
  return color === ButtonColor.SECONDARY
    ? baseTokens.colors.blue700
    : baseTokens.colors.white;
};

const getBorder = (color: ButtonColor) => {
  return color === ButtonColor.SECONDARY
    ? `2px solid ${baseTokens.colors.blue700}`
    : 'none';
};

const getOpacity = (isDisabled: boolean) => {
  return isDisabled ? 0.8 : 1;
};

const Button = ({
  color,
  text,
  disabled = false,
  fullWidth = false,
  variant,
  onClick,
  ...rest
}: CustomButtonProps) => {
  return (
    <MUIButton
      fullWidth={fullWidth}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: getButtonBgColor(color),
        color: getButtonTextColor(color),
        border: getBorder(color),
        opacity: getOpacity(disabled),
        fontWeight: 600,
        padding: baseTokens.spacing.md,
        borderRadius: baseTokens.radius.md,
        textTransform: 'none', // optional if you don’t want all-caps
        '&:hover': {
          opacity: disabled ? 0.7 : 0.9,
        },
      }}
      {...rest}
    >
      {text}
    </MUIButton>
  );
};

export default Button;
