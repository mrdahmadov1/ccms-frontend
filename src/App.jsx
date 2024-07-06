import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthChecker from './pages/authChecker';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import Dashboard from './pages/main/dashboard';
import SendComplaint from './pages/main/sendComplaint';
import NotFoundPage from '../404';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { ToastContainer } from 'react-toastify';
import MyComplaints from './pages/main/myComplaints';
import Admin from './pages/main/admin';
import AllComplaints from './pages/main/allComplaints';
import ComplaintDetail from './pages/main/complaintDetail';

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
        </Router>
      </Provider>
      <ToastContainer newestOnTop autoClose={1500} position="top-center" />
    </>
  );
};

export default App;
