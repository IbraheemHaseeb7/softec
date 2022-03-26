import styles from "./signup.module.css"
import { useReducer } from "react";

export default function Signup() {

    function handleChange(e) {

        let name = e.target.name;
        let value = e.target.value
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