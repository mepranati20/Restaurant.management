import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/menuService.js";

import { showAlert } from "../components/Alert.js";
import { renderMenuTable } from "../components/MenuTable.js";
import { resetMenuForm, fillMenuForm } from "../components/MenuForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initMenuController() {
  // Start by fetching and displaying all Menu data immediately upon load
  loadMenus();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the Menu input form
  $("menuForm").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission behavior (page refresh)
    e.preventDefault();

    // Collect data from the input fields using the custom '$' selector
    const data = {
      Category: $("Category").value.trim(),   // Get Category value, remove whitespace
      name: $("name").value.trim(), // Get name value
      price: $("price").value.trim(), // Get price value
      rating: $("rating").value.trim()    // Get rating value
    };

    // Check the application state to see if we are currently editing an existing record
    const { editingId } = getState();

    // Use a ternary operator to decide which action to take:
    editingId
      ? await updateMenu(editingId, data) // If editingId exists, update the Menu
      : await createNewMenu(data);        // Otherwise, create a new Menu
  });

  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
    // Clear the editing state (set the ID to null)
    setState({ editingId: null });
    // Clear all input fields in the form
    resetMenuForm();
  });
}


// Fetch all Menu data from the API and update the user interface
export async function loadMenus() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("menusTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all Menu records from the backend API
  const menus = await apiGetAll();

  // Store the retrieved Menu array in the application's global state
  setState({ menus });
  // Render the fetched Menu data into the HTML table structure
  renderMenuTable(menus);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new Menu
export async function createNewMenu(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Menu added!");
    resetMenuForm();
    loadMenus();
  }
}

// Load a Menu into the form for editing
export async function editMenu(id) {
  const menu = await apiGetOne(id);

  setState({ editingId: id });
  fillMenuForm(menu);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing Menu
export async function updateMenu(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetMenuForm();
    setState({ editingId: null });
    loadMenus();
  }
}

// Delete a Menu
export async function deleteMenuAction(id) {
  if (!confirm("Delete this menu?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadMenus();
  }
}