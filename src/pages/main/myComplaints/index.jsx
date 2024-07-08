import ComplaintList from '../../../components/main/complaintList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyComplaints } from '../../../store/complaintSlice';
import { useOutletContext } from 'react-router-dom';

const MyComplaints = () => {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.complaint);
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle('My Complaints');
  }, [setTitle]);

  useEffect(() => {
    dispatch(getMyComplaints());
  }, [dispatch]);

  return <>{complaints && <ComplaintList complaints={complaints} />}</>;
};

export default MyComplaints;
