import { $ } from "../utils/dom.js";
import { editMenu, deleteMenuAction } from "../controllers/menuController.js";

export function renderMenuTable(menus) {
  const body = $("menusTableBody");
  const noMenus = $("noMenus");

 if (!body) return;

  body.innerHTML = "";

  if (!menus || menus.length === 0) {
    if (noMenus) noMenus.classList.remove("hidden");
    return;
  }
  noMenus.classList.add("hidden");

  menus.forEach((m) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";
    tr.innerHTML = `
      <td class="px-3 py-2 border">${m.id ?? "-"}</td>
      <td class="px-3 py-2 border">${m.Category ?? "-"}</td>
      <td class="px-3 py-2 border">${m.name ?? "-"}</td>
      <td class="px-3 py-2 border">${m.price ?? "-"}</td>
      <td class="px-3 py-2 border">${m.rating ?? "-"}</td>
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

    tr.querySelector("[data-edit]").addEventListener("click", () => editMenu(m.id));
    tr.querySelector("[data-delete]").addEventListener("click", () => deleteMenuAction(m.id));

  body.appendChild(tr);
  });
}