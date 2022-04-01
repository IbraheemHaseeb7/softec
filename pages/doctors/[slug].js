import { useContext } from "react";
import Sidebar from "../../components/Sidebar/sidebar";
import { AuthContext } from "../_app";
import styles from "./doctorcv.module.css";
import { getDocs, query, where, collection } from "firebase/firestore";
import { firestore } from "../../library/firebase";
import DoctorDescription from "../../components/DoctorDescription/DoctorDescription";

export async function getStaticProps({ params }) {
  let doctor = null;

  await getDocs(
    query(collection(firestore, `doctor`), where("email", "==", params.slug))
  ).then((res) => {
    doctor = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: {
      doctor,
    },
  };
}

export async function getStaticPaths() {
  let paths = null;

  await getDocs(collection(firestore, `doctor`)).then((res) => {
    res.docs.map((data) => {
      const { email } = data.data();
      paths = [{ params: { slug: email } }];
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function DoctorCV({ doctor }) {
  const { auther } = useContext(AuthContext);

  return (
    <>
      {auther && <Sidebar />}
      <div className={styles.doctor_container}>
        <DoctorDescription doctor={doctor} />
      </div>
    </>
  );
}
