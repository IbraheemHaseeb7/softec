import styles from "./newuser.module.css";
import { useState, useReducer } from "react";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../../library/firebase";
import Link from "next/link";

export default function NewUser({ name }) {
  const [doc, setDoc] = useState(null);

  return (
    <div className={styles.newuser_container}>
      <form className={styles.newuser_form}>
        <input
          className={styles.newuser_input}
          onChange={() => {
            setDoc(true);
          }}
          id="doctor"
          type="radio"
          value="doctor"
          name="docAndPatient"
        />
        <label htmlFor="doctor">Doctor</label>
        <input
          className={styles.newuser_input}
          id="patient"
          type="radio"
          value="patient"
          name="docAndPatient"
          onChange={() => {
            setDoc(false);
          }}
        />
        <label htmlFor="patient">Patient</label>
      </form>

      {doc ? <Doctor /> : <Patient />}

      <Link href="/">
        <button className={styles.btn}>Go Home</button>
      </Link>
    </div>
  );
}

const initialState = {
  type: "",
  location: "",
  number: "",
  description: "",
  name: "",
  monday: { working: false, hours: null },
  tuesday: { working: false, hours: null },
  wednesday: { working: false, hours: null },
  thursday: { working: false, hours: null },
  friday: { working: false, hours: null },
  saturday: { working: false, hours: null },
  sunday: { working: false, hours: null },
};

