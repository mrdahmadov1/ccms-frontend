import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/shared/sidebar';
import Header from '../../components/shared/header';

function MainLayout() {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} title={title} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" mt={8} sx={{ flexGrow: 1, p: 3 }}>
        <Outlet context={{ title, setTitle }} />
      </Box>
    </Box>
  );
}

export default MainLayout;
