import { $ } from "../utils/dom.js";
import { editStaff, deleteStaffAction } from "../controllers/staffController.js";

export function renderStaffTable(staffs) {
  const body = $("staffsTableBody");
  const empty = $("noStaffs");

  body.innerHTML = "";

  if (!staffs || staffs.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  staffs.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2">${s.id ?? ""}</td>
      <td class="px-3 py-2">${s.name ?? ""}</td>
      <td class="px-3 py-2">${s.email ?? ""}</td>
      <td class="px-3 py-2">${s.age ?? ""}</td>
      <td class="px-3 py-2 border">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded" data-edit="${s.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" data-del="${s.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => editStaff(Number(btn.dataset.edit)));
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteStaffAction(Number(btn.dataset.del)));
  });
}