import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Grid, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ComplaintList = ({ complaints }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container spacing={1}>
        {complaints.map(({ _id, title, submissionDate }) => (
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
    </Container>
  );
};

ComplaintList.propTypes = {
  complaints: PropTypes.array.isRequired,
};

export default ComplaintList;
