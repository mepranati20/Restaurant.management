// Global app state
let state = {                     
  billings: [] ,
  menus: [],
  staffs: [],         
  receipts: [], 
  editingMenuId: null,
  editingStaffId: null, 
  editingId: null,
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}