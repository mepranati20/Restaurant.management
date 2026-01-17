import { apiGetAll as apiGetAllRecipts, apiCreate, apiDelete } from "../services/reciptService.js";
import { apiGetAll as apiGetAllbillings } from "../services/billingService.js";
import { apiGetAll as apiGetAllmenus } from "../services/menuService.js";
import { apiGetAll as apiGetAllstaffs } from "../services/staffService.js";

import { showAlert } from "../components/Alert.js";
import { renderReciptTable } from "../components/ReciptTable.js";
import { fillReciptDropdowns } from "../components/ReciptForm.js";

import { $ } from "../utils/dom.js";

export function initReciptController() {
  loadEverything();

  $("reciptForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
    billing_id: Number($("billing_id").value),
    menu_id: Number($("menu_id").value),
    staff_id: Number($("staff_id").value)
    };

    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Recipt created!");
      await loadReciptsOnly();
    }
  });
}

async function loadEverything() {
  await Promise.all([loadbillingsAndmenusAndstaffs(), loadReciptsOnly()]);
}

async function loadbillingsAndmenusAndstaffs() {
  const [billings, menus, staffs] = await Promise.all([apiGetAllbillings(), apiGetAllmenus(), apiGetAllstaffs()]);
  fillReciptDropdowns(billings, menus, staffs);
}

async function loadReciptsOnly() {
  const spinner = $("loadingSpinner");
  const table = $("reciptsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const recipts = await apiGetAllRecipts();
  renderReciptTable(recipts);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function deleteReciptAction(id) {
  if (!confirm("Delete this recipt?")) return;
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Recipt deleted!");
    await loadReciptsOnly();
  }
}