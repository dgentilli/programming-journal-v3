import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

const TagWrapper = styled.div`
  padding: ${baseTokens.spacing.sm};
  background-color: ${baseTokens.colors.blue100};
  color: ${baseTokens.colors.white};
  border-radius: ${baseTokens.radius.sm};
`;

interface TagProps {
  tagText: string;
}

const Tag = (props: TagProps) => {
  const { tagText } = props;

  return <TagWrapper>{tagText}</TagWrapper>;
};

export default Tag;