function Doctor() {
  function reducer(state, action) {
    switch (action.type) {
      case "submission":
        return {
          ...state,
          name: "",
          type: "",
          description: "",
          location: "",
          number: "",
        };
      case "form_entry":
        if (action.payload.name === "type") {
          return {
            ...state,
            type: action.payload.value,
          };
        } else if (action.payload.name === "location") {
          return {
            ...state,
            location: action.payload.value,
          };
        } else if (action.payload.name === "number") {
          return {
            ...state,
            number: action.payload.value,
          };
        } else if (action.payload.name === "description") {
          return {
            ...state,
            description: action.payload.value,
          };
        } else if (action.payload.name === "name") {
          return {
            ...state,
            name: action.payload.value,
          };
        }
      case "working":
        return {
          ...state,
          [action.payload.name]: {
            ...action.payload.name,
            working: action.payload.value,
          },
        };

      case "time":
        if (action.payload.type === "to") {
          switch (action.payload.name) {
            case "monday":
              return {
                ...state,
                monday: {
                  hours: { ...state.monday.hours, to: action.payload.hours },
                },
              };
            case "tuesday":
              return {
                ...state,
                tuesday: {
                  hours: { ...state.tuesday.hours, to: action.payload.hours },
                },
              };
            case "wednesday":
              return {
                ...state,
                wednesday: {
                  hours: { ...state.wednesday.hours, to: action.payload.hours },
                },
              };
            case "thursday":
              return {
                ...state,
                thursday: {
                  hours: { ...state.thursday.hours, to: action.payload.hours },
                },
              };
            case "friday":
              return {
                ...state,
                friday: {
                  hours: { ...state.friday.hours, to: action.payload.hours },
                },
              };
            case "saturday":
              return {
                ...state,
                saturday: {
                  hours: { ...state.saturday.hours, to: action.payload.hours },
                },
              };
            case "sunday":
              return {
                ...state,
                sunday: {
                  hours: { ...state.sunday.hours, to: action.payload.hours },
                },
              };
          }
        } else {
          switch (action.payload.name) {
            case "monday":
              return {
                ...state,
                monday: {
                  hours: { ...state.monday.hours, from: action.payload.hours },
                },
              };
            case "tuesday":
              return {
                ...state,
                tuesday: {
                  hours: { ...state.tuesday.hours, from: action.payload.hours },
                },
              };
            case "wednesday":
              return {
                ...state,
                wednesday: {
                  hours: {
                    ...state.wednesday.hours,
                    from: action.payload.hours,
                  },
                },
              };
            case "thursday":
              return {
                ...state,
                thursday: {
                  hours: {
                    ...state.thursday.hours,
                    from: action.payload.hours,
                  },
                },
              };
            case "friday":
              return {
                ...state,
                friday: {
                  hours: { ...state.friday.hours, from: action.payload.hours },
                },
              };
            case "saturday":
              return {
                ...state,
                saturday: {
                  hours: {
                    ...state.saturday.hours,
                    from: action.payload.hours,
                  },
                },
              };
            case "sunday":
              return {
                ...state,
                sunday: {
                  hours: { ...state.sunday.hours, from: action.payload.hours },
                },
              };
          }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const doc_forms = [
      {
        name: "type",
        value: state.type,
        placeholder: "What type of doctor are you?",
      },
      { name: "name", value: state.name, placeholder: "Your name?" },
      {
        name: "location",
        value: state.location,
        placeholder: "In which area do you serve?",
      },
      {
        name: "number",
        value: state.number,
        placeholder: "Your contact number",
      },
    ];

    const working_hours = [
      { name: "monday", type: "time", work: state.monday.working },
      { name: "tuesday", type: "time", work: state.tuesday.working },
      { name: "wednesday", type: "time", work: state.wednesday.working },
      { name: "thursday", type: "time", work: state.thursday.working },
      { name: "friday", type: "time", work: state.friday.working },
      { name: "saturday", type: "time", work: state.saturday.working },
      { name: "sunday", type: "time", work: state.sunday.working },
    ];

    console.log(state);

    function handleChange(e) {
      dispatch({
        type: "form_entry",
        payload: {
          name: e.target.name,
          value: e.target.value,
        },
      });
    }

    async function handleSubmit(e) {
      e.preventDefault();

      const id = new Date().getTime().toString();

      await setDoc(doc(firestore, `doctors`, id), {
        id: id,
        name: state.name,
        type: state.type,
        location: state.location,
        number: state.number,
        doc: true,
      });

      dispatch({ type: "submission" });
    }

    return (
      <div className={styles.doctor_container}>
        <h2 style={{ color: "white", textAlign: "center" }}>Doctor Form</h2>
        <form className={styles.doctor_form}>
          {doc_forms.map((data) => {
            return (
              <>
                <input
                  type="name"
                  name={data.name}
                  value={data.value}
                  placeholder={data.placeholder}
                  onChange={handleChange}
                  className={styles.input}
                />
              </>
            );
          })}
          <h2 style={{ color: "white" }}>Working Hours</h2>
          {working_hours.map((data) => {
            return (
              <div className={styles.doctor_form_working_hours_container}>
                <h3 style={{ color: "white" }}>{data.name}</h3>
                <input
                  name={data.name}
                  id="working"
                  type="radio"
                  className={styles.radio}
                  value={true}
                  onChange={(e) => {
                    dispatch({
                      type: "working",
                      payload: { name: data.name, value: true },
                    });
                  }}
                />
                <label
                  htmlFor="working"
                  style={{ color: "white", pointerEvents: "none" }}
                >
                  Working
                </label>
                <input
                  name={data.name}
                  id="not_working"
                  type="radio"
                  className={styles.radio}
                  value={false}
                  onChange={(e) => {
                    dispatch({
                      type: "working",
                      payload: { name: data.name, value: false },
                    });
                  }}
                />
                <label
                  htmlFor="not_working"
                  style={{ color: "white", pointerEvents: "none" }}
                >
                  Not Working
                </label>
                {data.work && (
                  <>
                    <input
                      type="time"
                      name="to"
                      onChange={(e) => {
                        dispatch({
                          type: "time",
                          payload: {
                            hours: e.target.value,
                            name: data.name,
                            type: "to",
                          },
                        });
                      }}
                    />
                    <input
                      type="time"
                      name="from"
                      onChange={(e) => {
                        dispatch({
                          type: "time",
                          payload: {
                            hours: e.target.value,
                            name: data.name,
                            type: "from",
                          },
                        });
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}

          <textarea
            className={styles.textarea}
            placeholder="Tell us about what you do?"
            name="description"
            value={state.description}
            onChange={handleChange}
          ></textarea>
          <button className={styles.btn} onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }

  function Patient() {
    function reducer(state, action) {
      switch (action.type) {
        case "gender":
          return {
            ...state,
            gender: action.payload,
          };
        case "dob":
          return {
            ...state,
            dob: action.payload,
          };

        case "form_entry":
          if (action.payload.name === "name") {
            return {
              ...state,
              name: action.payload.value,
            };
          } else if (action.payload.name === "contact") {
            return {
              ...state,
              contact: action.payload.value,
            };
          } else if (action.payload.name === "address") {
            return {
              ...state,
              address: action.payload.value,
            };
          } else if (action.payload.name === "previous") {
            return {
              ...state,
              previous: action.payload.value,
            };
          }
      }
    }

    const initialStatePatient = {
      name: null,
      contact: null,
      address: null,
      dob: null,
      gender: null,
      previous: null,
    };

    const [state, dispatch] = useReducer(reducer, initialStatePatient);

    const patient = [
      { name: "name", value: state.name, placeholder: "What is your name?" },
      {
        name: "contact",
        value: state.contact,
        placeholder: "Your contact number",
      },
      { name: "address", value: state.address, placeholder: "Your address" },
    ];

    function handleChange(e) {
      dispatch({
        type: "form_entry",
        payload: {
          name: e.target.name,
          value: e.target.value,
        },
      });
    }

    console.log(state);

    async function handleSubmit(e) {
      e.preventDefault();

      const id = new Date().getTime().toString();

      await setDoc(doc(firestore, `patients`, id), {
        id: id,
        name: state.name,
        address: state.address,
        dob: state.dob,
        gender: state.gender,
        contact: state.contact,
        doc: false,
      });

      dispatch({ type: "submission" });
    }
    return (
      <div className={styles.patient_container}>
        <h2 style={{ color: "white", textAlign: "center" }}>Patient Form</h2>
        <form className={styles.patient_form}>
          {patient.map((data) => {
            return (
              <>
                <input
                  type="name"
                  name={data.name}
                  value={data.value}
                  placeholder={data.placeholder}
                  onChange={handleChange}
                  className={styles.input}
                />
              </>
            );
          })}
          <input
            type="date"
            value={state.dob}
            name={state.name}
            onChange={(e) => {
              dispatch({ type: "dob", payload: e.target.value });
            }}
            className={styles.dob}
          />
          <div>
            <input
              type="radio"
              value="male"
              name="gender"
              id="male"
              onChange={() => {
                dispatch({ type: "gender", payload: "male" });
              }}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              value="female"
              name="gender"
              id="female"
              onChange={() => {
                dispatch({ type: "gender", payload: "female" });
              }}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              value="other"
              name="gender"
              id="other"
              onChange={() => {
                dispatch({ type: "gender", payload: "other" });
              }}
            />
            <label htmlFor="other">Other</label>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Tell us about your previous medical record"
            name="previous"
            value={state.previous}
            onChange={handleChange}
          ></textarea>
          <button className={styles.btn} onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
