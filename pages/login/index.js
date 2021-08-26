import { useState, useEffect } from "react";
const axios = require("axios");

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);

   

    const loginUser = (event) => {
        event.preventDefault();

        axios.post("/login", {
            email: email,
            password: password
        })
        .then((response) => {
            console.log('login response', response)
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <>
        <h1>login</h1>
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
        </>
    )
};

export default login;