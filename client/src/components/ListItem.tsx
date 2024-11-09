import { styled } from 'styled-components';

const Wrapper = styled.div`
  background-color: #ccc;
  border: 1px solid #333;
`;

const Title = styled.h3`
  color: black;
`;

const Text = styled.p`
  color: black;
`;

interface ListItemProps {
  postData: {
    title: string;
    content: string;
    createdAt: string | number;
    _id: string;
  };
}

const ListItem = (props: ListItemProps) => {
  const { postData } = props;
  const { title, content } = postData;

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Text>{content}</Text>
    </Wrapper>
  );
};

export default ListItem;
