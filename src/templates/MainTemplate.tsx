import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import theme from 'theme/theme';
import Header from 'components/Header';
import { AppContextProvider } from 'contexts/appContext';
import { BoardContextProvider } from 'contexts/boardContext';

interface MainTemplateProps {
  children: React.ReactNode;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
  padding: 12rem 3rem 3rem 3rem;
`;

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <AppContextProvider>
      <BoardContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <StyledWrapper>
            <Header>Wordcloud game</Header>
            {children}
          </StyledWrapper>
        </ThemeProvider>
      </BoardContextProvider>
    </AppContextProvider>
  );
};

export default MainTemplate;
