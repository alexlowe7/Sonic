import React from 'react';
import ToggleButton from '@mui/lab/ToggleButton';
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const OptionSwitch = (props) => {
  const theme = useTheme(); // Access the theme object

  const StyledToggleButton = styled(ToggleButton)({
    textTransform: 'none', // Remove auto-allcaps
    '&.Mui-selected': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    '&.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  });

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      props.onChange(newValue);
    }
  };

  return (
    <Box sx={{ mt: 1, mb: 1 }}> {/* Add margin */}
      <ToggleButtonGroup
        value={props.selected.toString()}
        exclusive
        onChange={handleChange}
        aria-label="option switch"
      >
        <StyledToggleButton value={props.option1} aria-label="option 1" sx={{ paddingX: 1, paddingY: 0.5 }}>
          {props.option1}
        </StyledToggleButton>
        <StyledToggleButton value={props.option2} aria-label="option 2" sx={{ paddingX: 1, paddingY: 0.5 }}>
          {props.option2}
        </StyledToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default OptionSwitch;
