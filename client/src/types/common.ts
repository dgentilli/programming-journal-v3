export type Journal = {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[] | undefined;
  createdAt?: string;
};

export interface EntryFormProps {
  titleText: string;
  bodyText: string;
  categoryText: string;
  tagsArray: string[] | undefined;
  isSubmitting: boolean;
  author: string;
  onSubmit: ({
    title,
    content,
    category,
    tags,
    author,
  }: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
  }) => void;
  onSuccess: () => void;
}
