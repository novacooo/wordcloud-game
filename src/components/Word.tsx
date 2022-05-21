import styled from 'styled-components';

interface WordProps {
  children: string;
  bad?: boolean;
  selected?: boolean;
  check?: boolean;
}

const Word = styled.span<WordProps>`
  padding: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.body};
  font-weight: ${({ theme, selected }) =>
    selected ? theme.fontWeight.bold : theme.fontWeight.regular};
  color: ${({ theme, selected }) =>
    selected ? theme.color.accent : theme.color.textPrimary};
  text-transform: capitalize;
  transition: color 0.2s;
  user-select: none;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.accent};
  }
`;

export default Word;
