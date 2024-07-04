import { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';
import capitalize from '@mui/material/utils/capitalize';

export default function SelectField({ disabled, label, currentValue, options }) {
  const [value, setValue] = useState(currentValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`${label}Id`}>{capitalize(label)}</InputLabel>
      <Select
        labelId={`${label}Id`}
        id={label}
        value={value}
        label={capitalize(label)}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {capitalize(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectField.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
