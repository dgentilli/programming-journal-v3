import styled from 'styled-components';
import { baseTokens } from '../theme/baseTokens';
import { ReactElement } from 'react';

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  background-color: ${baseTokens.colors.white};
`;

interface FooterProps {
  children: ReactElement[];
}

const Footer = (props: FooterProps) => {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export default Footer;
