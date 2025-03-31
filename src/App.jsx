import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { checkAuthentication } from './redux/authSlice';
import AppRouter from './components/Router';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(checkAuthentication());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
