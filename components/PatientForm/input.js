import styles from "./patientform.module.css";

export default function Input({ value, name, placeholder, type, dispatch }) {
  // handling input changes
  function handleChange(e) {
    dispatch({
      type: "typing",
      payload: { name: e.target.name, value: e.target.value },
    });
  }
  return (
    <>
      <input
        className="input"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        type={type}
      />
    </>
  );
}
