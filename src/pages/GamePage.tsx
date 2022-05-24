import { useEffect, useReducer, useRef, useState } from 'react';
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
import Word, { WordHandle } from 'components/Word';
import { WordsActionKind, wordsReducer } from 'reducers/wordsReducer';

interface IFilledArea {
  left: number;
  bottom: number;
  width: number;
  height: number;
}

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const Board = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  width: 100%;
  max-width: 65rem;
  height: 45rem;
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

const checkIsAreaTaken = (newArea: IFilledArea, filledAreas: IFilledArea[]) => {
  for (let i = 0; i < filledAreas.length; i += 1) {
    const checkArea = filledAreas[i];
    if (
      newArea.left > checkArea.left - newArea.width &&
      newArea.left < checkArea.left + newArea.width &&
      newArea.bottom > checkArea.bottom - newArea.height &&
      newArea.bottom < checkArea.bottom + newArea.height
    ) {
      return true;
    }
  }
  return false;
};

const GamePage = () => {
  const { isLoggedIn, setScore } = useAppContext();

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [questionsData, setQuestionsData] = useState<ISet[]>();
  const [questionSet, setQuestionSet] = useState<ISet>();
  const [boardWidth, setBoardWidth] = useState<number>(0);
  const [boardHeight, setBoardHeight] = useState<number>(0);

  const [wordsState, dispatchWords] = useReducer(wordsReducer, {});

  const boardRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<WordHandle[]>([]);

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
    if (isChecked) return;

    dispatchWords({ type: WordsActionKind.TOGGLE_SELECT, name });
  };

  const handleRefreshButtonClick = () => {
    setIsLoading(true);
    setIsError(false);
    doGetQuestions();
  };

  const handlePickAnotherQuestionButtonClick = () => {
    if (!questionsData) return;

    let randomSet;

    do {
      randomSet = getRandomQuestionSet(questionsData);
    } while (randomSet === questionSet);

    dispatchWords({ type: WordsActionKind.REMOVE_ALL });
    setQuestionSet(randomSet);
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
    if (!boardRef.current) return;

    setBoardWidth(boardRef.current.clientWidth);
    setBoardHeight(boardRef.current.clientHeight);
  }, [setBoardWidth, setBoardHeight]);

  useEffect(() => {
    if (questionsData) {
      const randomSet = getRandomQuestionSet(questionsData);
      setQuestionSet(randomSet);
    }
  }, [questionsData]);

  useEffect(() => {
    if (!questionSet) return;

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
  }, [questionSet]);

  useEffect(() => {
    if (!questionSet) return;

    wordsRef.current = [];
    setTimeout(() => {
      const filledAreas: IFilledArea[] = [];
      const padding = 30;

      wordsRef.current.forEach((word) => {
        const wordWidth = word.width;
        const wordHeight = word.height;

        const maxLeft = boardWidth - wordWidth - padding * 2;
        const maxBottom = boardHeight - wordHeight - padding * 2;

        let randomLeft;
        let randomBottom;
        let newArea: IFilledArea;
        let i = 0;

        do {
          randomLeft = Math.floor(Math.random() * maxLeft) + padding;
          randomBottom = Math.floor(Math.random() * maxBottom) + padding;

          newArea = {
            left: randomLeft,
            bottom: randomBottom,
            width: wordWidth,
            height: wordHeight,
          };

          i += 1;
        } while (checkIsAreaTaken(newArea, filledAreas) && i < 100);

        filledAreas.push(newArea);

        dispatchWords({
          type: WordsActionKind.CHANGE_POSITION,
          name: word.name,
          left: randomLeft,
          bottom: randomBottom,
        });
      });
    }, 10);
  }, [boardHeight, boardWidth, questionSet]);

  return (
    <>
      {!isLoggedIn && <Navigate to={routes.login} />}
      <Heading>Choose correct words!</Heading>
      <BoardWrapper>
        <QuestionHeader>
          {questionSet ? questionSet.question : 'Picking question 🤔'}
        </QuestionHeader>
        <Board ref={boardRef}>
          {isLoading && <Spinner />}
          {wordsState &&
            Object.keys(wordsState).map((name, index) => (
              <Word
                key={name}
                ref={(element) => {
                  wordsRef.current[index] = element as never;
                }}
                left={wordsState[name].left}
                bottom={wordsState[name].bottom}
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
