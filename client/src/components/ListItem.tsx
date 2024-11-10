import { styled } from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

const Wrapper = styled.li`
  padding: ${baseTokens.spacing.md};
  margin: 0 auto;
  max-width: 900px;
  margin-bottom: ${baseTokens.spacing.md};
  border-radius: ${baseTokens.radius.md};
  border: 1px solid ${baseTokens.colors.gray200};
`;

const Title = styled.h3`
  color: ${baseTokens.colors.gray700};
  text-align: center;
`;

const Text = styled.p`
  color: ${baseTokens.colors.gray500};
  line-height: 1.7;
  text-align: left;
`;

const Date = styled.p`
  font-size: ${baseTokens.fontSizes.sm};
  color: ${baseTokens.colors.gray400};
`;

/** To DO
 * Create a button component. This is just a placeholder
 */
const ReadMore = styled.button`
  padding: ${baseTokens.spacing.md};
  background-color: ${baseTokens.colors.blue100};
  color: ${baseTokens.colors.gray800};
`;

interface ListItemProps {
  postData: {
    title: string;
    content: string;
    createdAt: string;
    _id: string;
  };
}

const ListItem = (props: ListItemProps) => {
  const { postData } = props;
  const { title, content, createdAt } = postData;
  const formattedDate = createdAt.toLocaleString();

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Date>{formattedDate}</Date>
      <Text>{content}</Text>
      <ReadMore>Details</ReadMore>
    </Wrapper>
  );
};

export default ListItem;
