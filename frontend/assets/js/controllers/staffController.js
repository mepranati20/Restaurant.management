import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/staffService.js";

import { showAlert } from "../components/Alert.js";
import { renderStaffTable } from "../components/StaffTable.js";
import { resetStaffForm, fillStaffForm } from "../components/StaffForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initStaffController() {
  // Start by fetching and displaying all Staffd ata immediately upon load
  loadStaffs();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the Staff input form
  $("staffForm").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission behavior (page refresh)
    e.preventDefault();

    // Collect data from the input fields using the custom '$' selector
    const data = {
      name: $("name").value.trim(),   // Get name value, remove whitespace
      email: $("email").value.trim(), // Get email value
      age: $("age").value.trim(), // Get age value
    };

    // Check the application state to see if we are currently editing an existing record
    const { editingStaffId } = getState();

    // Use a ternary operator to decide which action to take:
    editingStaffId
      ? await updateStaff(editingStaffId, data) // If editingId exists, update the Staff
      : await createNewStaff(data);        // Otherwise, create a new Staff
  });

  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
    // Clear the editing state (set the ID to null)
    setState({ editingStaffId: null });
    // Clear all input fields in the form
    resetStaffForm();
  });
}


// Fetch all staff data from the API and update the user interface
export async function loadStaffs() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("staffsTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all Staff records from the backend API
  const staffs = await apiGetAll();

  // Store the retrieved Staff array in the application's global state
  setState({ staffs });
  // Render the fetched Staff data into the HTML table structure
  renderStaffTable(staffs);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new Staff
export async function createNewStaff(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Staff added!");
    resetStaffForm();
    loadStaffs();
  }
}

// Load a Staff into the form for editing
export async function editStaff(id) {
  const staff = await apiGetOne(id);

  setState({ editingStaffId: id });
  fillStaffForm(staff);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing Staff
export async function updateStaff(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetStaffForm();
    setState({ editingStaffId: null });
    loadStaffs();
  }
}

// Delete a Staff
export async function deleteStaffAction(id) {
  if (!confirm("Delete this staff?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadStaffs();
  }
}