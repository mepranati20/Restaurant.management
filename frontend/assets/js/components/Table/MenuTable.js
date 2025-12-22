import { $ } from "../utils/dom.js";
import { editMenu, deleteMenuAction } from "../controllers/menuController.js";

// Renders the list of menus into an HTML table
export function renderMenuTable(menus) {
  // Get references to the table body where rows will be inserted and the 'no menus' message
  const body = $("menusTableBody");
  const noMenus = $("noMenus");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the menu array is empty
  if (menus.length === 0) {
    // If no menus are found, display the 'no menus' message and stop execution
    noMenus.style.display = "block";
    return;
  }

  // If menus exist, hide the 'no menus' message
  noMenus.style.display = "none";

  // Iterate over each menu object in the provided array
  menus.forEach(menu => {
    // Create a new table row element for the current menu
    const row = document.createElement("tr");
    row.className = "border-b"; // Add styling class (likely Tailwind CSS)

    // Populate the row with dynamic HTML content using a template literal
    row.innerHTML = `
      <td class="px-3 py-2">${menu.no}</td>
      <td class="px-3 py-2">${menu.Category}</td>
      <td class="px-3 py-2">${menu.Name}</td>
      <td class="px-3 py-2">${menu.Price}</td>
      <td class="px-3 py-2">${menu.rating}</td>
      <td class="px-3 py-2 flex space-x-2">
        <!-- Buttons are created with data attributes holding the menu id -->
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${menu.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${menu.id}">Delete</button>
      </td>
    `;

    // --- Attach event listeners to the newly created buttons ---

    // Find the 'Edit' button within this specific row and attach a click handler
    // When clicked, call the editmenu function with the correct menu ID
    row.querySelector("[data-edit]").onclick = () => editMenu(menu.id);
    
    // Find the 'Delete' button within this specific row and attach a click handler
    // When clicked, call the deletemenuAction function with the correct menu ID
    row.querySelector("[data-delete]").onclick = () => deleteMenuAction(menu.id);

    // Append the fully constructed row to the table body
    body.appendChild(row);
  });
}