import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Admin = () => {
  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          The Admin View allows administrators to manage and respond to customer complaints.
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="All Complaints View"
              secondary="View all submitted complaints with pagination support."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Filter and Search"
              secondary="Simple filtering and searching functionality by form attributes."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Change Complaint's Status/Prority"
              secondary="Administrators can update the complaints status/priority."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Response to Complaint"
              secondary="Allows administrators to response to complaints directly."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Admin;
