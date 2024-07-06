import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  response: Yup.string()
    .min(10, 'Response must be at least 10 characters')
    .required('Response is required'),
});

// eslint-disable-next-line react/prop-types
export default function SendResponseForm({ complaintId, onSubmit }) {
  return (
    <Box sx={{ mt: 2, ml: { xs: 0, sm: '10%' } }}>
      <Formik
        initialValues={{ response: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit({ complaintId, ...values });
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="response"
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              placeholder="Write your response..."
              error={touched.response && !!errors.response}
              helperText={touched.response && errors.response}
            />
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Send Response
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
