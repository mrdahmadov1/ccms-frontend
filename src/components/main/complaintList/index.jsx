import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Grid, Container, Box, Pagination } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ComplaintSearchFilterBar from '../complaintFilterBar';
import { useEffect, useState } from 'react';

const ComplaintList = ({ complaints }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    setFilteredComplaints(complaints);
  }, [complaints]);

  const handleSearch = (searchText) => {
    const filtered = complaints.filter((complaint) =>
      Object.values(complaint).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredComplaints(filtered);
  };

  // Calculate current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <ComplaintSearchFilterBar onSearch={handleSearch} />
      <Grid container spacing={1}>
        {currentItems.map(({ _id, title, submissionDate }) => (
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
        ))}
      </Grid>
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
    </Container>
  );
};

ComplaintList.propTypes = {
  complaints: PropTypes.array.isRequired,
};

export default ComplaintList;
