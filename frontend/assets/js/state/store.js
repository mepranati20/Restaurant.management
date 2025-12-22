// Global app state
let state = {
  editingId: null,   // which item is being edited
  staff: [],           // list of all staff members
  menu: [],            // list of all menu items
  billing: []       // list of all students
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}