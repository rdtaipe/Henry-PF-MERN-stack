import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import TuneIcon from '@mui/icons-material/Tune';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const Icons = [
    { type: "Dashboard", component: <GridViewOutlinedIcon /> },
    { type: "Products", component: <CategoryOutlinedIcon /> },
    { type: "Users", component: <PermIdentityOutlinedIcon /> },
    // { type: "Sales", component: <StorefrontOutlinedIcon /> },
    // { type: "Projects", component: <WorkOutlineOutlinedIcon /> },
    // { type: "Employees", component: <AdminPanelSettingsOutlinedIcon /> },
    // { type: "Roles", component: <VpnKeyOutlinedIcon /> },
    // { type: "Permissions", component: <RouteOutlinedIcon /> },
]

export default function Sidebar() {
    const dispatch = useDispatch()
    const {setter} = useSelector(state => state.actions)
    const { width, items } = useSelector(state => state.sidebar)
    const open = useSelector(state => state.sidebar.open)
    const animation = useSelector(state => state.animation)
    const navigate = useNavigate()

    useEffect(() => {


    }, [window.location.pathname]);

    console.log(window.location.pathname)
    const HandleActive = (v) => {
        navigate(`/` + v.toLowerCase())
        dispatch(setter({keys:`sidebar.items.${v}`,value:{active:true},only:true}))

    }

    return (
        <Container open={open} style={{ background: "#f0f0f0", width: width, top: top, paddingLeft:5,paddingRight:5 }}>

            <Body>

                <MenuList >
                    {items.map((item, i) => {
                        if (item.type === "title") {
                            return <ListItemTitle 
                            key={i} 
                            sx={{ fontSize: "14px", fontWeight: "500", color: "gray", ml: 0, ...item.sx }}
                            iconStyle={{ color: "gray" }}
                            >{item.name}</ListItemTitle>
                        } else {
                            return <ListItem key={i}
                                Icon={Icons.find(icon => icon.type === item.name).component.type}
                                onClick={() => { HandleActive(item.name) }}
                                name={item.name}
                                style={{ padding: "7px 10px", background: item.active ? "#1876f2" : "none",borderRadius:"4px" }}
                                textStyle={{ color: item.active ? "white" : "black" }}
                                iconStyle={{ color: item.active ? "white" : "black" }}
                                sx={{ "&:hover": { backgroundColor: item.active?"#42a4ff!important":"#e5e5e5!important" } }}
                            >{item.name}</ListItem>
                        }
                    })}
                    <Divider />

                </MenuList>
            </Body>

        </Container>
    )
}

const Container = styled.div`
position: fixed;
left: 0;
height: 100vh;
background-color: white;
overflow-y: auto;
overflow-x: hidden;
z-index: 100;
transition: width .5s   cubic-bezier(.4,0,0,1);
`

const Body = styled.div`

`

const ListItem = ({ Icon, children, sx, style, onClick, textStyle,iconStyle }) => {

    return (

        <MenuItem sx={sx} style={style} onClick={onClick}>
            <ListItemIcon style={iconStyle}>
                <Icon fontSize="small" />

            </ListItemIcon>
            <ListItemText sx={textStyle}>{children}</ListItemText>
            {/*<Typography variant="body2" color="text.secondary">
                <ListItemIcon>
                    <ChevronRightOutlinedIcon fontSize="small"/>
                </ListItemIcon>
            </Typography> */}
        </MenuItem>

    )
}
const ListItemTitle = ({ children, sx ,iconStyle}) => {

    return (
        <MenuItem disableRipple sx={{ "&:hover": { backgroundColor: "transparent" } }} >
            <ListItemIcon style={iconStyle}>
                {/* <Icon fontSize="small"/>  */}
            </ListItemIcon>
            <ListItemText sx={{ "span": sx }}>{children}</ListItemText>
        </MenuItem>
    )
}
