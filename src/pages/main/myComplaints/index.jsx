import ComplaintList from '../../../components/main/complaintList';
import MainLayout from '../../../layouts/mainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyComplaints } from '../../../store/complaintSlice';

const MyComplaints = () => {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(getMyComplaints());
  }, [dispatch]);

  return (
    <MainLayout title="My Complaints">
      {complaints && <ComplaintList complaints={complaints} />}
    </MainLayout>
  );
};

export default MyComplaints;
