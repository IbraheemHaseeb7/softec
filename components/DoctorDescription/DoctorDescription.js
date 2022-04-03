import styles from "./doctor.module.css";
import Reviews from "./Reviews";
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
} from "firebase/firestore";
import { auth, firestore } from "../../library/firebase";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DoctorDescription({ doctor }) {
  // setting up some hooks
  const router = useRouter();
  const [chatRoom, setChatRoom] = useState(null);

  // dereferencing the doctor's data
  const [doctor_data] = doctor;
  const {
    id,
    name,
    img,
    number,
    address,
    working_weeks,
    email,
    education_array,
    specialist_array,
    occupation_array,
    uid,
    charges,
    reviewed,
    doc_type,
  } = doctor_data;

  async function openMessages() {
    // checking if a room already exists or not and making decision upon that
    await getDocs(
      query(
        collection(firestore, `chatrooms`),
        where("uid", "in", [[auth.currentUser?.uid, uid]])
      )
    ).then((res) => {
      if (res.docs.length === 0) {
        setChatRoom(0);
      } else {
        openRoom(res.docs);
      }
    });

    if (chatRoom === 0) {
      await getDocs(
        query(
          collection(firestore, `chatrooms`),
          where("uid", "in", [[uid, auth.currentUser?.uid]])
        )
      ).then((res) => {
        if (res.docs.length === 0) {
          createNewRoom();
        } else {
          openRoom(res.docs);
        }
      });
    }

    // new room function
    async function createNewRoom() {
      const room_id = new Date().getTime().toString();

      await setDoc(doc(firestore, `chatrooms`, room_id), {
        room_id: room_id,
        uid: [auth.currentUser?.uid, uid],
      });

      router.push(`/chats/${room_id}`);
    }

    // opening already existing room
    function openRoom(array) {
      const room_id = array.map((data) => {
        return data.data().room_id;
      });

      router.push(`/chats/${room_id}`);
    }
  }

  return (
    <div className={styles.doctor_container}>
      <div className={styles.top_name_container}>
        <div className={styles.left_container}>
          <h2>Charges</h2>
          <h2>${charges}/hr</h2>
        </div>
        <div className={styles.middle_container}>
          <img src={img} alt={name} />
          <h1>{name}</h1>
          <h3 style={{ color: "gray" }}>{doc_type}</h3>
        </div>
        <div className={styles.right_container}>
          <button className="btn" type="button" onClick={openMessages}>
            Send Message
          </button>
        </div>
      </div>
      <div className={styles.edu_container}>
        <div className={styles.education}>
          <h2>Education:</h2>
          <div>
            {education_array.map((data) => {
              return <li>{data}</li>;
            })}
          </div>
        </div>
        <div className={styles.occupation}>
          <h2>Occupation:</h2>
          <div>
            {occupation_array.map((data) => {
              return <li>{data}</li>;
            })}
          </div>
        </div>
        <div className={styles.occupation}>
          <h2>Specialist In:</h2>
          <div>
            {specialist_array.map((data) => {
              return <li>{data}</li>;
            })}
          </div>
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
      <Reviews available={reviewed} />
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
