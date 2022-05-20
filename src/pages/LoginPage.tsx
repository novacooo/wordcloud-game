import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Button from 'components/Button';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(routes.game)}>Start game</Button>
    </>
  );
};

export default LoginPage;
