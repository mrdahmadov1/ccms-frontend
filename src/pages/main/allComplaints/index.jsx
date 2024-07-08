import ComplaintList from '../../../components/main/complaintList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllComplaints } from '../../../store/complaintSlice';
import { useOutletContext } from 'react-router-dom';

const AllComplaints = () => {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.complaint);
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle('All Complaints');
  }, [setTitle]);

  useEffect(() => {
    dispatch(getAllComplaints());
  }, [dispatch]);

  return <>{complaints && <ComplaintList complaints={complaints} />}</>;
};

export default AllComplaints;
