import styles from "./doctorcard.module.css";
import Link from "next/link";

export default function DoctorCard({
  email,
  number,
  working_weeks,
  name,
  address,
  rated,
  img,
}) {
  return (
    <div className={styles.doctor_card_container}>
      <div className={styles.name_img_container}>
        <img className={styles.img} src={img} alt={name} />
        <h3>{name}</h3>
      </div>
      {rated ? (
        <span className={styles.rating}>5 stars</span>
      ) : (
        <span className={styles.rating}>Not Rated Yet</span>
      )}
      <div className={styles.bottom_container}>
        <h4>{email}</h4>
        <h4>{address}</h4>
      </div>
      <Link href={`/doctors/${email}`}>
        <button type="button" className={styles.btn}>
          View Profile
        </button>
      </Link>
    </div>
  );
}
