import { useState, useEffect } from "react";
const axios = require("axios");

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
   

    const loginUser = (event) => {
        event.preventDefault();

        axios.post("/login", {
            email: email,
            password: password,
        },
        { withCredentials: true })
        .then((response) => {
            console.log('login response', response)
            setErrorMsg(response.data.errors ? response.data.errors : [])
            setSuccessMsg(response.data.success_msg ? response.data.success_msg : []);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const logoutUser = () => {
        axios.post("/logout", {
        })
        .then((response) => {
            console.log('logout response', response)
            setErrorMsg(response.data.errors ? response.data.errors : [])
            setSuccessMsg(response.data.success_msg ? response.data.success_msg : []);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <h1>login</h1>

        <h1>Success msg: {successMsg}</h1>
        <h1> Error msg: {errorMsg}</h1>

        <form onSubmit={loginUser}>
            <div className="container">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" id="email" type="email" placeholder="email" name="email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" id="name" type="password" placeholder="password" name="password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="control">
                    <input className="button is-primary" type="submit" value="Submit"></input>
                </div>
            </div>
        </form>
        <form onSubmit={logoutUser}>
            <div className="control">
                    <input className="button is-primary" type="logout" defaultValue="Logout"></input>
            </div>
        </form>
        </>
    )
};

export default login;