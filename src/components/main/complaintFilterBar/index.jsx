/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ComplaintSearchFilterBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Grid item marginBottom={4} xs={12}>
      <TextField
        fullWidth
        placeholder="Search by title, name, email, address, status, priority or phone"
        value={searchText}
        onChange={handleSearchInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default ComplaintSearchFilterBar;
