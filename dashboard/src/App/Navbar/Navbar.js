import React, { useState, useEffect, useContext, } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, Box, IconButton, InputBase, Tooltip, Avatar } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


import { ColorModeContext, base } from "../../Redux/Utils/theme.js";

// import Profile from "./Profile.js";
import FindBar from "../../Components/FindBar.js";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode())
  const {width} = useSelector(state => state.sidebar)
  const animation = useSelector(state => state.animation)
  const {setter}=useSelector(state=>state.actions)
  const actions = useSelector(state => state.actions)

  const handleChangeTheme = () => {
    dispatch(actions.changeTheme())
  }
  const handleOpenHidenMenu = () => {
     dispatch(setter({keys:"sidebar.width",value:width===240?40:240}))
  }


  return (
    <AppBar component={Container}elevation={0}>
    <Toolbar component={ToolbarStyle} >
    <Box  display="flex"sx={{width:width,pl:1,transition:`width .5s cubic-bezier(${animation.open})`}} >
      {/* {broken && !rtl && ( )} */}
        <IconButton
          sx={{ margin: "0 6 0 2" }}
          onClick={handleOpenHidenMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>
    
    </Box>
    <Box display="flex" >
     
       <FindBar  style={{width:300}}/> 
    </Box>
    <Box display="flex" position={"absolute"} sx={{right:"1.5%"}}>
      <Box p={2} >
      <IconButton 
       onClick={handleChangeTheme}
      >
        {mode === "dark" ? (
          
         <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>
      <IconButton>
        <SettingsOutlinedIcon />
      </IconButton>
      </Box>
      {/* <Profile anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser}/> */}
      </Box>
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    left:  0;
    width: 100vh;
    z-index: 1000;
    background: transparent!important;
    backdrop-filter: blur(10px)!important;
  /* overflow: hidden; */

    & header {
          height: 54px;
          left: 0;
        display: flex;
        justify-content: center;
        /* overflow: hidden; */

        
    }
  `
const ToolbarStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  padding-left: 0!important;
  margin-left: 0!important;
  `