import styles from "./doctor.module.css";
import Reviews from "./Reviews";

export default function DoctorDescription({ doctor }) {
  // dereferencing the doctor's data
  const [doctor_data] = doctor;
  const {
    id,
    name,
    img,
    number,
    doc,
    address,
    working_weeks,
    email,
    education_array,
    specialist_array,
    occupation_array,
  } = doctor_data;

  return (
    <div className={styles.doctor_container}>
      <div className={styles.top_name_container}>
        <div className={styles.left_container}>
          <h2>Charges</h2>
          <h2>$25/hr</h2>
        </div>
        <div className={styles.middle_container}>
          <img src={img} alt={name} />
          <h1>{name}</h1>
          <h2>Heart Specialist</h2>
        </div>
        <div className={styles.right_container}>
          <button className="btn" type="button">
            Send Message
          </button>
        </div>
      </div>
      <div className={styles.edu_container}>
        <div className={styles.education}>
          <h2>Education:</h2>
          {education_array.map((data) => {
            return <h2>{data}</h2>;
          })}
        </div>
        <div className={styles.occupation}>
          <h2>Occupation:</h2>
          {occupation_array.map((data) => {
            return <h2>{data}</h2>;
          })}
        </div>
        <div className={styles.occupation}>
          <h2>Specialist In:</h2>
          {specialist_array.map((data) => {
            return <li>{data}</li>;
          })}
        </div>
      </div>
      <div className={styles.working_container}>
        <h2>Working Hours:</h2>
        {working_weeks.map(({ name, hours, working }) => {
          return (
            <div>
              <h3>{name}</h3>
              {working === "true" ? (
                <div>
                  <h3>Start: {hours.start}</h3>
                  <h3>End: {hours.end}</h3>
                </div>
              ) : (
                <h3>Not Working</h3>
              )}
            </div>
          );
        })}
      </div>
      <Reviews available={true} />
      <footer className={styles.contact_container}>
        <h2>Doctor's Contact Information</h2>
        <div>
          <h3>
            Email: <a href={`mailto:${email}`}>{email}</a>
          </h3>
          <h3>
            Number: <a href={`tel:${number}`}>{number}</a>
          </h3>
          <h3>
            Addres: <h4>{address}</h4>
          </h3>
        </div>
      </footer>
    </div>
  );
}
