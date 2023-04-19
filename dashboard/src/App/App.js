import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Outlet } from 'react-router-dom'
import { actions } from '../Redux/Store'
import styled from 'styled-components'
//components

import Navbar from '../App/Navbar/Navbar';
// import Loading from '../Components/Loading.js';
import Sidebar from '../App/Sidebar/Sidebar'

// function a(str){alert(str); a("stupid")}a("go")
  
  


const url = {
  local: "http://localhost:5000/",
  production: "https://api.localhost.com/"
}

export default function App() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(actions.addActions(actions))
  dispatch(actions.setUrlBase(url.local))
  const { width, top } = useSelector(state => state.sidebar)
  
  const [userMetadata, setUserMetadata] = useState(null)
  const [status, setStatus] = useState({
    error: true,
    message: "waiting_authorization"
  })
  
  useEffect(() => {

  }, [])

  return (
    <Constainer>
      <Navbar />
      <Sidebar />
      <Box style={{ marginTop: top, marginLeft: width, width: `calc(100vw - ${width}px)`,height: `calc(100% - ${top}px)` }}>
        <Outlet />
      </Box>
    </Constainer>
  )

};



const Constainer = styled.div`
position: relative;
width: 100vw;
padding: 0px!important;
margin: 0px!important;

`
const Box = styled.div`
position: relative;
transition: all 0.5s ease;
`