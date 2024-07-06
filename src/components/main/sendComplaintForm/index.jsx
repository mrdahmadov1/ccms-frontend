import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createComplaint } from '../../../store/complaintSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formFields = [
  { id: 'title', name: 'title', label: 'Title', type: 'title' },
  { id: 'description', name: 'description', label: 'Description', type: 'description' },
  { id: 'name', name: 'name', label: 'Full Name', type: 'name' },
  { id: 'email', name: 'email', label: 'Email Address', type: 'email' },
  { id: 'phone', name: 'phone', label: 'Phone', type: 'phone' },
  { id: 'address', name: 'address', label: 'Address', type: 'address' },
];

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string()
    .required('Required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be maximum 500 characters'),
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});

export default function SendComplaintForm() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.complaint);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(createComplaint(values));
      status === 'success' ? toast.success('Complaint sent successfully!') : toast.error(error);
      resetForm();
    },
  });

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Complaint Form
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            {formFields.map((field) => (
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                key={field.id}
                id={field.id}
                name={field.name}
                label={field.label}
                multiline={field.name === 'description'}
                InputProps={{
                  inputProps: {
                    maxLength: 500,
                  },
                }}
                type={field.type}
                {...formik.getFieldProps(field.name)}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                helperText={formik.touched[field.name] && formik.errors[field.name]}
              />
            ))}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
