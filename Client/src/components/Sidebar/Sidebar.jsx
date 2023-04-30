import { useState,useEffect } from "react";
import * as React from 'react';
import { styled as styles } from '@mui/material/styles';
import styled from "styled-components";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector,useDispatch } from "react-redux";
import SidebarButton from "./SideBarButton";



const values=["category","brand","color","genre","price"]

function Sidebar({className, setFilter}) {
  const dispatch = useDispatch()
  const {top, width} = useSelector(({state}) => state.sidebar)
  const {get, url} = useSelector(({state}) => state.server)
  const [module, setModule] = useState([])
  const [expanded, setExpanded] = useState(0);
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const getModule=()=>{
    get(url+`/dev/module/product`).then(res =>{
     setModule(res.data.filter((e)=>values.includes(e.key)))
    })
  }

  const [selections, setSelections] = useState({
    "Category": [],
    "Brand": [],
    "Color": [],
    "Genre": [],
    "Price": [],
  });

  useEffect(() => {
    getModule()
    for (const [key, value] of Object.entries(selections)) {
      if (value.length === 0) {
        delete selections[key];
      }
    }

    setFilter(selections)
  
  }, [(module.length>0?null:module),selections])

  const handleSelection = (title, selectedItems) => {

    setSelections((prevSelections) => {
      return {
        ...prevSelections,
        [title]: selectedItems
      }
    })
  
  };

  // console.log(selections)

  const firstLetterCapitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.substring(1)
  }

  
   
  
 return (
      <div className="py-4">
        {module.map((item,i)=>{
          return(
          <Accordion 
          style={{background:"white"}}
          className="mx-[5px!important]"
          disableGutters elevation={0} expanded={expanded === i} onChange={handleChange(i)} >
          <AccordionSummary 
          style={{background:expanded === i?"#e0e0e0":"white"}}
          className="my-[4px!important]"
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform:`rotate(${expanded === i?-90:-90}deg)` }} />}
          
          aria-controls={`${i}-content`} id={`${i}-header`}>
            <Typography sx={{ml:1}}>{firstLetterCapitalized(item.key)}</Typography>
          </AccordionSummary>
          <AccordionDetails>    
          <SidebarButton key={i} title={firstLetterCapitalized(item.key)} items={item.attributes.input} onSelect={(selectedItems) => handleSelection(item.key, selectedItems)} />
          </AccordionDetails>
        </Accordion>)
        })}
      </div>
    );
  }
export default Sidebar;

// MuiAccordionDetails
const AccordionDetails=styled.div`
padding:4px;
background:transparent
`

const AccordionSummary = styles(MuiAccordionSummary)`
  flex-direction: row-reverse;
  border-radius:4px;
  border:none;

`


const Accordion = styled(MuiAccordion)`
border: none;
border-radius:4px!important;

&:not(:last-child) {
  border-bottom: 0;
};
&:before{
  display: none
}

`
