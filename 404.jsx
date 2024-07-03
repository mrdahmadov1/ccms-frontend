import { Box, Typography } from '@mui/material';

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page not found.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, we {"couldn't"} find the page you were looking for.
      </Typography>
    </Box>
  );
}

export default NotFoundPage;
