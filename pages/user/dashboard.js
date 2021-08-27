import { useState } from "react";
import useSessionStorage from "../../hooks/useSessionStorage";


const dashboard = () => {
    const user = useSessionStorage('userid: 1234')

    return (
        <>
        <h1>dashboard</h1>
        <p>hello: {user}</p>
        </>
    
    )
}

export default dashboard;