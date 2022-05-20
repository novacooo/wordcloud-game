import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';
import Text from 'components/Text';
import styled from 'styled-components';
import Heading from 'components/Heading';

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Board = styled.div`
  width: 60rem;
  height: 40rem;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const WordHeader = styled(Text)`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.accent};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const GamePage = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  return (
    <>
      <Heading>Choose correct words!</Heading>
      <BoardWrapper>
        <WordHeader>Select animals</WordHeader>
        <Board></Board>
      </BoardWrapper>
      {!isChecked ? (
        <Button>Check answers</Button>
      ) : (
        <Button onClick={() => navigate(routes.summary)}>Finish game</Button>
      )}
    </>
  );
};

export default GamePage;
