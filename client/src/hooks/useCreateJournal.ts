import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createJournal = async (formData: {
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
}) => {
  const response = await axios.post(
    'http://localhost:5000/api/journal/create',
    formData
  );
  return response.data;
};

export const useCreateJournal = () => {
  return useMutation(createJournal, {
    onSuccess: () => {
      console.log('Journal created successfully');
      // Add logic to update the UI, like navigating to another page or invalidating queries
    },
    onError: (error: unknown) => {
      console.error('Error creating journal:', error);
      // Show error messages or handle error state
    },
  });
};
