import { useState, useEffect } from "react";
import { FlashMessage} from "react-flash-message";
const axios = require('axios');

const subscribe = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(false); //react flash messages to display
    const [fetchedEmail, setFetchedEmail] = useState(["fnf"]);


    const subscribeUser = (event) => {  
        event.preventDefault();

        axios.post('/subscribe', {
            email: email
        })
        .then(function (response) {
        // console.log('axios response', response.data.errors[0].message); //array form, need to loop all msgs
            // console.log('axios response', response.data.errors.length)
            // if (response.data.errors.length) {
            //     setFetchedEmail(prevFetchedEmail => [...prevFetchedEmail, response.data.errors]);
            // }
            console.log(response)
        })
        .catch(function (error) {
        console.log('axios error', error);
        });
    }
    return (
    <>
        {fetchedEmail}
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Email:</label>
            </div>
                <div className="field-body">
                    <form onSubmit={subscribeUser}>
                        <div className="field">
                        <p className="control">
                            <input className="input" id="email" type="email" name="email" placeholder="Recipient email" onChange={e => setEmail(e.target.value)} required/>
                        </p>
                        </div>
                        <div>
                            <button type="submit" value="Subscribe">Subscribe</button>
                        </div>
                    </form>
                </div>
        </div>
    </>
    )
};

export default subscribe;