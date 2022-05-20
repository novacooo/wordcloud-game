import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Text>Enter your nickname to start the game!</Text>
      <Input placeholder="Enter your nickname" />
      <Button onClick={() => navigate(routes.game)}>Start game</Button>
    </>
  );
};

export default LoginPage;
