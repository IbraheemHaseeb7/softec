import styles from "./chat.module.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../library/firebase";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function SendMessage() {
  // setting up some hooks
  const [message, setMessage] = useState(null);
  const { query } = useRouter();

  // handling changes in textarea
  function handleChange(e) {
    setMessage(e.target.value);
  }

  // handling submission
  async function handleSubmit(e) {
    e.preventDefault();

    const msg_id = new Date().getTime().toString();

    await setDoc(doc(firestore, `chatrooms/${query.rooms}/messages`, msg_id), {
      msg_id: msg_id,
      content: message,
      uid: auth.currentUser?.uid,
      name: auth.currentUser?.displayName,
      timeStamp: new Date(),
    });

    toast.success("Message Sent Successfully!");

    setMessage("");
  }

  return (
    <div className={styles.send_msg_container}>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          onChange={handleChange}
          placeholder="Start typing here..."
          value={message}
        ></textarea>
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
