import styles from "./chat.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, limit, onSnapshot } from "firebase/firestore";
import { firestore } from "../../library/firebase";
import OneMessage from "./onemessage";
import { auth } from "../../library/firebase";

export default function SeeMessage() {
  // setting up router hook
  const router = useRouter();

  // setting up messages state
  const [message, setMessage] = useState([]);

  useEffect(() => {
    let unsub = onSnapshot(
      collection(firestore, `chatrooms/${router.query.rooms}/messages`),
      (data) => {
        setMessage(
          data.docs.map((data) => {
            return data.data();
          })
        );
      },
      limit(100)
    );

    return () => {
      unsub();
    };
  }, [router.query.rooms]);

  return (
    <div className={styles.see_msg_container}>
      {message.map(({ uid, name, msg_id, timeStamp, content }) => {
        return (
          <>
            {auth.currentUser?.uid === uid ? (
              <OneMessage
                me={true}
                name={name}
                timeStamp={timeStamp}
                content={content}
              />
            ) : (
              <OneMessage
                me={false}
                name={name}
                timeStamp={timeStamp}
                content={content}
              />
            )}
          </>
        );
      })}
    </div>
  );
}
