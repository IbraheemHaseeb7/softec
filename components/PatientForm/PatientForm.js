import { useReducer } from "react";
import Input from "./input";
import styles from "./patientform.module.css";

// reducer function for state management
function reducer(state, action) {
  switch (action.type) {
    case "typing":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
  }
}

export default function PatientForm() {
  // setting up the reducer hook for the state management
  const [state, dispatch] = useReducer(reducer, {});

  // array for mapping out the input fields
  const inputs = [
    { type: "name", value: state.name, name: "name", placeholder: "Name" },
    {
      type: "name",
      value: state.number,
      name: "number",
      placeholder: "Phone Number",
    },
    { type: "name", value: state.city, name: "city", placeholder: "City" },
    { type: "email", value: state.email, name: "email", placeholder: "Email" },
  ];
  return (
    <div className={styles.patient_form_container}>
      <h1>Hello Mr. Patient</h1>
      <form>
        {inputs.map(({ type, placeholder, name, value }) => {
          return (
            <Input
              type={type}
              placeholder={placeholder}
              name={name}
              value={value}
              dispatch={dispatch}
            />
          );
        })}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
