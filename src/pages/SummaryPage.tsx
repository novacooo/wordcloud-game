import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';

const SummaryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(routes.login)}>go to LoginPage</Button>
    </>
  );
};

export default SummaryPage;
