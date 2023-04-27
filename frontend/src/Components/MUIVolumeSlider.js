import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const MUIVolumeSlider = () => {
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 200 }} justifyContent="center" display="flex">
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDown />
                <Box width="90%" mx={2}>
                    <Slider aria-label="Volume" value={value} onChange={handleChange} />
                </Box>
                <VolumeUp />
            </Stack>
        </Box>
    );
}

export default MUIVolumeSlider;