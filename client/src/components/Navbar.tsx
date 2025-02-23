import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${baseTokens.colors.blue100};
  max-height: 75px;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ListItem = styled.li`
  color: ${baseTokens.colors.white};
`;

const Home = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
`;

const Navbar = () => {
  return (
    <NavWrapper>
      <List>
        <ListItem>
          <Home>Home</Home>
        </ListItem>
        <ListItem>
          <input
            id='search'
            name='search'
            type='search'
            placeholder='Search'
            // value={title}
            spellCheck={true}
            // onChange={handleTitleChange}
          />
        </ListItem>
      </List>
    </NavWrapper>
  );
};

export default Navbar;
