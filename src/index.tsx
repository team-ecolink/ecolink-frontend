import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './font/fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>,
);
