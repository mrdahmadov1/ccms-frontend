import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthChecker from './pages/authChecker';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import Admin from './pages/main/admin';
import Dashboard from './pages/main/dashboard';
import NotFoundPage from '../404';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <AuthChecker>
                  <Dashboard />
                </AuthChecker>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthChecker>
                  <Admin />
                </AuthChecker>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Provider>

      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
