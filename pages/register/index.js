import { useState, useEffect } from "react";
const axios = require("axios");

const register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [successMsg, setSuccessMsg] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);

    const registerUser = (event) => {
        event.preventDefault();

        axios.post("/register", {
            name: name,
            email: email,
            password: password,
            password2: password2
        })
        .then(function(response) {           
            // if (response.data.errors) {
            //     setErrorMsg(response.data.errors)
            // }
            // if (response.data.success_msg) {
            //     setSuccessMsg(response.data.success_msg)
            // }
            setErrorMsg(response.data.errors ? response.data.errors : [])
            setSuccessMsg(response.data.success_msg ? response.data.success_msg : []);
        })
        .catch(function (error) {
            console.log(error)
        })

    }

    return (
        <>
        <h1>sign up</h1>

        <h1>Success msg: {successMsg}</h1>
        <h1> Error msg: {errorMsg}</h1>


        <form onSubmit={registerUser}>
            <div className="container">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" id="name" type="text" placeholder="name" name="name" onChange={e => setName(e.target.value)}/>
                    </div>
                </div>
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
                <div className="field">
                    <label className="label">Confirm password</label>
                    <div className="control">
                        <input className="input" id="password2" type="password" placeholder="password2" name="password2" onChange={e => setPassword2(e.target.value)}/>
                    </div>
                </div>
                <div className="control">
                    <input className="button is-primary" type="submit" value="Submit"></input>
                </div>
            </div>
        </form>
        </>
    )
}

export default register;