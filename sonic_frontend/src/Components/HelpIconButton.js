import HelpIcon from '@mui/icons-material/Help';
import { IconButton, Tooltip } from '@mui/material';

const HelpIconButton = ({ size, onClick, className }) => {

    return (
        <Tooltip title="Help">
            <IconButton 
                aria-label='help'
                className={`help-button ${className}`}
                onClick={onClick}
            >
                <HelpIcon
                    sx={{ fontSize: size }}
                />
            </IconButton>
        </Tooltip>
    )
}

export default HelpIconButton;