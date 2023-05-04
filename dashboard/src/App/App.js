import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { actions } from '../Redux/Store'
import styled from 'styled-components'
//components
import { useAuth0 } from '@auth0/auth0-react';

import Navbar from '../App/Navbar/Navbar';
// import Loading from '../Components/Loading.js';
import Sidebar from '../App/Sidebar/Sidebar'

// function a(str){alert(str); a("stupid")}a("go")



export default function App() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0();
  const { width, top } = useSelector(state => state.sidebar)
  const { isAutorized, data } = useSelector(state => state.user)
  const userAuth = isAutorized()
  const userData=data()

  useEffect(() => {
    if (userAuth && isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/authorize')
      console.log("unauthorized")
    }
    // console.log(userData)

  }, [userAuth, isAuthenticated])

  return (
    <Constainer>
      <Navbar />
      <Sidebar />
      <Box style={{ marginTop: top, marginLeft: width, width: `calc(100vw - ${width}px)`, height: `calc(100% - ${top}px)` }}>
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