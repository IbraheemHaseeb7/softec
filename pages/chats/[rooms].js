import styles from "./rooms.module.css";
import { useContext } from "react";
import { AuthContext } from "../_app";
import Sidebar from "../../components/Sidebar/sidebar";
import Authenticator from "../../components/Authenticator/auth";
import SendMessage from "../../components/Chat/sendmessage";
import SeeMessage from "../../components/Chat/seemessage";
import ChatRoomProtector from "../../components/Chat/ChatRoomProtector";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../library/firebase";

export async function getStaticProps({ params }) {
  let room = null;

  await getDoc(doc(firestore, `chatrooms`, params.rooms)).then((res) => {
    room = res.data();
  });

  return {
    props: { room },
  };
}

export async function getStaticPaths() {
  let paths = null;

  await getDocs(collection(firestore, `chatrooms`)).then((res) => {
    res.docs.map((data) => {
      const { room_id } = data.data();
      paths = [{ params: { rooms: room_id } }];
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function Room({ room }) {
  // setting up some hooks
  const { auther } = useContext(AuthContext);

  return (
    <div className={styles.room_container}>
      <ChatRoomProtector room={room}>
        <Authenticator>
          <Sidebar />
          <SeeMessage />
          <SendMessage />
        </Authenticator>
      </ChatRoomProtector>
    </div>
  );
}
