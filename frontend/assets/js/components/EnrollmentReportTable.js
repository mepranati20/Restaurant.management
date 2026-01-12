import { $ } from "../utils/dom.js";

export function renderEnrollmentReportTable(rows) {
  const body = $("reportTableBody");
  const empty = $("noRows");

  body.innerHTML = "";

  if (!rows || rows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${r.enrollment_id ?? ""}</td>
      <td class="px-3 py-2 border">
        ${r.billing_order_by ?? ""} <span class="text-xs text-gray-500">(ID: ${r.billing_id ?? ""})</span>
      </td>
      <td class="px-3 py-2 border">
        ${r.menu_name ?? ""} <span class="text-xs text-gray-500">(ID: ${r.menu_id ?? ""})</span>
      </td>
      <td class="px-3 py-2 border">${r.enrolled_on ?? ""}</td>
    `;
    body.appendChild(tr);
  });
}