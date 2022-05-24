import styled from 'styled-components';

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.textPrimary};
  text-align: center;
`;

export default Text;
