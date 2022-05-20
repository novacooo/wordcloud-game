import { useNavigate } from 'react-router-dom';
import routes from 'common/routes';
import styled from 'styled-components';

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
  color: ${({ theme }) => theme.fontColor.primary};
`;

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <Header>Wordcloud game</Header>
      <button onClick={() => navigate(routes.game)}>go to GamePage</button>
    </StyledWrapper>
  );
};

export default LoginPage;
