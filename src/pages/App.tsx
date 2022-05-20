import { Helmet } from 'react-helmet';
import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from 'common/routes';
import MainTemplate from 'templates/MainTemplate';
import LoginPage from './LoginPage';
import GamePage from './GamePage';
import SummaryPage from './SummaryPage';

const App = () => (
  <>
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <MainTemplate>
      <HashRouter basename="/">
        <Routes>
          <Route path={routes.game} element={<GamePage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.summary} element={<SummaryPage />} />
        </Routes>
      </HashRouter>
    </MainTemplate>
  </>
);

export default App;
