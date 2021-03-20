import React,{useContext} from 'react';
import '../App.css'
import {Menu,MenuItem,Avatar, Divider} from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import { UserContext } from './GlobalState';



export default function ProfileMenu({onClick}) {
  const [user,setUser]=useContext(UserContext)
  

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout=()=>{
    setUser('')
  }

  return (
    <div>
      {user.user_img?<Avatar alt="Remy Sharp" src={user.user_img} onClick={handleClick} />:<Avatar onClick={handleClick}>{user.uname.charAt(0).toUpperCase()}</Avatar>}
      
      
      
      
      
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <center><Avatar className="mb-1" src={user.user_img}></Avatar></center>
        
        <Divider />
        <MenuItem onClick={handleClose}><PersonIcon style={{paddingRight:5}} /> {user.uname}</MenuItem> 
        <MenuItem onClick={onClick}><SettingsIcon style={{paddingRight:5}} /> Account Settings</MenuItem> 
        <MenuItem onClick={logout}><ExitToAppIcon style={{paddingRight:5}} /> Logout</MenuItem>
      </Menu>
    </div>
  );
}
