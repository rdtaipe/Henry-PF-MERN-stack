import * as React from 'react';
import { styled as styles } from '@mui/material/styles';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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

            <MuiAppBar elevation={0} position="relative" style={{
                height: 60,
                background: "white"
            }}>
                <Toolbar>
                    <IconButtonBox
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        style={{ color: "gray", marginLeft: `${open ? drawerWidth : 0}px` }}

                    >
                        {open ? open? <ChevronLeftIcon /> : <ChevronRightIcon /> : <MenuIcon />}
                    </IconButtonBox>
                    {navbar}
                </Toolbar>
            </MuiAppBar>
            <Drawer position="relative" sx={{
                overflowX:"none",
                '& .MuiDrawer-paper': {
                    position: "absolute",
                    top: "auto",
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background:"transparent",
                    transition:"all .4s ease-in-out!important",
                    overflowX:"none!important",
                    zIndex:"0!important"

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
    overflow-x: none!important;
`
const IconButtonBox = styles(IconButton)` 
    transition: margin-left .4s ease-in-out;
`;