import { BrowserRouter, useRoutes } from 'react-router-dom';
import './App.css';
import { routes } from './utils/router/routes';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n/i18n';
import { SyncLanguage } from './contexts/SyncLanguage';

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

const App: React.FC = () => {
  return (
      <I18nextProvider i18n={i18n}>
        <SyncLanguage />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
      </I18nextProvider>
  );
};

export default App;
