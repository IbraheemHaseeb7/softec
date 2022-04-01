import styles from "./doctorform.module.css";

export default function HoursCalculator({ name, dispatch }) {
  // handling the time changes and updating state variables
  function handleChangeStart(e) {
    dispatch({
      type: "time",
      payload: { name: e.target.name, value: e.target.value, start: true },
    });
  }
  function handleChangeEnd(e) {
    dispatch({
      type: "time",
      payload: { name: e.target.name, value: e.target.value, start: false },
    });
  }

  return (
    <div className={styles.working_container}>
      <h2>{name} working hours</h2>
      <input
        name={`${name}`}
        type="time"
        className={styles.time_input}
        onChange={handleChangeStart}
      />
      <input
        name={`${name}`}
        type="time"
        className={styles.time_input}
        onChange={handleChangeEnd}
      />
    </div>
  );
}
