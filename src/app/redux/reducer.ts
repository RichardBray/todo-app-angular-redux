export function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    // case "REMOVE_TODO":
    //   return state;
    // case "TOGGLE_COMPLETE":
    //   return state;
    default:
      return state;
  }
}
