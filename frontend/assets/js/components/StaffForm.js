import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new Staff
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("staffForm").reset();

  // Change the submit button text back to "Add Staff"
  $("submitBtn").textContent = "Add Staff";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected billing object (for editing)
export function fillForm(staff) {
  // Fill each input field with the corresponding property from the billing data
  $("name").value = staff.name;
  $("email").value = staff.email;
  $("age").value = staff.age;

  // Change the submit button text to "Update billing"
  $("submitBtn").textContent = "Update Staff";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}
 