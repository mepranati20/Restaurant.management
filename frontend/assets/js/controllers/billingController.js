import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/billingService.js";

import { showAlert } from "../components/Alert.js";
import { renderBillingTable } from "../components/BillingTable.js";
import { resetForm, fillForm } from "../components/BillingForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
// Initialize the main logic and set up all necessary event listeners
export function initBillingController() {
  // Start by fetching and displaying all Billing data immediately upon load
  loadBillings();

  // --- Handle Form Submissions ---

  // Attach a listener to the 'submit' event of the Billing input form
  $("billingForm").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission behavior (page refresh)
    e.preventDefault();

    // Collect data from the input fields using the custom '$' selector
    const data = {
      menu_id: $("menu_id").value.trim(),
      order_by: $("order_by").value.trim(), 
      total_items: $("total_items").value.trim(), 
      amount: $("amount").value.trim()  
  };

    // Check the application state to see if we are currently editing an existing record
    const { editingId } = getState();

    // Use a ternary operator to decide which action to take:
    editingId
      ? await updateBilling(editingId, data) // If editingId exists, update the Billing
      : await createNewBilling(data);        // Otherwise, create a new Billing
  });

  // --- Handle Cancel Button Click ---

  // Attach a listener to the 'click' event of the cancel button
  $("cancelBtn").addEventListener("click", () => {
    // Clear the editing state (set the ID to null)
    setState({ editingId: null });
    // Clear all input fields in the form
    resetForm();
  });
}


// Fetch all Billing data from the API and update the user interface
export async function loadBillings() {
  // Get references to the loading spinner and the main data table elements
  const spinner = $("loadingSpinner");
  const table = $("billingsTableContainer");

  // Show the spinner and hide the table to indicate a loading state
  spinner.style.display = "block";
  table.style.display = "none";

  // Asynchronously fetch all Billing records from the backend API
  const billings = await apiGetAll();

  // Store the retrieved Billing array in the application's global state
  setState({ billings });
  // Render the fetched Billing data into the HTML table structure
  renderBillingTable(billings);

  // Hide the spinner and show the table now that the data is loaded and displayed
  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new Billing
export async function createNewBilling(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Billing added!");
    resetForm();
    loadBillings();
  }
}

// Load a Billing into the form for editing
export async function editBilling(id) {
  const billing = await apiGetOne(id);

  setState({ editingId: id });
  fillForm(billing);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing Billing
export async function updateBilling(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadBillings();
  }
}

// Delete a Billing
export async function deleteBillingAction(id) {
  if (!confirm("Delete this billing?")) return;

  const res = await apiDelete(id);
 	if (res.ok) {
    showAlert("Deleted!");
    loadBillings();
  }
}