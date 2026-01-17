import { $ } from "../utils/dom.js";
import { deleteReceiptAction } from "../controllers/receiptController.js";

export function renderReceiptTable(receipts) {
  const body = $("receiptsTableBody");
  const empty = $("noReceipts");

  body.innerHTML = "";

  if (!receipts || receipts.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  receipts.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${r.id}</td>
      <td class="px-3 py-2 border">${r.billing_id}</td>
      <td class="px-3 py-2 border">${r.menu_id}</td>
      <td class="px-3 py-2 border">${r.staff_id}</td>
      <td class="px-3 py-2 border">${r.receipt_on ?? ""}</td>
      <td class="px-3 py-2 border">
        <button class="text-red-600 underline" data-del="${r.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteReceiptAction(Number(btn.dataset.del)));
  });
}