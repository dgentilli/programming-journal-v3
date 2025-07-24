import { styled } from 'styled-components';
import { baseTokens } from '../theme/baseTokens';
import Button from './Button';
import { ButtonColor } from '../../constants/enums';

const Wrapper = styled.li`
  padding: ${baseTokens.spacing.md};
  margin: 0 auto;
  max-width: 900px;
  margin-bottom: ${baseTokens.spacing.md};
  border-radius: ${baseTokens.radius.md};
  border: 1px solid ${baseTokens.colors.gray100};
`;

const Title = styled.h3`
  color: ${baseTokens.colors.gray400};
  text-align: center;
`;

const Text = styled.p`
  color: ${baseTokens.colors.gray300};
  line-height: 1.7;
  text-align: left;
`;

const Date = styled.p`
  font-size: ${baseTokens.fontSizes.sm};
  color: ${baseTokens.colors.blue100};
`;

export interface ListItemProps {
  postData: {
    title: string;
    content: string;
    createdAt: string;
    _id: string;
  };
  onClick: () => void;
}

const ListItem = (props: ListItemProps) => {
  const { postData, onClick } = props;
  const { title, content, createdAt } = postData;
  const formattedDate = createdAt.toLocaleString();

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Date>{formattedDate}</Date>
      <Text>{content}</Text>
      <Button color={ButtonColor.INFO} text='Read More' onClick={onClick} />
    </Wrapper>
  );
};

export default ListItem;
