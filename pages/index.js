import DoctorCard from "../components/DoctorCard/doctorcard";
import { collection, getDocs } from "firebase/firestore"
import { firestore } from "../library/firebase"

export async function getStaticProps() {

    let doctors = [];

    await getDocs(collection(firestore, `doctors`)).then((res) => {

        doctors = res.docs.map((res) => {
            return res.data()
        })
        
    })


    return {
        props: {
            doctors
        }
    }
}
export default function Home({ doctors }) {
  return (
    <div className="home-page-container">
         <DoctorCard doctors={doctors} />
    </div>
  )
}
