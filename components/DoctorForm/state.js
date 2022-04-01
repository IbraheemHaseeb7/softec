// reducer function for the state management
export function reducer(state, action) {
  switch (action.type) {
    case "typing":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "radio":
      //   finding and updating the state
      const elementIndex = state.working_weeks.findIndex((element) => {
        return element.name === action.payload.name;
      });

      let newArray = [...state.working_weeks];

      newArray[elementIndex] = {
        ...newArray[elementIndex],
        working: action.payload.value,
      };

      //   updating the state
      return {
        ...state,
        working_weeks: newArray,
      };

    case "time":
      const elementIndex_2 = state.working_weeks.findIndex((e) => {
        return e.name === action.payload.name;
      });

      let newArray_2 = [...state.working_weeks];

      //   start time calculation
      if (action.payload.start) {
        newArray_2[elementIndex_2] = {
          ...newArray_2[elementIndex_2],
          hours: {
            ...newArray_2[elementIndex_2].hours,
            start: action.payload.value,
          },
        };
      } else {
        // end time calculation
        newArray_2[elementIndex_2] = {
          ...newArray_2[elementIndex_2],
          hours: {
            ...newArray_2[elementIndex_2].hours,
            end: action.payload.value,
          },
        };
      }

      return {
        ...state,
        working_weeks: newArray_2,
      };

    case "edu_typing":
      let typed_data = action.payload.value;

      return {
        ...state,
        [action.payload.name]: typed_data,
      };

    case "edu_submission":
      const { name, array, value } = action.payload;
      const array_name = `${name}_array`;

      return {
        ...state,
        [array_name]: [...array, value],
        [name]: "",
      };

    case "edu_delete":
      const { name_2, value_2, array_2 } = action.payload;
      const array_name_2 = `${name_2}_array`;

      const index = array_2.findIndex((e) => {
        return e == value_2;
      });

      let newArray_3 = [...array_2];

      newArray_3.splice(index, 1);

      return {
        ...state,
        [array_name_2]: newArray_3,
      };

    case "edu_edit":
      const { name_3, value_3 } = action.payload;

      return {
        ...state,
        [name_3]: value_3,
      };

    case "edu_submit_changes":
      const { value_4, original_value, array_4, name_4 } = action.payload;
      const array_name_4 = `${name_4}_array`;

      const index_4 = array_4.findIndex((e) => {
        return e == original_value;
      });

      let newArray_4 = [...array_4];

      newArray_4.splice(index_4, 1, value_4);

      return {
        ...state,
        [array_name_4]: newArray_4,
        [name_4]: "",
      };
  }
}
