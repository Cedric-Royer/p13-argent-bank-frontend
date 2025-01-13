import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import du Provider pour Redux
import { store } from './redux/store';  // Import du store Redux
import './index.css';
import App from './App.jsx';  // Import de ton composant principal

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Fournir le store Redux à toute l'application */}
      <App />  {/* Ton composant App */}
    </Provider>
  </StrictMode>
);
