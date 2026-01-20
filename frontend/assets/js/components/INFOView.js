// frontend/assets/js/components/INFOView.js
import { $ } from "../utils/dom.js";

function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

export function setINFOLoading(isLoading) {
  // Basic
  show("basicLoading", isLoading);
  show("basicDetails", !isLoading);

  // Receipts
  show("joinLoading", isLoading);
  show("joinTableContainer", !isLoading);
}

export function renderBillingBasic(billing) {
  setText("billingId", billing?.id ?? "—");
  setText("billingOrder_by", billing?.order_by ?? "—");
  setText("billingTotal_items", billing?.total_items ?? "—");
  setText("billingTotal_amount", billing?.total_amount ?? "—");
}

export function renderReceiptCount(count) {
  const totalEl = $("totalReceipts");
  if (totalEl) totalEl.textContent = `Total: ${count ?? 0}`;
}

export function renderReceiptsTable(rows) {
  const body = $("joinTableBody");
  if (body) body.innerHTML = "";

  if (!rows || rows.length === 0) {
    show("noReceipts", true);
    return;
  }

  show("noReceipts", false);

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";
    tr.innerHTML = `
          <td class="px-3 py-2">${r.receipt_id ?? "-"}</td>
          <td class="px-3 py-2">${r.menu_Category ?? "-"}</td>
          <td class="px-3 py-2">${r.menu_name ?? "-"}</td>
          <td class="px-3 py-2">${r.menu_price ?? "-"}</td>
          <td class="px-3 py-2">${r.staff_name ?? "-"}</td>
          <td class="px-3 py-2">${r.staff_email ?? "-"}</td>
          <td class="px-3 py-2">${r.receipt_on ?? "-"}</td>

    `;
    body.appendChild(tr);
  });
}

export function renderINFOError() {
  setINFOLoading(false);
  renderReceiptCount(0);
}