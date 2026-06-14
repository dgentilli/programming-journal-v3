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

export const allowedMarkdownElements = [
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
