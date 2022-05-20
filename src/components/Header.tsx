import styled from 'styled-components';

const Header = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.header};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.accent};
`;

export default Header;
