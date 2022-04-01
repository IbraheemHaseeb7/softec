import styles from "./sidebar.module.css";
import Link from "next/link";

export default function Onebox({ title, array_of_fields }) {
  return (
    <div className={styles.onebox_container}>
      <h2>{title}</h2>
      {array_of_fields.map(({ router, name }) => {
        return (
          <Link href={router}>
            <button>{name}</button>
          </Link>
        );
      })}
    </div>
  );
}
