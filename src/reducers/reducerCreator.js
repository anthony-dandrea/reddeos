// Higher order function to create reducers on the fly
// Takes initialState which will be the data type (string, bool, obj, arr)
// actionType will be the constant name for the action
// prop is the value
export default function makePropReducer(initialState, actionType, prop) {
  return (state=initialState, {type, payload}) => {
    if (type === actionType) {
      return payload[prop];
    }
    return state;
  };
}
