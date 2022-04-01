import styles from "./doctorform.module.css";

export default function RadioInputs({ name, value, dispatch, id, labelName }) {
  function handleChange(e) {
    dispatch({
      type: "radio",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  return (
    <div>
      <input
        type="radio"
        name={name}
        value={value}
        className={styles.radio_input}
        onChange={handleChange}
        id={id}
      />
      <label htmlFor={id}>{labelName}</label>
    </div>
  );
}
