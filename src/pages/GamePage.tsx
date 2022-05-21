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

  const handleWordClick = (name: string) => {
    if (!isChecked) {
      dispatchWords({ type: WordsActionKind.TOGGLE_SELECT, name });
    }
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

      dispatchWords({ type: WordsActionKind.REMOVE_ALL });
      setQuestionSet(randomSet);
    }
  };

  const handleCheckAnswersButonClick = () => {
    Object.keys(wordsState).forEach((name) => {
      if (wordsState[name].selected) {
        dispatchWords({ type: WordsActionKind.SET_CHECKED, name });
      }
    });
    setIsChecked(true);
  };

  const handleFinishGameButtonClick = () => {
    let selectedGoodWords = 0;
    let selectedBadWords = 0;
    let notSelectedGoodWords = 0;

    Object.keys(wordsState).forEach((name) => {
      const word = wordsState[name];
      if (word.selected && word.good) selectedGoodWords += 1;
      if (word.selected && !word.good) selectedBadWords += 1;
      if (!word.selected && word.good) notSelectedGoodWords += 1;
    });

    setScore(selectedGoodWords * 2 - (selectedBadWords + notSelectedGoodWords));
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
          type: WordsActionKind.ADD,
          name: word,
        });
      });

      questionSet.good_words.forEach((word) => {
        dispatchWords({
          type: WordsActionKind.SET_GOOD,
          name: word,
        });
      });
    }
  }, [questionSet]);

  return (
    <>
      {!isLoggedIn && <Navigate to={routes.login} />}
      <Heading>Choose correct words!</Heading>
      <BoardWrapper>
        <QuestionHeader>
          {questionSet ? questionSet.question : 'Picking question 🤔'}
        </QuestionHeader>
        <Board>
          {isLoading && <Spinner />}
          {wordsState &&
            Object.keys(wordsState).map((name) => (
              <Word
                key={name}
                good={wordsState[name].good}
                selected={wordsState[name].selected}
                check={wordsState[name].checked}
                onClick={() => handleWordClick(name)}
              >
                {name}
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
