import styled from 'styled-components';

const Input = styled.input`
  padding: 1.2rem 1.6rem;
  width: 100%;
  max-width: 25rem;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize.button};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.textPrimary};
  text-align: center;

  &::placeholder {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.textSecondary};
  }
`;

export default Input;
