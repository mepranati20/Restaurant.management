import { $ } from "../utils/dom.js";
import { editBilling, deleteBillingAction } from "../controllers/billingController.js";

// Renders the list of billings into an HTML table
export function renderBillingTable(billings) {
  // Get references to the table body where rows will be inserted and the 'no billings' message
  const body = $("billingsTableBody");
  const noBillings = $("noBillings");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the billing array is empty
  if (billings.length === 0) {
    // If no billings are found, display the 'no billings' message and stop execution
    noBillings.style.display = "block";
    return;
  }

  // If billings exist, hide the 'no billings' message
  noBillings.style.display = "none";

  // Iterate over each billing object in the provided array
  billings.forEach(billing => {
    // Create a new table row element for the current billing
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${billing.id}</td>
      <td class="px-3 py-2">${billing.order_by}</td>
      <td class="px-3 py-2">${billing.total_items}</td>
      <td class="px-3 py-2">${billing.amount}</td>

      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the billing ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${billing.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${billing.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editBilling function with the correct billing ID
    row.querySelector("[data-edit]").onclick = () => editBilling(billing.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deleteBillingAction function with the correct billing ID
    row.querySelector("[data-delete]").onclick = () => deleteBillingAction(billing.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}