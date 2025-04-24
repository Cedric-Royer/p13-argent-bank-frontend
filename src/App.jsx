import { useLayoutEffect, useEffect } from 'react'; 
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { checkAuthentication, forceLogout } from './redux/authSlice';
import AppRouter from './components/Router';
import './App.css';

function App() {
  useLayoutEffect(() => {
    store.dispatch(checkAuthentication());
  }, []);
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'logout-event') {
        store.dispatch(forceLogout());
        localStorage.removeItem('logout-event');
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
