import styles from "./rooms.module.css";
import { useContext } from "react";
import { AuthContext } from "../_app";
import Sidebar from "../../components/Sidebar/sidebar";
import Authenticator from "../../components/Authenticator/auth";
import SendMessage from "../../components/Chat/sendmessage";
import SeeMessage from "../../components/Chat/seemessage";

export default function Room() {
  // setting up some hooks
  const { auther } = useContext(AuthContext);

  return (
    <div className={styles.room_container}>
      <Authenticator>
        <Sidebar />
        <SeeMessage />
        <SendMessage />
      </Authenticator>
    </div>
  );
}
