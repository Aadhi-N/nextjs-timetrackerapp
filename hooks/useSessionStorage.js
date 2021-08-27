import { useState, useEffect } from "react";

const useSessionStorage = (userId) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(localStorage.getItem(userId))
    }, []);
    return value;
};

export default useSessionStorage;