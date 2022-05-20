import styled from 'styled-components';

interface ButtonProps {
  children: string;
}

const Button = styled.button<ButtonProps>`
  padding: 1.2rem 1.6rem;
  background-color: ${({ theme }) => theme.color.accent};
  border: none;
  border-radius: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.button};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.white};
  letter-spacing: 0.08em;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.accentHover};
    transform: scale(0.99);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export default Button;
