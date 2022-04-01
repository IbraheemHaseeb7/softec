import styles from "./feed.module.css";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../library/firebase";
import Sidebar from "../../components/Sidebar/sidebar";
import { useContext } from "react";
import { AuthContext } from "../_app";
import DoctorCard from "../../components/DoctorCard/doctorcard";

export async function getServerSideProps() {
  let array_of_docs = null;

  await getDocs(collection(firestore, `doctor`)).then((res) => {
    array_of_docs = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: {
      array_of_docs,
    },
  };
}

export default function Feed({ array_of_docs }) {
  // setting up the authentication
  const { auther } = useContext(AuthContext);

  return (
    <div className={styles.feed_container}>
      {auther && <Sidebar />}
      <div className={styles.doctor_container}>
        {array_of_docs.map(
          ({ address, doc, name, email, number, working_weeks, img }) => {
            return (
              <DoctorCard
                address={address}
                email={email}
                number={number}
                working_weeks={working_weeks}
                name={name}
                img={img}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
