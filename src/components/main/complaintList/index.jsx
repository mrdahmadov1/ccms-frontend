import PropTypes from 'prop-types';
import ComplaintCard from '../complaintCard';
import { Grid, Container } from '@mui/material';

const ComplaintList = ({ complaints }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        {complaints.map((complaint, index) => (
          <Grid item xs={12} key={index}>
            <ComplaintCard {...complaint} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

ComplaintList.propTypes = {
  complaints: PropTypes.array.isRequired,
};

export default ComplaintList;
