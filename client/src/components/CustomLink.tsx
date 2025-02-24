import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

type StyleProps = {
  color?: string;
  fontSize?: typeof baseTokens.fontSizes;
};

const ButtonLink = styled.button<StyleProps>`
  color: ${baseTokens.colors.blue100};
  font-style: ${(props) => props.fontSize || baseTokens.fontSizes.lg};
  background-color: transparent;
`;

interface LinkProps {
  title: string;
  onClick: () => void;
  color?: string;
  fontSize?: typeof baseTokens.fontSizes;
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
