import CustomLink from './CustomLink';

export interface PaginationProps {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

const Pagination = (props: PaginationProps) => {
  const {
    currentPage,
    totalCount,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  } = props;

  return (
    <>
      <CustomLink title='<<< Prev' onClick={goToPreviousPage} />
      {`Page ${currentPage} of ${totalPages} / (${totalCount}) Total Journal Entries`}
      <CustomLink title='>>> Next' onClick={goToNextPage} />
    </>
  );
};

export default Pagination;
