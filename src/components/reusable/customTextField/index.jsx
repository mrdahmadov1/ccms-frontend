import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ id, name, label, type = 'text', formik }) => (
  <TextField
    fullWidth
    id={id}
    name={name}
    label={label}
    type={type}
    variant="outlined"
    margin="normal"
    {...formik.getFieldProps(name)}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
  />
);

CustomTextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  formik: PropTypes.object.isRequired,
};

export default CustomTextField;
