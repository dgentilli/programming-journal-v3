import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';
import { useEffect, useRef } from 'react';

const SearchInputUI = styled.input`
  flex: 2;
  padding: ${baseTokens.spacing.md};
  width: 50%;
  border-radius: ${baseTokens.radius.md};
`;

interface SearchInputProps {
  value: string;
  onChange: (input: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { value, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <SearchInputUI
      id='search'
      name='search'
      type='search'
      placeholder='Search'
      value={value}
      spellCheck={true}
      onChange={(event) => onChange(event.target.value)}
      ref={inputRef}
    />
  );
};

export default SearchInput;
