import { useEffect, useReducer, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';
import Text from 'components/Text';
import styled from 'styled-components';
import Heading from 'components/Heading';
import { useAppContext } from 'contexts/appContext';
import { ISet } from 'api/database';
import { getQuestions } from 'api';
import Spinner from 'components/Spinner';
import Word from 'components/Word';
import { WordsActionKind, wordsReducer } from 'reducers/wordsReducer';

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

const QuestionHeader = styled(Text)`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.accent};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const getRandomQuestionSet = (data: ISet[]): ISet => {
  return data[Math.floor(Math.random() * data.length)];
};

// TODO: Rozdzielić question set na pytanie i slowa
const GamePage = () => {
  const { isLoggedIn, setScore } = useAppContext();

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [questionsData, setQuestionsData] = useState<ISet[]>();
  const [questionSet, setQuestionSet] = useState<ISet>();

  const [wordsState, dispatchWords] = useReducer(wordsReducer, {});

  const doGetQuestions = async () => {
    try {
      const result = await getQuestions();
      setQuestionsData(result as ISet[]);
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

  const handlePickAnotherQuestionButtonClick = () => {
    if (questionsData) {
      let randomSet;

      do {
        randomSet = getRandomQuestionSet(questionsData);
      } while (randomSet === questionSet);

      dispatchWords({ type: WordsActionKind.REMOVE_ALL_WORDS });
      setQuestionSet(randomSet);
    }
  };

  const handleCheckAnswersButonClick = () => {
    setIsChecked(true);
  };

  const handleFinishGameButtonClick = () => {
    setScore(10);
    navigate(routes.summary);
  };

  useEffect(() => {
    doGetQuestions();
  }, []);

  useEffect(() => {
    if (questionsData) {
      const randomSet = getRandomQuestionSet(questionsData);
      setQuestionSet(randomSet);
    }
  }, [questionsData]);

  useEffect(() => {
    if (questionSet) {
      questionSet.all_words.forEach((word) => {
        dispatchWords({
          type: WordsActionKind.ADD_WORD,
          name: word,
        });
      });

      questionSet.good_words.forEach((word) => {
        dispatchWords({
          type: WordsActionKind.SET_GOOD_WORD,
          name: word,
        });
      });
    }
  }, [questionSet]);

  return (
    <>
      {!isLoggedIn && <Navigate to={routes.login} />}
      <Heading onClick={() => console.log(wordsState)}>
        Choose correct words!
      </Heading>
      <BoardWrapper>
        <QuestionHeader>
          {questionSet ? questionSet.question : 'Picking question 🤔'}
        </QuestionHeader>
        <Board>
          {isLoading && <Spinner />}
          {questionSet &&
            questionSet.all_words.map((word, index) => (
              <Word key={word} check={index % 2 === 0} bad={index % 4 === 0}>
                {word}
              </Word>
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
        <ButtonsWrapper>
          <Button secondary onClick={handlePickAnotherQuestionButtonClick}>
            Pick another question
          </Button>
          <Button onClick={handleCheckAnswersButonClick}>Check answers</Button>
        </ButtonsWrapper>
      ) : (
        <Button onClick={handleFinishGameButtonClick}>Finish game</Button>
      )}
    </>
  );
};

export default GamePage;
