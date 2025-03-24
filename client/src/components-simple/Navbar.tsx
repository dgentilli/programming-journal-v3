import styled from 'styled-components';
import { BaseTokens, baseTokens } from '../theme/baseTokens';
import CustomLink from './CustomLink';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchModal from '../components-complex/search/SearchModal';
import SearchContainer from '../components-complex/search/SearchContainer';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
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
          <CustomLink
            title='Search'
            color={baseTokens.colors.white}
            fontSize={baseTokens.fontSizes.xxl as keyof BaseTokens['fontSizes']}
            onClick={() => setIsModalOpen(true)}
          />
        </ListItem>
      </List>
      {isModalOpen && <SearchContainer closeModal={closeModal} />}
    </NavWrapper>
  );
};

export default Navbar;
