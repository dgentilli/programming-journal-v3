import styled from 'styled-components';
import { baseTokens, BaseTokens } from '../theme/baseTokens';

type StyleProps = {
  color?: string;
  fontSize?: keyof BaseTokens['fontSizes'];
};

const ButtonLink = styled.button<StyleProps>`
  color: ${(props) => props.color || baseTokens.colors.blue100};
  font-size: ${(props) => props.fontSize || baseTokens.fontSizes.lg};
  background-color: transparent;
`;

interface LinkProps {
  title: string;
  onClick: () => void;
  color?: string;
  fontSize?: keyof BaseTokens['fontSizes'];
}

const CustomLink = (props: LinkProps) => {
  const { title, color, fontSize, onClick } = props;

  return (
    <ButtonLink color={color} fontSize={fontSize} onClick={onClick}>
      {title}
    </ButtonLink>
  );
};

export default CustomLink;
