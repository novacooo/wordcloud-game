import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>GamePage</p>
      <button onClick={() => navigate(routes.summary)}>
        go to SummaryPage
      </button>
    </div>
  );
};

export default GamePage;
