import { styled } from 'styled-components';
import { baseTokens } from '../theme/baseTokens';
import Button from './Button';
import { ButtonColor } from '../../constants/enums';
import DateDisplay from './DateDisplay';

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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
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

  return (
    <Wrapper>
      <Title>{title}</Title>
      <DateDisplay dateString={createdAt} format='EEEE, MMMM do, yyyy' />
      <Text>{content}</Text>
      <Button color={ButtonColor.INFO} text='Read More' onClick={onClick} />
    </Wrapper>
  );
};

export default ListItem;
