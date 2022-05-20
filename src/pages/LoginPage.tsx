import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import styled from 'styled-components';
import Button from 'components/Button';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

const Header = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.accent};
`;

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <Header>Wordcloud game</Header>
      <Button onClick={() => navigate(routes.game)}>Start game</Button>
    </StyledWrapper>
  );
};

export default LoginPage;
