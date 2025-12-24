import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new billing
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("menuForm").reset();

  // Change the submit button text back to "Add billing"
  $("submitBtn").textContent = "Add Menu";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected billing object (for editing)
export function fillForm(menu) {
  // Fill each input field with the corresponding property from the billing data
  $("Category").value = menu.Category;
  $("name").value = menu.name;
  $("price").value = menu.price;
  $("rating").value = menu.rating;

  // Change the submit button text to "Update billing"
  $("submitBtn").textContent = "Update menu";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
} 