import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase'

export default function Navigation({ user }) {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profile = () => {
    setAnchorEl(null);
    navigate("/");
  };
  
  const settings = () => {
    setAnchorEl(null);
    navigate("/account");
  };

  const logout = () => {
    setAnchorEl(null);
    auth.signOut().then(() => {
      window.location.reload(false);
    })
    setTimeout(() => {  navigate("/") }, 2000); 
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {user.length === 0 ? <Link to='/login'><p className='petit-cap white'>LOGIN</p></Link> : 
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={profile}>Book</MenuItem>
                  <MenuItem onClick={settings}>Account Settings</MenuItem>
                  <MenuItem onClick={logout}>Log Out</MenuItem>
                </Menu>
              </div>
              }
          </Toolbar>
        </AppBar>
      </Box>
  );
}
