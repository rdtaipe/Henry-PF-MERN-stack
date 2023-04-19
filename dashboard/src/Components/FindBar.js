import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//material ui
import { Box, InputBase, IconButton } from '@mui/material'
import { Paper, MenuList, MenuItem, Divider, ListItemIcon } from '@mui/material'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

//icons
import SearchIcon from '@mui/icons-material/Search'
import DataObjectIcon from '@mui/icons-material/DataObject';
//local imports
// import { base } from '../Redux/Utils/theme.js'
import styled from 'styled-components';


export default function FindBar({ style }) {

    const { use, mode, base } = useSelector(state => state.theme)
    const { url, get } = useSelector(state => state.server)
    const colorsBase = base(mode());


    const [find, setFind] = useState("all")//all, name, group, starts,
    const [input, setInput] = useState("")
    const [anchorEl, setAnchorEl] = useState({ top: 60, });
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const [data, setData] = useState({})
    const [objOpen, setObjOpen] = useState({ name: "", open: false })

    const anchorAncle = useRef(null);




    useEffect(() => {
        if (input.length > 0) {
            setOpen(true);

        } else {
            setOpen(false);
        }


    }, [input, anchorAncle, data])

    const handleFind = (e) => {
        setInput(e.target.value)

        // server.get(server.url + "/find/q=" + e.target.value).then(res => {
        //     setData(res.data)
        // })
    }


    return (
        <Box component={BoxStyle} display="flex" backgroundColor={colorsBase.primary[400]} p={0.2} borderRadius={1} style={style} >
            <IconButton type="button">
                <SearchIcon />
            </IconButton>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" onChange={handleFind} />



            <PaperStyle style={style} open={open} anchor={anchorEl} >
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                        overflowX: "auto",
                        overflowY: "hidden",
                    }}
                    elevation={0}
                >
                    <Stack direction="row" spacing={.5} sx={{ m: .5, userSelect: "none" }}>
                        <Chip label="name" />
                        <Chip label="starts" />
                        <Chip label="Group" />
                        <Chip label="Hide" />
                        <Chip label="Hide" />
                        <Chip label="Hide" />
                        <Chip label="Hide" />
                        <Chip label="Hide" />
                        <Chip label="Hide" />
                    </Stack>
                </Paper>
                <Divider />

                <MenuList >
                    {data && Object.keys(data).map((key, i) => {
                        if (data[key].length > 0) {
                            return (
                                <List>
                                    <ListItemButton sx={{ p: 1, m: 0 }} onClick={() => { setObjOpen({ name: key, open: !objOpen.open }) }}>
                                        <ListItemIcon>
                                            <DataObjectIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={key} sx={{ color: "gray", ml: -3 }} />
                                        {objOpen.name == key && objOpen.open ? <ExpandLess sx={{ color: "gray" }} /> : <ExpandMore sx={{ color: "gray" }} />}
                                    </ListItemButton>

                                    <Collapse in={objOpen.open && objOpen.name === key} sx={{ p: 0, m: 0 }} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>

                                            {data[key].map((item, i) => (
                                                <ListItemButton >
                                                    <ListItemText primary={item.name} sx={{ ml: 1, color: "gray" }} />
                                                </ListItemButton>
                                            )
                                            )}


                                        </List>
                                    </Collapse>


                                </List>
                            )
                        }

                    }
                    )}


                </MenuList>

            </PaperStyle>
        </Box>
    )
}


const PaperStyle = styled.div`
display: ${(props) => props.open ? "block" : "none"};
position: absolute;
top: ${(props) => props.anchor ? props.anchor.top : 0}px;
border-radius: 4px;
background: #fff;

`
const BoxStyle = styled.div`
overflow: auto;
`