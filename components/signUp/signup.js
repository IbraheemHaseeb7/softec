import styles from "./signup.module.css";
import { toast } from "react-hot-toast";
import { useReducer, useState } from "react";
import NewUser from "../newuser/newuser";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../library/firebase";

let initialState = {
  name: "",
  number: "",
  code_sent: false,
  code_generated: null,
  verify: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "typing":
      if (action.payload.name === "name") {
        return {
          ...state,
          name: action.payload.value,
        };
      } else if (action.payload.name === "phoneNumber") {
        return {
          ...state,
          number: action.payload.value,
        };
      } else {
        return {
          ...state,
          code_generated: action.payload.value,
        };
      }

    case "code_sent":
      return {
        ...state,
        code_sent: true,
      };

    case "code_generated":
      return {
        ...state,
        sms: action.payload,
      };

    case "verified":
      return {
        ...state,
        verify: true,
      };
  }
}

export default function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [key, setKey] = useState();

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: "typing", payload: { name, value } });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const code = Math.floor(Math.random() * 10000);

    dispatch({ type: "code_generated", payload: code });

    await getDoc(doc(firestore, `api_key`, "api")).then((res) => {
      setKey(res.data().key);
    });

    const data = {
      number: state.number,
      name: state.name,
      sms: code,
      key: key,
    };

    dispatch({ type: "code_sent" });

    // integrate the api to use the SMS api
    await fetch("/api/sms", {
      method: "POST",
      body: JSON.stringify(data),
    });

    toast.success("Code Sent Successfully");
  }

  async function handleVerification(e) {
    e.preventDefault();

    if (state.sms == state.code_generated) {
      dispatch({ type: "verified" });
      toast.success("Verified");
    }
  }

  return (
    <div className={styles.signup_container}>
      <form className={styles.signup_form}>
        <input
          className={styles.input}
          name="phoneNumber"
          type="name"
          placeholder="Phone number"
          onChange={handleChange}
        />
        <input
          className={styles.input}
          name="name"
          type="name"
          placeholder="Username"
          onChange={handleChange}
        />
        {state.code_sent ? (
          <>
            <input
              className={styles.input}
              name="verify"
              placeholder="Enter the code"
              onChange={handleChange}
            />
            <button className={styles.btn} onClick={handleVerification}>
              Verify
            </button>
          </>
        ) : (
          <>
            <button className={styles.btn} onClick={handleSubmit}>
              Get a Code
            </button>
          </>
        )}
      </form>
      {!state.verify && <NewUser name={state.name} />}
    </div>
  );
}
