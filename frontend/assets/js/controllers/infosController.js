// frontend/assets/js/controllers/infosController.js

import { $ } from "../utils/dom.js";
import { filterList, sortList } from "../utils/listTools.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

const API_URL = window.ENV.API_BASE_URL; // /api/billings

const COLUMNS = [
    { key: "id", label: "Billing ID" },
    { key: "order_by", label: "Order_by" },
    { key: "total_items", label: "Total_items" },
    { key: "total_amount", label: "Total_amount" },
];

let allBillings = [];

export function initINFOsController() {
  loadINFOs();

  $("searchInput")?.addEventListener("input", refresh);
  $("sortBy")?.addEventListener("change", refresh);
  $("sortDir")?.addEventListener("change", refresh);

  $("exportCsvBtn")?.addEventListener("click", () => {
    exportToCSV("billings.csv", getRows(), COLUMNS);
  });

  $("exportPdfBtn")?.addEventListener("click", () => {
    const rows = getRows();
    const html = buildPrintableTableHTML("Billing Directory", rows, COLUMNS);
    exportToPDF("Billing Directory", html);
  });
}

async function loadINFOs() {
  const spinner = $("loadingSpinner");
  const container = $("infosTableContainer");

  if (spinner) spinner.style.display = "block";
  if (container) container.style.display = "none";

  const res = await fetch(API_URL);
  allBillings = res.ok ? await res.json() : [];

  refresh();

  if (spinner) spinner.style.display = "none";
  if (container) container.style.display = "block";
}

function getRows() {
  const q = $("searchInput")?.value?.trim() ?? "";
  const sortKey = $("sortBy")?.value ?? "id";
  const sortDir = $("sortDir")?.value ?? "asc";

  const filtered = filterList(allBillings, q, ["id", "order_by ", "total_items", "total_amount"]);
  return sortList(filtered, sortKey, sortDir);
}

function refresh() {
  renderINFOsTable(getRows());
}

function renderINFOsTable(billings) {
  const body = $("billingsTableBody");
  const noINFOs = $("noINFOs");

  if (!body) return;

  body.innerHTML = "";

  if (!billings || billings.length === 0) {
    if (noINFOs) noINFOs.style.display = "block";
    return;
  }

  if (noINFOs) noINFOs.style.display = "none";

  billings.forEach((b) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";

    tr.innerHTML = `
      <td class="px-3 py-2">${b.id}</td>

      <td class="px-3 py-2">
        <a href="/infos/${b.id}" data-link class="text-blue-600 hover:underline font-medium">
          ${b.order_by}
        </a>
      </td>

      <td class="px-3 py-2">${b.total_items}</td>
      <td class="px-3 py-2">${b.total_amount}</td>

      <td class="px-3 py-2">
        <a href="/infos/${b.id}" data-link
          class="inline-flex items-center justify-center px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
          View
        </a>
      </td>
    `;

    body.appendChild(tr);
  });
}

function buildPrintableTableHTML(title, rows, columns) {
  const esc = (v) =>
    String(v ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  return `
    <h1>${esc(title)}</h1>
    <table>
      <thead>
        <tr>
          ${columns.map((c) => `<th>${esc(c.label)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${(rows || [])
          .map(
            (r) => `
          <tr>
            ${columns.map((c) => `<td>${esc(r?.[c.key])}</td>`).join("")}
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}