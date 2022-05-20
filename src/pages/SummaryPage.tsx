import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';
import Heading from 'components/Heading';
import Text from 'components/Text';
import styled from 'styled-components';

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

const SummaryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <TextWrapper>
        <Heading>Congratulations Jack!</Heading>
        <ScoreWrapper>
          <Text>Your score:</Text>
          <Score>3 points</Score>
        </ScoreWrapper>
      </TextWrapper>
      <Button onClick={() => navigate(routes.login)}>Try again</Button>
    </>
  );
};

export default SummaryPage;
