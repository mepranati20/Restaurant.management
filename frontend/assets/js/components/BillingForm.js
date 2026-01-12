import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new billing
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("billingForm").reset();

  // Change the submit button text back to "Add billing"
  $("submitBtn").textContent = "Add Billing";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected billing object (for editing)
export function fillForm(billing) {
  // Fill each input field with the corresponding property from the billing data
  $("order_by").value = billing.order_by;
  $("total_items").value = billing.total_items;
  $("amount").value = billing.amount;

  // Change the submit button text to "Update billing"
  $("submitBtn").textContent = "Update Billing";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}