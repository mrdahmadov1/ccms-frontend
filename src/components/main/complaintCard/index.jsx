/* eslint-disable react/prop-types */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Grid, Box } from '@mui/material';
import SelectField from '../../reusable/selectField';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from 'react-redux';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ResponseCard from '../responseCard';
import SendResponseForm from '../sendResponseForm';
import { createResponse } from '../../../store/responseSlice';

const statusOptions = ['Open', 'In Progress', 'Completed'];
const priorityOptions = ['Low', 'Medium', 'High'];

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ContactInfoItem = ({ icon, text }) => (
  <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {icon}
    <Typography variant="body2" color="textSecondary">
      {text}
    </Typography>
  </Grid>
);

export default function ComplaintCard({
  _id,
  name,
  title,
  description,
  email,
  phone,
  address,
  status,
  priority,
  submissionDate,
  adminResponses,
}) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);

  const formattedSubmissionDate = new Date(submissionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleResponseClick = () => {
    setShowTextarea(!showTextarea);
  };

  const handleSendResponse = (values) => {
    dispatch(createResponse(values));
    setShowTextarea(false);
  };

  return (
    <Card sx={{ maxWidth: '100%', boxShadow: 3 }}>
      <CardHeader
        action={
          <Grid container flexDirection={{ xs: 'column', sm: 'row' }}>
            <Grid item>
              <SelectField
                complaintId={_id}
                disabled={user?.role !== 'admin'}
                label="status"
                currentValue={status}
                options={statusOptions}
              />
            </Grid>
            <Grid item>
              <SelectField
                complaintId={_id}
                disabled={user?.role !== 'admin'}
                label="priority"
                currentValue={priority}
                options={priorityOptions}
              />
            </Grid>
          </Grid>
        }
        title={name}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={formattedSubmissionDate}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
      />
      <Divider />
      <Box m={2}>
        <Grid container flexDirection="column" alignItems="center">
          <Grid item>
            <Typography textAlign="center" variant="h6" color="textPrimary">
              {title}
            </Typography>
          </Grid>
          <Grid item maxWidth={750}>
            <Typography justifyContent="center" variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box m={2}>
        <Grid
          container
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent={{ xs: 'start', md: 'center' }}
          spacing={{ xs: 2, md: 4 }}
        >
          <ContactInfoItem
            icon={<LocationOnIcon fontSize="small" color="primary" />}
            text={address}
          />
          <ContactInfoItem icon={<EmailIcon fontSize="small" color="primary" />} text={email} />
          <ContactInfoItem icon={<PhoneIcon fontSize="small" color="primary" />} text={phone} />
        </Grid>
      </Box>
      <Divider />
      <CardActions
        onClick={handleExpandClick}
        sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
      >
        <Typography variant="button" color="textSecondary">
          <span>{adminResponses.length}</span> Response
        </Typography>
        <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {adminResponses.map((response) => (
            <ResponseCard key={response._id} {...response} />
          ))}
          {user?.role === 'admin' && (
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <IconButton color="primary" onClick={handleResponseClick}>
                <AddCommentIcon />
              </IconButton>
            </Box>
          )}
          {showTextarea && <SendResponseForm complaintId={_id} onSubmit={handleSendResponse} />}
        </CardContent>
      </Collapse>
    </Card>
  );
}
