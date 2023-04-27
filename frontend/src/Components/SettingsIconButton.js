import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';

const SettingsIconButton = ({ size, onClick, className }) => {

    return (
        <Tooltip title="Settings">
            <IconButton 
                aria-label='settings'
                className={`settings-button ${className}`}
                onClick={onClick}
            >
                <SettingsIcon
                    sx={{ fontSize: size }}
                >
                </SettingsIcon>
            </IconButton>
        </Tooltip>
        
    )
}

export default SettingsIconButton;