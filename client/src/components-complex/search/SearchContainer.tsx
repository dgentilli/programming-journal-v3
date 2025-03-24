import React from 'react';
import SearchModal from './SearchModal';

const MemoizedSearchModal = React.memo(SearchModal);
interface SearchContainerProps {
  closeModal: () => void;
}

const SearchContainer = (props: SearchContainerProps) => {
  const { closeModal } = props;

  const mockData = [
    {
      _id: '01',
      createdAt: '234',
      content: 'React: Learning some stuff',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
    {
      _id: '02',
      createdAt: '123',
      content: 'CSS: Some other stuf',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
    {
      _id: '03',
      createdAt: '123',
      content: 'TS: Fun with type safety!',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
    {
      _id: '04',
      createdAt: '123',
      content: 'React: Epic React',
      text: 'Lorem ipsum dolor sit amet.',
    },
    {
      _id: '05',
      createdAt: '123',
      content: 'JS: array methods',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
  ];
  return (
    <MemoizedSearchModal searchResults={mockData} closeModal={closeModal} />
  );
};

export default SearchContainer;
