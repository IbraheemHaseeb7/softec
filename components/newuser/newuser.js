import { useContext, useState } from "react";
import DoctorForm from "../DoctorForm/DoctorForm";
import PatientForm from "../PatientForm/PatientForm";
import styles from "./newuser.module.css";
import { AuthContext } from "../../pages/_app";
import Link from "next/link";

export default function NewUser() {
  // setting up some hooks
  const [docAndPat, setDocAndPat] = useState(true);
  const { auther, account } = useContext(AuthContext);

  // handling the changes for the type of form
  function handleChange(e) {
    setDocAndPat(e.target.value);
  }

  return (
    <>
      {!account ? (
        <div className={styles.newuser_container}>
          <h1>Choose one of the following below</h1>
          <div>
            <div>
              <input
                type="radio"
                name="doc_and_pat"
                value={true}
                className={styles.radio}
                onChange={handleChange}
                id="doctor"
              />
              <label htmlFor="doctor">Doctor</label>
            </div>
            <div>
              <input
                type="radio"
                name="doc_and_pat"
                value={false}
                className={styles.radio}
                onChange={handleChange}
                id="patient"
              />
              <label htmlFor="patient">Patient</label>
            </div>
          </div>
          {docAndPat === "true" ? <DoctorForm /> : <PatientForm />}
        </div>
      ) : (
        <div className={styles.newuser_container}>
          <h1>You have already created your account</h1>
          <Link href="/feed">
            <button className="btn">Go Home</button>
          </Link>
        </div>
      )}
    </>
  );
}
