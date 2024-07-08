import {
  Signin,
  Signup,
  Dashboard,
  SendComplaint,
  MyComplaints,
  ComplaintDetail,
  Admin,
  AllComplaints,
} from './lazy';

export const authRoutes = [
  {
    path: '/auth/signin',
    element: <Signin />,
  },
  {
    path: '/auth/signup',
    element: <Signup />,
  },
];

export const mainRoutes = [
  {
    path: '/',
    element: <Dashboard />,
    title: 'Dashboard',
  },
  {
    path: 'send-complaint',
    element: <SendComplaint />,
    title: 'Send Complaint',
  },
  {
    path: 'my-complaints',
    element: <MyComplaints />,
    title: 'My Complaints',
  },
  {
    path: 'my-complaints/:id',
    element: <ComplaintDetail />,
    title: 'Complaint Detail',
  },
  {
    path: '/admin',
    element: <Admin />,
    title: 'Admin Dashboard',
  },
  {
    path: '/admin/all-complaints',
    element: <AllComplaints />,
    title: 'All Complaints',
  },
  {
    path: '/admin/all-complaints/:id',
    element: <ComplaintDetail />,
    title: 'Complaint Detail',
  },
];
