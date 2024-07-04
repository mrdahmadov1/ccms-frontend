import { useDispatch, useSelector } from 'react-redux';
import ComplaintCard from '../complaintCard';
import { Grid, Container } from '@mui/material';
import { useEffect } from 'react';
import { getMyComplaints } from '../../../store/complaintSlice';

const ComplaintList = () => {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(getMyComplaints());
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={2}>
        {complaints.map((complaint, index) => (
          <Grid item xs={12} key={index}>
            <ComplaintCard
              name={complaint.name}
              title={complaint.title}
              description={complaint.description}
              email={complaint.email}
              phone={complaint.phone}
              address={complaint.address}
              status={complaint.status}
              priority={complaint.priority}
              submissionDate={complaint.submissionDate}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ComplaintList;
