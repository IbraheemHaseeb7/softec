import styles from "./doctor.module.css";

export default function DoctorDescription({ doctor }) {
  // dereferencing the doctor's data
  const [doctor_data] = doctor;
  const { id, name, img, doc, address, working_weeks, email } = doctor_data;

  return (
    <div className={styles.doctor_container}>
      <div className={styles.top_name_container}>
        <img src={img} alt={name} />
        <h1>{name}</h1>
      </div>
    </div>
  );
}
