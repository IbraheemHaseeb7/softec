import styles from "./signup.module.css"
import { useReducer } from "react";

let initialState = {
    name: "",
    number: "",
}

function reducer(state, action) {
    switch (action.type) {
        case "typing":

            if (action.payload.name === "name") {
                return {
                    ...state,
                    name: action.payload.value,
                }
            } else {
                return {
                    ...state,
                    number: action.payload.value
                }
            }
    }
}

export default function Signup() {

    const [state, dispatch] = useReducer(reducer, initialState);

    console.log(state)

    function handleChange(e) {

        let name = e.target.name;
        let value = e.target.value

        dispatch({ type: "typing", payload: { name, value }})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        
    }

    return (
        <div className={styles.signup_container}>
            <form className={styles.signup_form}>
                <input className={styles.input} name="phoneNumber" type="number" placeholder="Enter your phone number: +923121234567" onChange={handleChange} />
                <input className={styles.input} name="name" type="name" placeholder="Enter your name" onChange={handleChange} />
                <button className={styles.btn} onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}