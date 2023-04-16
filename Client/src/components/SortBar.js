import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { MenuList,IconButton, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material'

import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
const values = ["name", "brand", "color", "genre", "price"]

export default function SortBar({ setSort }) {

    const { get, url } = useSelector(({ state }) => state.server)
    const [type, setType] = useState("name")
    const [module, setModule] = useState([])

    const getModule = () => {
        get(url + `/dev/module/product`).then(res => {
            setModule(res.data.filter((e) => values.includes(e.key)))
        })
    }

    useEffect(() => {
        getModule()
    }, [(module.length > 0 ? null : module)])


    return (
        <div className='relative w-full h-[40px] flex flex-row justify-between items-center bg-stone-400 text-white z-10'>
            <Accordion sx={{ top: 0, position: "absolute" }} elevation={0} className='absolute bg-gray-700 '>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    children={
                        <Typography>{type}</Typography>
                    }
                
                >
                    <MenuItem  
                    disableGutters
                     disableRipple 
                     disableTouchRipple
                     //desabled hover
                        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                     
                     >
                     <Typography>{type}</Typography>
                    
                        <IconButton sx={{ml:1}}>
                            <SouthRoundedIcon fontSize="small" />
                        </IconButton>

                    </MenuItem>
              
                </AccordionSummary>

                <AccordionDetails sx={{ pl: 0, pr: 0 }}>
                    <Divider />
                    {module && module.map((e, i) => {
                        return type === e.key ? null :
                            <MenuItem>
                                <ListItemText onClick={() => setType(e.key)}>{e.key}</ListItemText>
                            </MenuItem>

                    })
                    }
                </AccordionDetails>
            </Accordion>



        </div>
    )
}
