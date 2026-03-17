import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

type ButtonProps = {
  onClick: (tagName: string) => void;
};

const TagWrapper = styled.div`
  padding: ${baseTokens.spacing.sm};
  background-color: ${baseTokens.colors.blue100};
  color: ${baseTokens.colors.white};
  border-radius: ${baseTokens.radius.sm};
`;

const DeleteButton = styled.button<ButtonProps>`
  height: 4;
  width: 4;
  border-radius: 50%;
  background-color: ${baseTokens.colors.blue100};
  color: ${baseTokens.colors.white};
`;

interface TagProps {
  tagText: string;
  removeTag: (tagName: string) => void;
}

const Tag = (props: TagProps) => {
  const { tagText, removeTag } = props;

  return (
    <TagWrapper key={tagText}>
      {tagText}
      <DeleteButton onClick={() => removeTag(tagText)}>X</DeleteButton>
    </TagWrapper>
  );
};

export default Tag;
