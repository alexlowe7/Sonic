import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle } from '@mui/icons-material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import useAuth from './Authorization/useAuth';

const links = {
    'Chords': '/chords',
    'Notes': '/notes',
    'Sign Up': '/register',
    'Login': '/login',
    'Profile': '/profile',
}

const pages = ['Chords', 'Notes', 'Login', 'Sign Up',];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Layout = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    // logout();
    navigate('/')
  }

  

  return (
    <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* SMALL DISPLAYS ONLY */}
                    <MusicNoteIcon 
                        sx={{ 
                            display: { xs: 'none', md: 'flex' }, 
                            mr: 1, 
                            fontSize: 30, 
                        }} 
                    />
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                fontSize: 30,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                                '&:hover': {
                                        color: 'rgba(240, 240, 240, 0.95)',
                                    }
                            }}
                        >
                            Sonic
                        </Typography>
                    </Link>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                (
                                    (page !== 'Login' || !user) && 
                                    (page !== 'Sign Up' || !user)
                                ) &&
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link to={links[page]} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography 
                                            textAlign="center"
                                            sx={{   
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {page}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* SMALL DISPLAYS ONLY */}
                    
                    
                    <MusicNoteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Sonic
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            (
                                (page !== 'Login' || !user) && 
                                (page !== 'Sign Up' || !user)
                            ) &&
                            <Link to={links[page]} style={{ textDecoration: 'none' }}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    className='test-font'
                                    sx={{ 
                                        color: 'white', 
                                        display: 'block', 
                                        textTransform: 'none',
                                        fontSize: 18,
                                        '&:hover': {
                                            color: 'rgba(240, 240, 240, 0.9)',
                                        }
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>
                            
                        ))}
                    </Box>
                    {user && 
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircle fontSize='large' sx={{ color: 'white' }}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            setting === 'Profile' ? (
                            <Link to={links[setting]} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                    <Typography className='test-font' textAlign="center">{setting}</Typography>
                                </MenuItem>
                            </Link>
                            ) : (
                            <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                <Typography className='test-font' textAlign="center">{setting}</Typography>
                            </MenuItem>
                            )

                        ))}
                        </Menu>
                    </Box>
                    }

                </Toolbar>
            </Container>
        </AppBar>

        {/* <Outlet /> */}
        {children}
        {/* <main>{children}</main> */}
    </>

    
  );
}
export default Layout;