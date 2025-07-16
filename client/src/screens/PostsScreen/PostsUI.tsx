import { ButtonType } from '../../../constants/enums';
import Button from '../../components-simple/Button';
import ListItem from '../../components-simple/ListItem';
import Footer from '../../components-simple/Footer';
import { Journal } from '../../types/common';
import ScreenWrapper from '../../components-simple/ScreenWrapper';
import Pagination from '../../components-simple/Pagination';
import EmptyScreen from '../../components-simple/EmptyScreen';

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

  const paginationProps = {
    currentPage,
    totalCount,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };

  if (isLoading) {
    return <EmptyScreen onClick={createNewEntry} />; // Display loading state
  }

  if (isError) {
    return <div>Error: {error?.message}</div>; // Display error message
  }

  if (!journals || journals?.length === 0) {
    return <div>No Posts</div>;
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
          type={ButtonType.INFO}
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
        <Button type={ButtonType.INFO} text='Next >>>' onClick={goToNextPage} />
        <div style={{ marginLeft: '36px' }}>
          <Button
            type={ButtonType.INFO}
            text='New Journal Entry'
            onClick={createNewEntry}
          />
        </div>

        <Button
          type={ButtonType.INFO}
          text='<<< Prev'
          onClick={goToPreviousPage}
        />
      </Footer>
    </ScreenWrapper>
  );
};

export default PostsUI;
