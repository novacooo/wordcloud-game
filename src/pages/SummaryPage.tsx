import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';

const SummaryPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>SummaryPage</p>
      <button onClick={() => navigate(routes.login)}>go to LoginPage</button>
    </div>
  );
};

export default SummaryPage;
