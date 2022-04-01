import { useReducer } from "react";
import { reducer } from "./state";
import Input from "../PatientForm/input";
import styles from "./doctorform.module.css";
import RadioInputs from "./RadioInputs";
import HoursCalculator from "./HoursCalculator";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../library/firebase";
import toast from "react-hot-toast";
import Edu from "./edu";

export default function DoctorForm() {
  // router hook for the router push
  const router = useRouter();

  // setting up the state management
  const [state, dispatch] = useReducer(reducer, {
    working_weeks: [
      { name: "monday", working: null },
      { name: "tuesday", working: null },
      { name: "wednesday", working: null },
      { name: "thursday", working: null },
      { name: "friday", working: null },
      { name: "saturday", working: null },
      { name: "sunday", working: null },
    ],
    education_array: [],
    occupation_array: [],
    specialist_array: [],
  });

  // array of the inputs
  const inputs = [
    { type: "name", name: "name", placeholder: "Name", value: state.name },
    {
      type: "name",
      name: "number",
      placeholder: "Number",
      value: state.number,
    },
    { type: "email", name: "email", placeholder: "Email", value: state.email },
    {
      type: "address",
      name: "address",
      placeholder: "Address",
      value: state.address,
    },
  ];

  // array for the radio buttons of working
  const radios = [
    {
      name: "Monday",
      radios: [
        {
          name: "monday",
          value: true,
          id: "monday_working",
          labelName: "Working",
        },
        {
          name: "monday",
          value: false,
          id: "monday_not_working",
          labelName: "Not Working",
        },
      ],
    },
    {
      name: "Tuesday",
      radios: [
        {
          name: "tuesday",
          value: true,
          id: "tuesday_working",
          labelName: "Working",
        },
        {
          name: "tuesday",
          value: false,
          id: "tuesday_not_working",
          labelName: "Not Working",
        },
      ],
    },
    {
      name: "Wednesday",
      radios: [
        {
          name: "wednesday",
          value: true,
          id: "wednesday_working",
          labelName: "Working",
        },
        {
          name: "wednesday",
          value: false,
          id: "wednesday_not_working",
          labelName: "Not Working",
        },
      ],
    },
    {
      name: "Thursday",
      radios: [
        {
          name: "thursday",
          value: true,
          id: "thursday_working",
          labelName: "Working",
        },
        {
          name: "thursday",
          value: false,
          id: "thursday_not_working",
          labelName: "Not Working",
        },
      ],
    },
    {
      name: "Friday",
      radios: [
        {
          name: "friday",
          value: true,
          id: "friday_working",
          labelName: "Working",
        },
        {
          name: "friday",
          value: false,
          id: "friday_not_working",
          labelName: "Not Working",
        },
      ],
    },
    {
      name: "Saturday",
      radios: [
        {
          name: "saturday",
          value: true,
          id: "saturday_working",
          labelName: "Working",
        },
        {
          name: "saturday",
          value: false,
          id: "saturday_not_working",
          labelName: "Not Working",
        },
      ],
    },
    {
      name: "Sunday",
      radios: [
        {
          name: "sunday",
          value: true,
          id: "sunday_working",
          labelName: "Working",
        },
        {
          name: "sunday",
          value: false,
          id: "sunday_not_working",
          labelName: "Not Working",
        },
      ],
    },
  ];

  // array for the edu inputs
  const edu_inputs = [
    {
      type: "name",
      name: "education",
      value: state.education,
      placeholder: "Education",
      array: state.education_array,
    },
    {
      type: "name",
      name: "occupation",
      value: state.occupation,
      placeholder: "Occupation",
      array: state.occupation_array,
    },
    {
      type: "name",
      name: "specialist",
      value: state.specialist,
      placeholder: "Specialist in...",
      array: state.specialist_array,
    },
    // {
    //   type: "name",
    //   name: "keyword",
    //   value: state.keyword,
    //   placeholder: "Keywords",
    // },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const id = new Date().getTime().toString();

    await setDoc(doc(firestore, `doctor`, id), {
      id: id,
      address: state.address,
      name: state.name,
      email: state.email,
      number: state.number,
      working_weeks: state.working_weeks,
      doc: true,
      img: auth.currentUser?.photoURL,
      occupation_array: state.occupation_array,
      education_array: state.education_array,
      specialist_array: state.specialist_array,
    });

    await setDoc(doc(firestore, `users`, auth.currentUser?.uid), {
      uid: auth.currentUser?.uid,
      name: state.name,
      email: state.email,
      doc: true,
    });

    toast.success("Account Created Successfully");

    router.push("/feed");
  }

  return (
    <div className={styles.doctor_form_container}>
      <h1>Hello Doc</h1>
      <form>
        {/* simple inputs are rendered here */}
        {inputs.map(({ type, name, placeholder, value }) => {
          return (
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              dispatch={dispatch}
            />
          );
        })}

        <h1>Working Hours Form</h1>

        {/* working hours input is taken here */}
        {radios.map(({ name, radios }) => {
          return (
            <div>
              <h1>{name}</h1>
              {radios.map(({ name, labelName, value, id }) => {
                return (
                  <>
                    <RadioInputs
                      name={name}
                      labelName={labelName}
                      value={value}
                      id={id}
                      dispatch={dispatch}
                    />
                  </>
                );
              })}
            </div>
          );
        })}
        {state.working_weeks.map(({ working, name }) => {
          return (
            <>
              {working === "true" ? (
                <HoursCalculator name={name} dispatch={dispatch} />
              ) : null}
            </>
          );
        })}
        {edu_inputs.map(({ type, placeholder, name, value, array }) => {
          return (
            <Edu
              type={type}
              placeholder={placeholder}
              name={name}
              value={value}
              dispatch={dispatch}
              array={array}
            />
          );
        })}

        <button className="btn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
