import { useState } from "react";
import styles from "./doctorform.module.css";

export default function Edu({
  type,
  value,
  name,
  dispatch,
  placeholder,
  array,
}) {
  // setting up hook for the editing
  const [edit, setEdit] = useState(false);
  const [originalEditValue, setOriginalEditValue] = useState();

  function handleChange(e) {
    dispatch({
      type: "edu_typing",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "edu_submission",
      payload: { name: e.target.name, value: value, array: array },
    });
  }

  function handleEdit(e) {
    setEdit(true);
    setOriginalEditValue(e.target.value);

    dispatch({
      type: "edu_edit",
      payload: { value_3: e.target.value, name_3: name },
    });
  }

  function handleSubmitChanges(e) {
    setEdit(false);

    dispatch({
      type: "edu_submit_changes",
      payload: {
        value_4: e.target.value,
        original_value: originalEditValue,
        array_4: array,
        name_4: name,
      },
    });
  }

  function handleDelete(e) {
    dispatch({
      type: "edu_delete",
      payload: { value_2: e.target.value, array_2: array, name_2: name },
    });
  }

  return (
    <div className={styles.edu_container}>
      <input
        type={type}
        className="input"
        onChange={handleChange}
        value={value}
        name={name}
        placeholder={placeholder}
      />
      {edit && (
        <button className="btn" onClick={handleSubmitChanges} value={value}>
          Submit Changes
        </button>
      )}
      {array.map((data) => {
        return (
          <div className={styles.edu_options_container}>
            <h2>{data}</h2>
            <div>
              <button
                className="btn"
                type="button"
                onClick={handleEdit}
                value={data}
              >
                Edit
              </button>
              <button
                className="btn"
                type="button"
                onClick={handleDelete}
                value={data}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <button
        className="btn"
        type="submit"
        onClick={handleSubmit}
        name={`${name}`}
      >
        Add
      </button>
    </div>
  );
}
