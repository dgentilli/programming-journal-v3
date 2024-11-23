import styled from 'styled-components';
import { ButtonType } from '../../constants/enums';
import { baseTokens } from '../theme/baseTokens';

interface ButtonProps {
  type: ButtonType;
  text: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onClick: () => void;
}

const getButtonBgColor = (type: ButtonType) => {
  switch (type) {
    case ButtonType.DANGER:
      return baseTokens.colors.red;
    case ButtonType.WARNING:
      return baseTokens.colors.orange;
    case ButtonType.SECONDARY:
      return 'transparent';
    // default will cover both info and submit cases
    default:
      return baseTokens.colors.blue700;
  }
};

const getButtonTextColor = (type: ButtonType) => {
  return type === ButtonType.SECONDARY
    ? baseTokens.colors.blue700
    : baseTokens.colors.white;
};

const getBorder = (type: ButtonType) => {
  return type === ButtonType.SECONDARY
    ? `2px solid ${baseTokens.colors.blue700}`
    : 'none';
};

const getOpacity = (isDisabled: boolean) => {
  return isDisabled ? 0.6 : 1;
};

const getFonSize = (type: ButtonType) => {
  return type === ButtonType.SUBMIT
    ? baseTokens.fontSizes.xl
    : baseTokens.fontSizes.md;
};

const ButtonWrapper = styled.button<Omit<ButtonProps, 'text'>>`
  background-color: ${(props) => getButtonBgColor(props.type)};
  border-radius: ${baseTokens.radius.md};
  border: ${(props) => getBorder(props.type)};
  opacity: ${(props) => getOpacity(props.isDisabled || false)};
`;

const ButtonText = styled.p<Pick<ButtonProps, 'type'>>`
  color: ${(props) => getButtonTextColor(props.type)};
  font-size: ${(props) => getFonSize(props.type)};
  font-weight: 600;
`;

const Button = (props: ButtonProps) => {
  const {
    type,
    text,
    isDisabled = false,
    isFullWidth = false,
    onClick,
  } = props;

  return (
    <ButtonWrapper
      type={type}
      isDisabled={isDisabled}
      isFullWidth={isFullWidth}
      onClick={onClick}
    >
      <ButtonText type={type}>{text || 'Test Btn'}</ButtonText>
    </ButtonWrapper>
  );
};

export default Button;
