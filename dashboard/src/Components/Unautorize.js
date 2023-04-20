import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import axios from "axios";


const errors = {
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

export default function Authorize({ returnTo }) {
    const { logout } = useAuth0();
    const { unauthorize, status, setStatus } = useSelector(state => state.user)

    const handleLogout = (e) => {
        e.preventDefault();
        logout({ returnTo: returnTo ? returnTo : window.location.origin });
        unauthorize({ message: "Unauthorized" })
    }

    return (
        <button onClick={handleLogout}>loguin</button>
    )
}

