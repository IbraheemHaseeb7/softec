import styles from "./doctorcard.module.css"
import Link from "next/link"

export default function DoctorCard({ doctors }) {

    return (
        <div className={styles.doctor_card_container}>
            {doctors.map((res) => {
                return (
                    <div className={styles.doctor_card}>
                        <h2 className={styles.doctor_card_name}>{res.name}</h2>
                        <Link href="/doctors">
                            <button className={styles.doctor_card_view_button}>View Profile</button>
                        </Link>
                        <h3 className={styles.doctor_card_location}>{res.location}</h3>
                        <h3 className={styles.doctor_card_number}>{res.number}</h3>
                        <h3 className={styles.doctor_card_type}>{res.type}</h3>
                    </div>
                )
            })}
        </div>
    )
}