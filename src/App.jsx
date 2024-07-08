import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import NotFoundPage from '../404';
import { Box, LinearProgress } from '@mui/material';
import AuthChecker from './pages/authChecker';
import MainLayout from './layouts/mainLayout';
import { authRoutes, mainRoutes } from './pages/routes';
import AuthLayout from './layouts/authLayout';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Suspense
            fallback={
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            }
          >
            <Routes>
              <Route path="/auth" element={<AuthLayout />}>
                {authRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
              </Route>

              <Route
                path="/"
                element={
                  <AuthChecker>
                    <MainLayout />
                  </AuthChecker>
                }
              >
                {mainRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                    title={route.title}
                  />
                ))}
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>

      <ToastContainer newestOnTop autoClose={1000} position="top-center" />
    </>
  );
};

export default App;
