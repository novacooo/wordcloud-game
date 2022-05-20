import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>LoginPage</p>
      <button onClick={() => navigate(routes.game)}>go to GamePage</button>
    </div>
  );
};

export default LoginPage;
