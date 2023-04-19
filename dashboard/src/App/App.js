import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


export default function App(props) {
    const { user, loginWithRedirect, loginWithPopup,  logout, } = useAuth0()
    const { isAuthenticated } = useAuth0()
    const  handleLogin = () => {
        //  loginWithRedirect()
        //navigate to http://localhost:5001/test
        window.location.href = "http://localhost:5001/loguin"
      
    }

    const  handleLogout = () => {
        // logout()
         window.location.href = "http://localhost:5001/logout"
    }
  

    return (
        <div>
            <button onClick={handleLogin}>loguin</button> or
            <button onClick={handleLogin}>Singup</button> or
            <button onClick={handleLogout}>loguot</button>

            <div>{isAuthenticated ? JSON.stringify(user) : "no user"}

            </div>
        </div>
    )
}
