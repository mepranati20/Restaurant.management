import { $ } from "../utils/dom.js";
import { editMenu, deleteMenuAction } from "../controllers/menuController.js";

export function renderMenuTable(menus) {
  const body = $("menusTableBody");
  const empty = $("noMenus");

  body.innerHTML = "";

  if (!menus || menus.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  menus.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${m.id}</td>
      <td class="px-3 py-2 border">${m.name ?? ""}</td>
      <td class="px-3 py-2 border">${m.Category ?? ""}</td>
      <td class="px-3 py-2 border">${m.price ?? ""}</td>
      <td class="px-3 py-2 border">${m.rating ?? ""}</td>
      <td class="px-3 py-2 border">
        <button class="text-blue-600 underline mr-3" data-edit="${m.id}">Edit</button>
        <button class="text-red-600 underline" data-del="${m.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => editMenu(Number(btn.dataset.edit)));
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteMenuAction(Number(btn.dataset.del)));
  });
}