import React,{useEffect,useState,useContext } from 'react'
import axios from 'axios';
import {Tooltip,IconButton,Menu,MenuItem,Typography,Avatar} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// 'Profile', 'Account', 'Dashboard', 'Logout'

//no funciona todavia

const Profile = ({anchorElUser,setAnchorElUser}) => {
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  const actions=useSelector(state=>state.actions)
  const { unauthorize, status, setStatus, data} = useSelector(state => state.user)
  const userData = data()
  const { logout } = useAuth0();

  const settings = [
    {text:'Profile',icon:'Profile',fun:(e)=>{handleCloseUserMenu()}},
    {text:'Account',icon:'Account',fun:(e)=>{handleCloseUserMenu()}},
    {text:'Logout',icon:'Logout',fun:(e)=>{handleLogout()}},
  ];

const handleLogout=()=>{
  unauthorize({ message: "Unauthorized" })
  logout()
}
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {

  }, [userData]);

  console.log(userData,"userData")
  return (

    userData&&<>
        <Tooltip title={userData.name}>
            <IconButton onClick={handleOpenUserMenu} disableRipple>
                <Avatar alt={userData.name} src={userData.picture } />
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
              {settings.map((item,i) => (
                <MenuItem key={i} onClick={item.fun}>
                  <Typography textAlign="center">{item.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
      </>
    
  );
};

export default Profile;