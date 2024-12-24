import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

interface SpacerProps {
  height?: string;
}

const VerticalSpacer = styled.div<SpacerProps>`
  width: 100%;
  height: ${(props) => props.height};
  background-color: transparent;
`;

const DEFAULT_HEIGHT = baseTokens.spacing.md;

const Spacer = (props: SpacerProps) => {
  const { height = DEFAULT_HEIGHT } = props;

  return <VerticalSpacer height={height} />;
};

export default Spacer;
