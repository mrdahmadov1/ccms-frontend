/* eslint-disable react/prop-types */
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { useState } from 'react';

const ComplaintSearchFilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({ searchText: '', status: '', priority: '' });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={8}>
          <TextField
            label="Search"
            name="searchText"
            value={filters.searchText}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3} lg={2}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              label="Priority"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplaintSearchFilterBar;
