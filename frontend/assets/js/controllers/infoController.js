// frontend/assets/js/controllers/infoController.js
import { $ } from "../utils/dom.js";
import { exportINFOToCSV, exportINFOToPDF } from "../utils/exportTools.js";

function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

function normalizeReceipts(rows) {
  return (rows || []).map((r) => ({
    receipt_id: r.receipt_id ?? r.id ?? "-",
    Category: r.menu_Category ?? "-",
    item_name: r.menu_name ?? r.name ?? "-",
    price: r.price ?? "-",
    staff_name: r.staff_name ?? "-",
    email: r.email ?? "-",
    receipt_on: r.receipt_on ?? "-",
    billing_id: r.billing_id ?? "-",
  }));
}

const INFO_EXPORT_CONFIG = {
  billingFields: [
    { key: "id", label: "Billing ID" },
    { key: "order_by", label: "Order_by" },
    { key: "total_items", label: "Total_items" },
    { key: "total_amount", label: "Total_amount" },
  ],
  rowColumns: [
    { key: "receipt_id", label: "receipt ID" },
    { key: "menu_name", label: "Item_name" },
    { key: "menu_Category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "staff_name", label: "Staff_name" },
    { key: "email", label: "Email" },
    { key: "receipt_on", label: "Receipt On" },
  ],
};

export async function initINFOController(billingId) {
  let billing = null;
  let receipts = [];

  // Wire export buttons (reuses the util fully)
  $("INFOExportCsvBtn")?.addEventListener("click", () => {
    if (!billing) return;
    exportINFOToCSV(`billing_${billing.id}_INFO.csv`, billing, receipts, INFO_EXPORT_CONFIG);
  });

  $("INFOExportPdfBtn")?.addEventListener("click", () => {
    if (!billing) return;
    exportINFOToPDF(`Billing ${billing.id} - INFO`, billing, receipts, INFO_EXPORT_CONFIG);
  });

  try {
    show("basicLoading", true);
    show("basicDetails", false);
    show("joinLoading", true);
    show("joinTableContainer", false);
    show("noEnrollments", false);

    // billing
    const billingRes = await fetch(`/api/billings/${billingId}`);
    if (!billingRes.ok) throw new Error("Billing not found");
    billing = await billingRes.json();

    setText("billingId", billing.id);
    setText("billingOrder_by", billing.order_by);
    setText("billingTotal_items", billing.total_items);
    setText("billingTotal_amount", billing.total_amount);

    show("basicLoading", false);
    show("basicDetails", true);

    // receipts report (JOIN)
    const repRes = await fetch(`/api/reports/receipts`);
    if (!repRes.ok) throw new Error("Report failed");
    const all = await repRes.json();

    receipts = normalizeReceipts(
      (all || []).filter((i) => Number(i.billing_id) === Number(billingId))
    );

    // total
    setText("totalReceipts", receipts.length);

    // render table
    const body = $("joinTableBody");
    if (body) body.innerHTML = "";

    if (!receipts.length) {
      show("noReceipts", true);
    } else {
      receipts.forEach((i) => {
        const tr = document.createElement("tr");
        tr.className = "border-b";
        tr.innerHTML = `
          <td class="px-3 py-2">${i.receipt_id}</td>
          <td class="px-3 py-2">${i.menu_Category}</td>
          <td class="px-3 py-2">${i.menu_name}</td>
          <td class="px-3 py-2">${i.price}</td>
          <td class="px-3 py-2">${i.staff_name}</td>
          <td class="px-3 py-2">${ir.email}</td>
          <td class="px-3 py-2">${i.receipt_on}</td>
        `;
        body?.appendChild(tr);
      });
    }

    show("joinLoading", false);
    show("joinTableContainer", true);
  } catch (err) {
    console.error("[infoController] error:", err);
    show("basicLoading", false);
    show("joinLoading", false);
    show("noReceipts", true);
    setText("totalReceipts", 0);
  }
}

export default { initINFOController };