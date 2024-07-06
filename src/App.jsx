import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import NotFoundPage from '../404';
import { Box, LinearProgress } from '@mui/material';

const Signin = lazy(() => import('./pages/auth/signin'));
const Signup = lazy(() => import('./pages/auth/signup'));
const Dashboard = lazy(() => import('./pages/main/dashboard'));
const SendComplaint = lazy(() => import('./pages/main/sendComplaint'));
const MyComplaints = lazy(() => import('./pages/main/myComplaints'));
const ComplaintDetail = lazy(() => import('./pages/main/complaintDetail'));
const Admin = lazy(() => import('./pages/main/admin'));
const AllComplaints = lazy(() => import('./pages/main/allComplaints'));
const AuthChecker = lazy(() => import('./pages/authChecker'));

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
                path="/send-complaint"
                element={
                  <AuthChecker>
                    <SendComplaint />
                  </AuthChecker>
                }
              />
              <Route
                path="/my-complaints"
                element={
                  <AuthChecker>
                    <MyComplaints />
                  </AuthChecker>
                }
              />
              <Route
                path="/my-complaints/:id"
                element={
                  <AuthChecker>
                    <ComplaintDetail />
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
              <Route
                path="/admin/all-complaints"
                element={
                  <AuthChecker>
                    <AllComplaints />
                  </AuthChecker>
                }
              />
              <Route
                path="/admin/all-complaints/:id"
                element={
                  <AuthChecker>
                    <ComplaintDetail />
                  </AuthChecker>
                }
              />
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
