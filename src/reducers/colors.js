let gid = 0;

// the color is stored as an H,S,L object to preserve the hsl values intact
export default function colors(state = {}, { type, color, id }) {
  let newState = { ...state };
  switch (type) {
    case 'ADD_COLOR':
      const newId = ++gid;
      newState[newId] = { color, id: newId };
      return newState;
    case 'UPDATE_COLOR':
      newState[id].color = color;
      return newState;
    case 'REMOVE_COLOR':
      delete newState[id];
      return newState;
    default:
      return state;
  }
}
