// Global app state
let state = {
  editingId: null,   // which item is being edited         
  billings: [] ,         // list of all billing
  staffs: []      // list of all staff members 
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}