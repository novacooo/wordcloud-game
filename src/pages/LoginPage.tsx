import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <InputWrapper>
        <Text>Enter your nickname to start the game!</Text>
        <Input placeholder="Enter your nickname" />
      </InputWrapper>
      <Button onClick={() => navigate(routes.game)}>Start game</Button>
    </>
  );
};

export default LoginPage;
