import styles from "./chat.module.css";

export default function OneMessage({ me, name, timeStamp, content }) {
  const time = Date(timeStamp);

  return (
    <div
      className={styles.one_msg_container}
      style={me ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }}
    >
      <p>{content}</p>
      <pre>{time}</pre>
    </div>
  );
}
