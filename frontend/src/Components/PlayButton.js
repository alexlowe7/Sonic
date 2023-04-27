import React from "react";
import '../index.js';
import AudiotrackSharpIcon from '@mui/icons-material/AudiotrackSharp';
import Button from '@mui/material/Button'

const PlayButton = ({ handlePlayButtonClick, className }) => {

    return (
        <Button 
            variant="contained"
            onClick={() => {
                handlePlayButtonClick();
            }}
            id="play-button"
            className={className}
            size="large"
        >
            <AudiotrackSharpIcon
                color="white"
                sx={{ 
                    fontSize: 40,
                    fontWeight: 500,
                }}
            />
        </Button>
    );
};

export default PlayButton;
