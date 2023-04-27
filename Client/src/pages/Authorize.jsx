import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import Loading  from '../components/Loading'

const messages = {
  "Authorized": "Authorized, please wait",
  "Network Error": "Network Error, please try again later",
  "Unauthorized": "Unauthorized, please try again later",
  "login_required": "Login required, please try again later",
  "invalid_token": "Invalid token, please try again later",
  "invalid_request": "Invalid request, please try again later",
  "consent_required": "Consent required, please try again later",
  "waiting_authorization": "Waiting for authorization, please wait",
  "Request failed with status code 401": "Request failed with status code 401",
  "Fail_getting_data": "Failed to get data, please try again later"
}

function Authorize() {
  const Navigate = useNavigate()
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout,error } = useAuth0();
  const { url,clientUrl,dashboardUrl, get, post } = useSelector(({state}) => state.server)
  const { unauthorize, authorize, status, setStatus } = useSelector(({state}) => state.user)
  useEffect(() => {
    if (isAuthenticated) {

      const getUserMetadata = async () => {
        const token = await getAccessTokenSilently();

        try {
          await authorize(token, user.sub, url)
          Navigate("/home")

        } catch (error) {
          Navigate("/authorize")
          unauthorize({ message: "Fail_getting_data" })
        }
      }
      getUserMetadata();
    }else{
      Navigate("/authorize")
      unauthorize({ message: "Unauthorized" })
      logout({ returnTo: clientUrl+"/authorize" })
    }
  }, [isAuthenticated])

  return (error? <TryAgain message={error.message}/>: <Await/>

  )
}

export default withAuthenticationRequired( Authorize, {
  onRedirecting: () => <Await/>,
  });


const Await=()=>{
  const Navigate = useNavigate()
  const { user, isAuthenticated, getAccessTokenSilently, logout,error } = useAuth0();
  const { url } = useSelector(({state}) => state.server)
  const { unauthorize, authorize, status, setStatus } = useSelector(({state}) => state.user)
  const [message,setMessage]=useState("")

  useEffect(()=>{
    if(isAuthenticated){
      const auth=async()=>{
        try{
        const token = await getAccessTokenSilently();
        await authorize(token, user.sub, url)
        Navigate("/home")
        }catch(error){
          setMessage(status().message)
        }

      }
      auth()
    }

  },[isAuthenticated])

return(
  <FlexCenterCenter style={{height: "100vh"}} className='bg-[white]'>
    {message.length===0?
    <Loading/>:<TryAgain message={message}/>}
    </FlexCenterCenter>
)
}

const TryAgain=({message})=>{
  const handleTryAgain=()=>{
    window.location.reload()
  }

  return(
    <FlexCenterCenter style={{height: "100vh",flexDirection:"column"}}><h3>{message}</h3><br/>
      <Button onClick={handleTryAgain}>try again</Button>
    </FlexCenterCenter>
  )
  }

const FlexCenterCenter=styled.div`
display: flex;
justify-content: center;
align-items: center;
`
