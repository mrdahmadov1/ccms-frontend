import ComplaintList from '../../../components/main/complaintList';
import MainLayout from '../../../layouts/mainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllComplaints } from '../../../store/complaintSlice';

const AllComplaints = () => {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(getAllComplaints());
  }, [dispatch]);

  return (
    <MainLayout title="All Complaints">
      {complaints && <ComplaintList complaints={complaints} />}
    </MainLayout>
  );
};

export default AllComplaints;
