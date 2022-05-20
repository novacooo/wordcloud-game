import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useAppContext } from 'contexts/appContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.red};
`;

const LoginPage = () => {
  const { setIsLoggedIn, setNickname } = useAppContext();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (value === '') {
      setIsError(true);
      return;
    }
    setIsLoggedIn(true);
    setNickname(value);
    navigate(routes.game);
  };

  return (
    <>
      <Wrapper>
        <Text>Enter your nickname to start the game!</Text>
        <InputWrapper>
          <Input
            placeholder="Enter your nickname"
            value={value}
            error={isError}
            onChange={handleInputChange}
          />
          {isError && <ErrorText>You must enter your nickname!</ErrorText>}
        </InputWrapper>
      </Wrapper>
      <Button onClick={handleButtonClick}>Start game</Button>
    </>
  );
};

export default LoginPage;
