import styled, { css } from 'styled-components';

interface WordProps {
  children: string;
  good?: boolean;
  selected?: boolean;
  check?: boolean;
}

const Word = styled.span<WordProps>`
  position: relative;
  padding: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.body};
  font-weight: ${({ theme, selected, check }) =>
    selected || check ? theme.fontWeight.bold : theme.fontWeight.regular};
  color: ${({ theme, selected }) =>
    selected ? theme.color.accent : theme.color.textPrimary};
  text-transform: capitalize;
  transition: color 0.2s;
  user-select: none;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.accent};
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 80%;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;
    font-size: ${({ theme }) => theme.fontSize.caption};
  }

  ${({ theme, check, good }) =>
    check &&
    css`
      color: ${good ? theme.color.green : theme.color.red};

      &:hover {
        color: ${good ? theme.color.green : theme.color.red};
      }

      &::before {
        content: '${good ? 'Good' : 'Bad'}';
        visibility: visible;
      }
    `}
`;

export default Word;
