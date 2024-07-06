import { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';
import capitalize from '@mui/material/utils/capitalize';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { updateComplaint } from '../../../store/complaintSlice';
import { toast } from 'react-toastify';

export default function SelectField({ complaintId, disabled, label, currentValue, options }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.complaint);
  const [value, setValue] = useState(currentValue);

  const handleChange = async (event) => {
    setValue(event.target.value);
    dispatch(updateComplaint({ complaintId, credentials: { [label]: event.target.value } }));
    status === 'success'
      ? toast.success(`Complaint ${label} updated successfully!`)
      : toast.error(error);
  };

  const selectField = (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`${label}Id`}>{capitalize(label)}</InputLabel>
      <Select
        labelId={`${label}Id`}
        id={label}
        value={value}
        label={label}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      {disabled ? (
        <Tooltip title="You don't have permission to do this action!">
          <span>{selectField}</span>
        </Tooltip>
      ) : (
        selectField
      )}
    </>
  );
}

SelectField.propTypes = {
  complaintId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
