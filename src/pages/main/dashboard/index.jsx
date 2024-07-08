import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          The Customer View allows users to submit new complaints and view their submitted
          complaints.
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Submit New Complaint"
              secondary="Customers can submit a new complaint with details like Title, Name, Description, Email, Phone, Address."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="My Complaints"
              secondary="Customers can view their submitted complaints with pagination support."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Rate the response"
              secondary="Customers can rate the responses to their complaints."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard;
