import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";


export default function Authorize(props) {

    const [status, setStatus] = useState({
        error: true,
        message: "waiting_authorization"
    })



    return (
        <div>
            <h2>login</h2>


            {/* <div>
                <input
                    type="text"
                    name="email"
                    value={login.email}
                    onChange={(e) => handleInputs("login", e.target)}
                />
                <input
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={(e) => handleInputs("login", e.target)}
                />
                <button onClick={() => handleSubmit("login", login)}>enter</button>
                <br />
                <a href={`${url}auth/google`}>ingresar con google</a>
            </div> */}
        </div>
    )
}


// const { url, get, post } = useSelector(state => state.server)
// const [login, setLogin] = useState({ email: "", password: "" });
// const [register, setRegister] = useState({});


// function handleInputs(type, e) {
//     if (type === "login") {
//         setLogin({ ...login, [e.name]: e.value });
//     }
// }

// function handleSubmit(type, data) {
//     console.log(data);
//     if (type === "login") {
//         axios.post(`${url}auth/login`, data)
//     }
// }

