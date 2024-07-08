import ComplaintList from '../../../components/main/complaintList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllComplaints } from '../../../store/complaintSlice';

const AllComplaints = () => {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(getAllComplaints());
  }, [dispatch]);

  return <>{complaints && <ComplaintList complaints={complaints} />}</>;
};

export default AllComplaints;
