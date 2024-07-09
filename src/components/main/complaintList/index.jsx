/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Grid, Container, Box, Pagination, LinearProgress, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ComplaintSearchFilterBar from '../complaintFilterBar';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const ComplaintList = ({ complaints }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.complaint);
  const [filters, setFilters] = useState({ searchText: '', status: '', priority: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearchText = Object.values(complaint).some((value) =>
        value.toString().toLowerCase().includes(filters.searchText.toLowerCase())
      );
      const matchesStatus = filters.status ? complaint.status === filters.status : true;
      const matchesPriority = filters.priority ? complaint.priority === filters.priority : true;
      return matchesSearchText && matchesStatus && matchesPriority;
    });
  }, [complaints, filters]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredComplaints, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  const ComplaintCard = ({ _id, title, submissionDate }) => (
    <Grid item xs={12} key={_id}>
      <Card sx={{ paddingRight: 2, maxWidth: '100%', boxShadow: 1 }}>
        <CardHeader
          action={
            <IconButton
              color="primary"
              onClick={() => {
                navigate(`${location.pathname}/${_id}`);
              }}
              sx={{ marginTop: 1, marginLeft: 'auto' }}
            >
              <ReadMoreIcon fontSize="large" />
            </IconButton>
          }
          title={title}
          titleTypographyProps={{ variant: 'h6' }}
          subheader={new Date(submissionDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          })}
          subheaderTypographyProps={{ variant: 'subtitle2' }}
        />
      </Card>
    </Grid>
  );

  return (
    <Container>
      <ComplaintSearchFilterBar onFilterChange={handleFilterChange} />
      <Grid container spacing={1}>
        {currentItems.map((complaint) => (
          <ComplaintCard key={complaint._id} {...complaint} />
        ))}
      </Grid>
      {status !== 'loading' && filteredComplaints.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(filteredComplaints.length / itemsPerPage)}
            page={currentPage}
            color="primary"
            boundaryCount={0}
            onChange={handlePageChange}
            sx={{ mt: 2, justifyContent: 'center' }}
          />
        </Box>
      )}
      {status !== 'loading' && filteredComplaints.length === 0 && (
        <Typography sx={{ mt: 2, textAlign: 'center' }} variant="h6">
          No complaints
        </Typography>
      )}
      {status === 'loading' && filteredComplaints.length === 0 && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </Container>
  );
};

ComplaintList.propTypes = {
  complaints: PropTypes.array.isRequired,
};

export default ComplaintList;
