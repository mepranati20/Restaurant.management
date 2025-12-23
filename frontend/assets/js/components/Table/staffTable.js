import { $ } from "../utils/dom.js";
import { editStaff, deleteStaffAction } from "../../controllers/staffController.js";

// Renders the list of Staffs into an HTML table
export function renderStaffTable(staffs) {
  // Get references to the table body where rows will be inserted and the 'no staffs' message
  const body = $("staffsTableBody");
  const noStaffs = $("noStaffs");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the Staff array is empty
  if (staffs.length === 0) {
    // If no Staffs are found, display the 'no Staffs' message and stop execution
    noStaffs.style.display = "block";
    return;
  }

  // If students exist, hide the 'no Staffs' message
  noStaffs.style.display = "none";

  // Iterate over each student object in the provided array
  students.forEach(staff => {
    // Create a new table row element for the current Staff
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${staff.id}</td>
      <td class="px-3 py-2">${staff.name}</td>
      <td class="px-3 py-2">${staff.email}</td>
      <td class="px-3 py-2">${staff.Age}</td>
      
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the staff ID -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${staff.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${staff.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editStaff function with the correct staff ID
    row.querySelector("[data-edit]").onclick = () => editStaff(staff.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deletestaffAction function with the correct staff ID
    row.querySelector("[data-delete]").onclick = () => deleteStaffAction(staff.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}