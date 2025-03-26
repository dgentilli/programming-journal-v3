import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

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

  return (
    <SearchInputUI
      id='search'
      name='search'
      type='search'
      placeholder='Search'
      value={value}
      spellCheck={true}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default SearchInput;
