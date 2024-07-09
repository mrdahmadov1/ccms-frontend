/* eslint-disable react/prop-types */
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <TextField
        label="Search"
        name="searchText"
        value={filters.searchText}
        onChange={handleFilterChange}
        sx={{ flexGrow: 1, mr: 2 }}
      />
      <FormControl sx={{ mr: 2, minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select name="status" value={filters.status} onChange={handleFilterChange} label="Status">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
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
    </Box>
  );
};

export default ComplaintSearchFilterBar;
