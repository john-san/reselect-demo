// countReducer.js
const initialState = {
  count: 0,
  someValue: "some value",
};

const countReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "INCREMENT_BY_VALUE":
      return {
        ...state,
        count: state.count + action.payload,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "DECREMENT_BY_VALUE":
      return {
        ...state,
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};

export default countReducer;
