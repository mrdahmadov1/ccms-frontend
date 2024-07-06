/* eslint-disable react/prop-types */
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Box, Rating, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateResponseRating } from '../../../store/responseSlice';
import { useState } from 'react';

const ResponseCard = ({ _id, complaintId, responseDate, response, rating }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [currentRating, setCurrentRating] = useState(rating || 0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formattedResponseDate = new Date(responseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const handleRatingChange = (event) => {
    dispatch(
      updateResponseRating({
        complaintId,
        responseId: _id,
        credentials: { rating: event.target.value },
      })
    );
    setCurrentRating(Number(event.target.value));
  };

  return (
    <Card
      key={_id}
      sx={{
        boxShadow: 'none',
        ml: { xs: 0, sm: '10%' },
        marginBottom: 1,
        border: '1px solid #e0e0e0',
      }}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ marginBottom: isMobile ? 1 : 0 }}
          >
            {formattedResponseDate}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ marginTop: isMobile ? 1 : 0 }}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ marginRight: 1 }}>
              Rating:
            </Typography>
            <StyledRating
              name="response-rating"
              value={currentRating}
              precision={1}
              onChange={handleRatingChange}
              disabled={user?.role === 'admin'}
            />
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="textSecondary">
          {response}
        </Typography>
      </CardContent>
    </Card>
  );
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffc107',
  },
});

export default ResponseCard;
