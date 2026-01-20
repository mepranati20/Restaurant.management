import { $ } from "../utils/dom.js";
import { editStaff, deleteStaffAction } from "../controllers/staffController.js";

export function renderStaffTable(staffs) {
  const body = $("staffsTableBody");
  const noStaffs = $("noStaffs");

   if (!body) return;

  body.innerHTML = "";

  if (!staffs || staffs.length === 0) {
     if (noStaffs) noStaffs.classList.remove("hidden");
    return;
  }
  noStaffs.classList.add("hidden");

  staffs.forEach((s) => {
    const tr = document.createElement("tr");
     tr.className = "border-b";
    tr.innerHTML = `
      <td class="px-3 py-2">${s.id ?? "-"}</td>
      <td class="px-3 py-2">${s.name ?? "-"}</td>
      <td class="px-3 py-2">${s.email ?? "-"}</td>
      <td class="px-3 py-2">${s.age ?? "-"}</td>
      <td class="px-3 py-2">
             <div class="flex gap-2">
                <button
                  type="button"
                  class="px-3 py-1 rounded border text-blue-600 hover:bg-blue-50"
                  data-edit>
                  Edit
                </button>
                <button
                  type="button"
                  class="px-3 py-1 rounded border text-red-600 hover:bg-red-50"
                  data-delete>
                  Delete
                </button>
              </div>
            </td>
          `;
      
          tr.querySelector("[data-edit]").addEventListener("click", () => editStaff(s.id));
          tr.querySelector("[data-delete]").addEventListener("click", () => deleteStaffAction(s.id));
      
        body.appendChild(tr);
        });
      }