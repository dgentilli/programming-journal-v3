import { ButtonColor } from '../../../constants/enums';
import Button from '../../components-simple/Button';
import ListItem from '../../components-simple/ListItem';
import Footer from '../../components-simple/Footer';
import { Journal } from '../../types/common';
import ScreenWrapper from '../../components-simple/ScreenWrapper';
import Pagination from '../../components-simple/Pagination';
import EmptyScreen from '../../components-simple/EmptyScreen';
import { useNavigate } from 'react-router-dom';

interface PostsUIProps {
  journals: Journal[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onClick: (id: string) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  createNewEntry: () => void;
}

const PostsUI = (props: PostsUIProps) => {
  const {
    journals,
    isLoading,
    isError,
    error,
    totalCount,
    totalPages,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    onClick,
    createNewEntry,
  } = props;
  const navigate = useNavigate();

  const paginationProps = {
    currentPage,
    totalCount,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    if (error?.status === '401') {
      return navigate('/auth');
    }
    return <div>Error: {error?.message}</div>; // Display error message
  }

  if (!journals || journals?.length === 0) {
    return <EmptyScreen onClick={createNewEntry} />;
  }

  return (
    <ScreenWrapper screenTitle='Programming Journal'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Button
          color={ButtonColor.INFO}
          text='New Journal Entry'
          onClick={createNewEntry}
        />
        <Pagination {...paginationProps} />
      </div>
      <ul>
        {journals?.map((post) => {
          const { _id } = post;
          return (
            //@ts-expect-error the data are fine
            <ListItem key={_id} postData={post} onClick={() => onClick(_id)} />
          );
        })}
      </ul>
      <Footer>
        <Button
          color={ButtonColor.INFO}
          text='Next >>>'
          onClick={goToNextPage}
        />
        <div style={{ marginLeft: '36px' }}>
          <Button
            color={ButtonColor.INFO}
            text='New Journal Entry'
            onClick={createNewEntry}
          />
        </div>

        <Button
          color={ButtonColor.INFO}
          text='<<< Prev'
          onClick={goToPreviousPage}
        />
      </Footer>
    </ScreenWrapper>
  );
};

export default PostsUI;
