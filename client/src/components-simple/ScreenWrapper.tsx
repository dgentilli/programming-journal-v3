import { styled } from 'styled-components';
import Navbar from './Navbar';
import { ReactNode } from 'react';
import Spacer from './Spacer';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

interface ScreenWrapperProps {
  screenTitle: string;
  children: ReactNode | ReactNode[];
}

const ScreenWrapper = (props: ScreenWrapperProps) => {
  const { children, screenTitle } = props;
  return (
    <Wrapper>
      <Navbar />
      <header>
        <h1>{screenTitle}</h1>
      </header>
      <Spacer height='50px' />
      {children}
    </Wrapper>
  );
};

export default ScreenWrapper;
