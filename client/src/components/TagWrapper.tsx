import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';
import Tag from './Tag';

interface TagWrapperProps {
  tags: string[];
}

const EmptyMessage = styled.p`
  color: ${baseTokens.colors.blue700};
`;

const TagWrapper = (props: TagWrapperProps) => {
  const { tags } = props;

  if (tags.length < 1) {
    return <EmptyMessage>No tags for this journal entry</EmptyMessage>;
  }

  return tags.map((tag) => <Tag tagText={tag} />);
};

export default TagWrapper;
