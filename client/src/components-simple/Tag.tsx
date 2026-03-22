import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

type ButtonProps = {
  onClick: (tagName: string) => void;
};

const TagWrapper = styled.div`
  padding-left: ${baseTokens.spacing.sm};
  background-color: ${baseTokens.colors.blue100};
  color: ${baseTokens.colors.white};
  border-radius: ${baseTokens.radius.sm};
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button<ButtonProps>`
  border-radius: 50%;
  background-color: ${baseTokens.colors.blue100};
  color: ${baseTokens.colors.white};
  border: none;
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
