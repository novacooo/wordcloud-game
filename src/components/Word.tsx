import { IFilledArea, useBoardContext } from 'contexts/boardContext';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

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

const Word = ({ children, good, selected, check, onClick }: WordProps) => {
  const { padding, width, height, filledAreas, addFilledArea } =
    useBoardContext();

  const [leftPosition, setLeftPosition] = useState<number>(0);
  const [bottomPosition, setBottomPosition] = useState<number>(0);
  const [area, setArea] = useState<IFilledArea>();

  const styledWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log(`Board width: ${width}`);
    console.log(`Board height: ${height}`);
    console.log(filledAreas);
  }, [filledAreas, height, width]);

  useEffect(() => {
    if (!styledWordRef.current) return;

    const wordWidth = styledWordRef.current.clientWidth;
    const wordHeight = styledWordRef.current.clientHeight;

    const maxLeft = width - wordWidth - padding * 2;
    const maxBottom = height - wordHeight - padding * 2;

    const randomLeft = Math.floor(Math.random() * maxLeft) + padding;
    const randomBottom = Math.floor(Math.random() * maxBottom) + padding;

    const newArea: IFilledArea = {
      left: randomLeft,
      bottom: randomBottom,
      width: wordWidth,
      height: wordHeight,
    };

    setLeftPosition(randomLeft);
    setBottomPosition(randomBottom);
    setArea(newArea);
  }, [height, padding, width]);

  useEffect(() => {
    if (!area) return;
    addFilledArea(area);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area]);

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
};

export default Word;
