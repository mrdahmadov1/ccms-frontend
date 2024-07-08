import { lazy } from 'react';

export const Signin = lazy(() => import('./auth/signin'));
export const Signup = lazy(() => import('./auth/signup'));
export const Dashboard = lazy(() => import('./main/dashboard'));
export const SendComplaint = lazy(() => import('./main/sendComplaint'));
export const MyComplaints = lazy(() => import('./main/myComplaints'));
export const ComplaintDetail = lazy(() => import('./main/complaintDetail'));
export const Admin = lazy(() => import('./main/admin'));
export const AllComplaints = lazy(() => import('./main/allComplaints'));
