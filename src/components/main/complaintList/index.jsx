/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  IconButton,
  Grid,
  Container,
  Box,
  Pagination,
  LinearProgress,
  Typography,
} from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ComplaintSearchFilterBar from '../complaintFilterBar';

const ComplaintCard = ({ _id, title, submissionDate, onReadMore }) => (
  <Grid item xs={12} key={_id}>
    <Card sx={{ paddingRight: 2, maxWidth: '100%', boxShadow: 1 }}>
      <CardHeader
        action={
          <IconButton
            color="primary"
            onClick={onReadMore}
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

const ComplaintList = ({ complaints }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.complaint);
  const [filters, setFilters] = useState({ searchText: '', status: '', priority: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = useCallback((event, value) => setCurrentPage(value), []);

  const handleFilterChange = useCallback((updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1);
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const { searchText, status, priority } = filters;
      const matchesSearchText = [
        complaint.title,
        complaint.name,
        complaint.email,
        complaint.address,
        complaint.phone,
      ].some((value) => value?.toString().toLowerCase().includes(searchText.toLowerCase()));
      const matchesStatus = status ? complaint.status === status : true;
      const matchesPriority = priority ? complaint.priority === priority : true;
      return matchesSearchText && matchesStatus && matchesPriority;
    });
  }, [complaints, filters]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredComplaints, currentPage, itemsPerPage]);

  const renderComplaints = () => (
    <Grid container spacing={1}>
      {currentItems.map((complaint) => (
        <ComplaintCard
          key={complaint._id}
          {...complaint}
          onReadMore={() => navigate(`${location.pathname}/${complaint._id}`)}
        />
      ))}
    </Grid>
  );

  const renderPagination = () => (
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
  );

  const renderNoComplaintsMessage = () => (
    <Typography sx={{ mt: 2, textAlign: 'center' }} variant="h6">
      No complaints
    </Typography>
  );

  const renderLoading = () => (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );

  return (
    <Container>
      <ComplaintSearchFilterBar onFilterChange={handleFilterChange} />
      {currentItems.length
        ? renderComplaints()
        : status !== 'loading' && renderNoComplaintsMessage()}
      {status !== 'loading' && filteredComplaints.length > 0 && renderPagination()}
      {status === 'loading' && filteredComplaints.length === 0 && renderLoading()}
    </Container>
  );
};

ComplaintList.propTypes = {
  complaints: PropTypes.array.isRequired,
};

export default ComplaintList;
