import React from 'react';
import SearchModal from './SearchModal';
import { Journal } from '../../types/common';

const MemoizedSearchModal = React.memo(SearchModal);
interface SearchContainerProps {
  closeModal: () => void;
}

const SearchContainer = (props: SearchContainerProps) => {
  const { closeModal } = props;

  const postData: Partial<Journal>[] = [
    {
      _id: '01',
      createdAt: '234',
      title: 'React: Learning some stuff',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
    {
      _id: '02',
      createdAt: '123',
      title: 'CSS: Some other stuf',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
    {
      _id: '03',
      createdAt: '123',
      title: 'TS: Fun with type safety!',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
    {
      _id: '04',
      createdAt: '123',
      title: 'React: Epic React',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      _id: '05',
      createdAt: '123',
      title: 'JS: array methods',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus deserunt possimus reprehenderit neque magni reiciendis fuga? Architecto at rem temporibus commodi. Autem modi earum sequi? Error facere odit consequatur?',
    },
  ];
  return (
    <MemoizedSearchModal searchResults={postData} closeModal={closeModal} />
  );
};

export default SearchContainer;
