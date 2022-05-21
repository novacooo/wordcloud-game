import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

export interface WordHandle {
  width: number;
  height: number;
  setLeft: (x: number) => void;
  setBottom: (y: number) => void;
}

interface WordProps {
  children: string;
  good?: boolean;
  selected?: boolean;
  check?: boolean;
  onClick?: () => void;
}

interface StyledWordProps extends WordProps {
  left: number;
  bottom: number;
}

const StyledWord = styled.span<StyledWordProps>`
  position: absolute;
  visibility: ${({ left, bottom }) => (left && bottom ? 'visible' : 'hidden')};
  left: ${({ left }) => (left ? `${left}px` : '0')};
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : '0')};
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

const Word = forwardRef<WordHandle, WordProps>(
  ({ children, good, selected, check, onClick }, ref) => {
    const [leftPosition, setLeftPosition] = useState<number>(0);
    const [bottomPosition, setBottomPosition] = useState<number>(0);

    const styledWordRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => ({
      width: styledWordRef.current ? styledWordRef.current.clientWidth : 0,
      height: styledWordRef.current ? styledWordRef.current?.clientHeight : 0,
      setLeft: (x) => setLeftPosition(x),
      setBottom: (y) => setBottomPosition(y),
    }));

    return (
      <StyledWord
        ref={styledWordRef}
        left={leftPosition}
        bottom={bottomPosition}
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
