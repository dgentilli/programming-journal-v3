import styled from 'styled-components';
import { BaseTokens, baseTokens } from '../theme/baseTokens';
import CustomLink from './CustomLink';
import { useNavigate } from 'react-router-dom';

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

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavWrapper>
      <List>
        <ListItem>
          <CustomLink
            title={'Home'}
            color={baseTokens.colors.white}
            fontSize={baseTokens.fontSizes.xxl as keyof BaseTokens['fontSizes']}
            onClick={() => navigate('/')}
          />
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
