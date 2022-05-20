import { Navigate, useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';
import Heading from 'components/Heading';
import Text from 'components/Text';
import styled from 'styled-components';
import { useAppContext } from 'contexts/appContext';

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const ScoreWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Score = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.accent};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const SummaryPage = () => {
  const { isLoggedIn, nickname, score, setIsLoggedIn, setNickname, setScore } =
    useAppContext();
  const navigate = useNavigate();

  const handleQuitGameButtonClick = () => {
    setIsLoggedIn(false);
    setNickname(undefined);
    setScore(undefined);
    navigate(routes.login);
  };

  const handleTryAgainButtonClick = () => {
    setScore(undefined);
    navigate(routes.game);
  };

  return (
    <>
      {!isLoggedIn && <Navigate to={routes.login} />}
      {!score && <Navigate to={routes.game} />}
      <TextWrapper>
        <Heading>Congratulations {nickname}!</Heading>
        <ScoreWrapper>
          <Text>Your score:</Text>
          <Score>{score} points</Score>
        </ScoreWrapper>
      </TextWrapper>
      <ButtonsWrapper>
        <Button secondary onClick={handleQuitGameButtonClick}>
          Quit game
        </Button>
        <Button onClick={handleTryAgainButtonClick}>Try again</Button>
      </ButtonsWrapper>
    </>
  );
};

export default SummaryPage;
