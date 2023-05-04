import React from 'react'
import style from './Error.module.css'
import {Link} from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
const Error = () => {
const { isAuthenticated, logout,getAccessTokenSilently} = useAuth0();
  return (
    <div classname={style.errorpage + style.all}>
      <div className={style.content}>
        <h2 className={style.header}>
         Banned
        </h2>
        <h4>
            You have been Banned
        </h4>
        <p>
            Sorry you have been Banned for violating our policies, please contact with an Administrator via chat for an unban request
        </p>
       <button className={style.buttonStyle} onClick={logout}>Accept</button>
      </div>
    </div>
  )
}

export default Error
