import * as React from 'react';
import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 281;

export default function PersistentDrawerLeft({ sidebar, navbar, children }) {

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <Box>

            <AppBar elevation={3} position="relative" style={{ height: 50, background: "white" }}>
                <Toolbar>
                    <IconButtonBox
                        onClick={handleDrawerOpen}
                        edge="start"
                        style={{ color: "gray", marginLeft: `${open ? drawerWidth-65 : 0}px` }}

                    >
                        {open ? <TuneIcon /> : <MenuIcon />}
                    </IconButtonBox>
                    {navbar}
                </Toolbar>
            </AppBar>
            <Drawer position="relative" sx={{
                overflowX: "none",
                '& .MuiDrawer-paper': {
                    position: "absolute",
                    top: "auto",
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: "transparent",
                    transition: "all .4s ease-in-out!important",
                    overflowX: "none!important",
                    zIndex: "0!important",
                    border: "none"

                },
            }}
                variant="persistent"
                anchor="left"
                open={open}
            >

                {sidebar}
            </Drawer>

            <Main style={{ marginLeft: open ? drawerWidth : 0 }} >
                {children}
            </Main>
        </Box>
    );
}
const Main = styled.div`
    position: relative;
    background: transparent;
    transition: margin-left .4s ease-in-out!important;
    overflow-x: none!important
`
const IconButtonBox = styles(IconButton)` 
transition: all .4s ease-in-out!important;
margin-right:10px
`
const AppBar = styles(MuiAppBar)`
display: flex;
justify-content: center;
width: 100%

`