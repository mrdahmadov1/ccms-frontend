import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';
import './assets/css/reset.css';
import './assets/css/global.css';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
