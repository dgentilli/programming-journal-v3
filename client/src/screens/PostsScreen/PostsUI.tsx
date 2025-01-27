import { ButtonType } from '../../../constants/enums';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import Footer from '../../components/Footer';
import { Journal } from '../../types/common';
import beach from '../../assets/beach_wideScreen.jpg';

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
  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error: {error?.message}</div>; // Display error message
  }

  if (journals?.length === 0) {
    return <div>No Posts</div>;
  }

  return (
    <>
      <header>
        <img
          src={beach}
          alt='A wide angle image of a tropical beach at sunset.'
          style={{ width: '100%', height: 'auto' }}
        />
      </header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          type={ButtonType.INFO}
          text='New Journal Entry'
          onClick={createNewEntry}
        />
        <div>{`Page ${currentPage} of ${totalPages} / (${totalCount}) Total Journal Entries`}</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            type={ButtonType.INFO}
            text='Next >>>'
            onClick={goToNextPage}
          />
          <Button
            type={ButtonType.INFO}
            text='<<< Prev'
            onClick={goToPreviousPage}
          />
        </div>
      </div>
      <ul>
        {journals?.map((post) => {
          const { _id } = post;
          return (
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
    </>
  );
};

export default PostsUI;
