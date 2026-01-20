import { $ } from "../utils/dom.js";

export function resetMenuForm() {
  $("menuForm").reset();
  $("cancelBtn").classList.add("hidden");
  $("submitBtn").textContent = "Add Menu";
}

export function fillMenuForm(menu) {
  $("name").value = menu.name ?? "";
  $("Category").value = menu.Category ?? "";
  $("price").value = menu.price ?? "";
  $("rating").value = menu.rating ?? "";
  $("cancelBtn").classList.remove("hidden");
  $("submitBtn").textContent = "Update Menu";
  setState({ editingMenuId: menu.id });
}