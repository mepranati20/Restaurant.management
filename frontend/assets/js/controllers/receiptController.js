import { apiGetAll as apiGetAllReceipts, apiCreate, apiDelete } from "../services/receiptService.js";
import { apiGetAll as apiGetAllbillings } from "../services/billingService.js";
import { apiGetAllmenus } from "../services/menuService.js";
import { apiGetAll as apiGetAllstaffs } from "../services/staffService.js";

import { showAlert } from "../components/Alert.js";
import { renderReceiptTable } from "../components/ReceiptTable.js";
import { fillReceiptDropdowns } from "../components/ReceiptForm.js";

import { $ } from "../utils/dom.js";

export function initReceiptController() {
  loadEverything();

  $("receiptForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
    billing_id: Number($("billing_id").value),
    menu_id: Number($("menu_id").value),
    staff_id: Number($("staff_id").value)
    };

    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Receipt created!");
      await loadReceiptsOnly();
    }else {
      showAlert("Failed to create receipt", "error");
    }
  });
}

async function loadEverything() {
  await Promise.all([loadbillingsAndmenusAndstaffs(), loadReceiptsOnly()]);
}

async function loadbillingsAndmenusAndstaffs() {
  const [billings, menus, staffs] = await Promise.all([apiGetAllbillings(), apiGetAllmenus(), apiGetAllstaffs()]);
  fillReceiptDropdowns(billings, menus, staffs);
}

async function loadReceiptsOnly() {
  const spinner = $("loadingSpinner");
  const table = $("receiptsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const receipts = await apiGetAllReceipts();
  renderReceiptTable(receipts);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function deleteReceiptAction(id) {
  if (!confirm("Delete this receipt?")) return;
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Receipt deleted!");
    await loadReceiptsOnly();
  }else {
    showAlert("Failed to delete receipt", "error");
  }
}