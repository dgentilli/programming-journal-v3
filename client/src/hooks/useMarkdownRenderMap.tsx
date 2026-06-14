import { ReactNode, useMemo } from 'react';

const useMarkdownRenderMap = () => {
  return useMemo(() => {
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
      code: ({ children }: { children?: ReactNode }) => (
        <div
          style={{
            backgroundColor: '#eee',
            padding: '12px',
            borderRadius: '8px',
          }}
        >
          {children}
        </div>
      ),
    };
  }, []);
};

export default useMarkdownRenderMap;
