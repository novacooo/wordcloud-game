import { forwardRef, useImperativeHandle, useRef } from 'react';
import styled, { css } from 'styled-components';

export interface WordHandle {
  name: string;
  width: number;
  height: number;
}

interface WordProps {
  children: string;
  left: number;
  bottom: number;
  good?: boolean;
  selected?: boolean;
  check?: boolean;
  onClick?: () => void;
}

const StyledWord = styled.span<WordProps>`
  position: absolute;
  visibility: ${({ left, bottom }) => (left && bottom ? 'visible' : 'hidden')};
  left: ${({ left }) => (left ? `${left}px` : '0')};
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : '0')};
  padding: 1.5rem;
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
    top: 0;
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

const Word = forwardRef<WordHandle, WordProps>(
  ({ children, left, bottom, good, selected, check, onClick }, ref) => {
    const styledWordRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => ({
      name: children,
      width: styledWordRef.current ? styledWordRef.current.clientWidth : 0,
      height: styledWordRef.current ? styledWordRef.current?.clientHeight : 0,
    }));

    return (
      <StyledWord
        ref={styledWordRef}
        left={left}
        bottom={bottom}
        good={good}
        selected={selected}
        check={check}
        onClick={onClick}
      >
        {children}
      </StyledWord>
    );
  },
);

export default Word;
