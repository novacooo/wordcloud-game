import styled from 'styled-components';

interface ButtonProps {
  secondary?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 1rem 1.6rem;
  background-color: ${({ theme, secondary }) =>
    secondary ? 'transparent' : theme.color.accent};
  border: 0.2rem solid ${({ theme }) => theme.color.accent};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize.button};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, secondary }) =>
    secondary ? theme.color.accent : theme.color.white};
  letter-spacing: 0.08em;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color, transform;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.accentHover};
    border-color: ${({ theme }) => theme.color.accentHover};
    color: ${({ theme }) => theme.color.white};
    transform: scale(0.98);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export default Button;
