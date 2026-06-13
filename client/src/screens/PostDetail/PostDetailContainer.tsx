import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import PostDetailUI, { DeleteJournalMutation } from './PostDetailUI';
import { Journal } from '../../types/common';
import { useUser } from '../../globalState/userStore';

const MemoizedPostDetailUI = React.memo(PostDetailUI);

// Define the API fetch function
const fetchJournalEntry = async (id: string, token?: string) => {
  if (!token) return;
  const response = await axios.get(`http://localhost:5000/api/journal/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const deleteJournalEntry = async (id: string, token: string) => {
  const response = await axios.delete(
    `http://localhost:5000/api/journal/${id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

const allowedMarkdownElements = [
  'p', // Paragraphs
  'br', // Line breaks
  'strong', // Bold text
  'em', // Italics
  'code', // Inline code
  'pre', // Code blocks
  'a', // Links
  'h1',
  'h2',
  'h3', // Headers
  'ul',
  'ol',
  'li', // Bullet and numbered lists
  'blockquote', // Code block quotes
];

const PostDetailContainer = () => {
  const user = useUser();
  const token = user?.token || '';
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const journalId = id || '';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const renderMap = useMemo(() => {
    return {
      a: ({ href, children }: { href?: string; children?: ReactNode }) => (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#0066cc' }}
        >
          {children}
        </a>
      ),
      blockquote: ({ children }: { children?: ReactNode }) => (
        <blockquote
          style={{
            borderLeft: '4px solid #ccc',
            paddingLeft: '16px',
            fontStyle: 'italic',
          }}
        >
          {children}
        </blockquote>
      ),
      ul: ({ children }: { children?: ReactNode }) => (
        <ul
          style={{
            listStyleType: 'disc', // Forces the classic bullet dot to show up
            paddingLeft: '24px', // Indents the list so it doesn't flush left
            margin: '12px 0', // Adds space above and below the list
            textAlign: 'left',
          }}
        >
          {children}
        </ul>
      ),
      li: ({ children }: { children?: ReactNode }) => (
        <li
          style={{
            listStyle: 'initial',
            marginBottom: '6px', // Adds breathing room between list items
            textAlign: 'left',
          }}
        >
          {children}
        </li>
      ),
    };
  }, []);

  const goToEditPage = useCallback(() => {
    navigate(`/edit/${id}`);
  }, [id, navigate]);

  const goBack = useCallback(() => {
    // window.history.back();
    navigate('/');
  }, [navigate]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['journals', 'detail', id],
    queryFn: () => fetchJournalEntry(journalId, token),
    refetchInterval: 300000, // 5 min in ms
    initialData: () => {
      return queryClient
        .getQueryData<Journal[]>(['journals', 'list'])
        ?.find((journal) => journal._id === id);
    },
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteJournalEntry(id, token), // Function to call for deletion
    onSuccess: () => {
      // Navigate to /home after successful deletion
      navigate('/');

      // Invalidate the query cache for the journal list
      //@ts-expect-error fix this later
      queryClient.invalidateQueries(['journals']);
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const { title, content, tags, category, createdAt } = data || {};

  return (
    <MemoizedPostDetailUI
      title={title}
      id={id}
      content={content}
      tags={tags}
      category={category}
      isLoading={isLoading}
      isError={isError}
      error={error}
      isModalOpen={isModalOpen}
      date={createdAt}
      renderMap={renderMap}
      allowedMarkdownElements={allowedMarkdownElements}
      mutation={mutation as DeleteJournalMutation}
      onClickEdit={goToEditPage}
      openModal={openModal}
      closeModal={closeModal}
      goBack={goBack}
    />
  );
};

export default PostDetailContainer;
