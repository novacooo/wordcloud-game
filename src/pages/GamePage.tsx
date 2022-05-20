import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>GamePage</p>
      <Button onClick={() => navigate(routes.summary)}>
        go to SummaryPage
      </Button>
    </div>
  );
};

export default GamePage;
