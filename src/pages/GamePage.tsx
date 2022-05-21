import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';
import Text from 'components/Text';
import styled from 'styled-components';
import Heading from 'components/Heading';
import { useAppContext } from 'contexts/appContext';
import { ISet } from 'api/database';
import { getQuestions } from 'api';

interface IQuestions {
  [key: string]: ISet;
}

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  width: 60rem;
  min-height: 40rem;
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
  const { isLoggedIn, setScore } = useAppContext();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IQuestions>();

  const doGetQuestions = async () => {
    try {
      const result = await getQuestions();
      setQuestions(result as IQuestions);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const handleRefreshButtonClick = () => {
    setIsLoading(true);
    setIsError(false);
    doGetQuestions();
  };

  const handleFinishGameButtonClick = () => {
    setScore(10);
    navigate(routes.summary);
  };

  useEffect(() => {
    doGetQuestions();
  }, []);

  return (
    <>
      {!isLoggedIn && <Navigate to={routes.login} />}
      <Heading>Choose correct words!</Heading>
      <BoardWrapper>
        <WordHeader>Select animals</WordHeader>
        <Board>
          {isLoading && <Text>Loading...</Text>}
          {questions &&
            Object.keys(questions).map((key) => (
              <Text key={key}>{questions[key].question}</Text>
            ))}
          {isError && (
            <>
              <Text>Something went wrong 😞</Text>
              <Button small secondary onClick={handleRefreshButtonClick}>
                Refresh
              </Button>
            </>
          )}
        </Board>
      </BoardWrapper>
      {!isChecked ? (
        <Button>Check answers</Button>
      ) : (
        <Button onClick={handleFinishGameButtonClick}>Finish game</Button>
      )}
    </>
  );
};

export default GamePage;
