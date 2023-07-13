// Value reducer
const initialState = {
  value: "default value",
  someValue: "some value",
};

const valueReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

export default valueReducer;
