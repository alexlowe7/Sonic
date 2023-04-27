import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const ModeCheckbox = ({ onChange, isEnabled, className, label }) => {

    const handleChange = (event) => {
        onChange(event, label);
    };

    return (
        <div className={className}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isEnabled}
                        onChange={handleChange}
                        color="primary"
                    />
                }
                label={label}
            />
        </div>
    );
}

export default ModeCheckbox;
