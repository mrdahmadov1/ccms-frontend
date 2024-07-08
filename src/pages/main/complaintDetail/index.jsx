import { useDispatch, useSelector } from 'react-redux';
import ComplaintCard from '../../../components/main/complaintCard';
import { Grid, Container } from '@mui/material';
import { useEffect } from 'react';
import { getComplaint } from '../../../store/complaintSlice';
import { useParams } from 'react-router-dom';

const ComplaintDetail = () => {
  const dispatch = useDispatch();
  const { complaint } = useSelector((state) => state.complaint);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getComplaint(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} key={id}>
          {complaint && <ComplaintCard {...complaint} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ComplaintDetail;
