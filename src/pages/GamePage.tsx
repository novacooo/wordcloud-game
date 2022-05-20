import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(routes.summary)}>
        go to SummaryPage
      </Button>
    </>
  );
};

export default GamePage;
