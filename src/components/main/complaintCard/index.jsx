/* eslint-disable react/prop-types */
import * as React from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  name,
  title,
  description,
  email,
  phone,
  address,
  status,
  priority,
  submissionDate,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formattedSubmissionDate = new Date(submissionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  return (
    <Card sx={{ maxWidth: '100%', boxShadow: 3 }}>
      <CardHeader
        action={
          <Grid container flexDirection={{ xs: 'column', sm: 'row' }}>
            <Grid item>
              <Tooltip title="You don't have permission to do this action!">
                <span>
                  <SelectField
                    disabled
                    label="Status"
                    currentValue={status}
                    options={statusOptions}
                  />
                </span>
              </Tooltip>
            </Grid>
            <Grid item>
              <SelectField label="Priority" currentValue={priority} options={priorityOptions} />
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
      <CardActions sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        <Typography variant="button" color="textSecondary">
          <span>0</span> Response
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Responses
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
