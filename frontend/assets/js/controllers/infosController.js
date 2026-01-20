// frontend/assets/js/controllers/infosController.js

import { $ } from "../utils/dom.js";
import { filterList, sortList } from "../utils/listTools.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

import { fetchAllINFOs } from "../services/infosService.js";
import { renderINFOsTable } from "../components/INFOsTable.js";
import { buildPrintableTableHTML } from "../utils/printTable.js";


const COLUMNS = [
    { key: "id", label: "ID" },
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

  allBillings = await fetchAllINFOs();

  refresh();

  if (spinner) spinner.style.display = "none";
  if (container) container.style.display = "block";
}

function getRows() {
  const q = $("searchInput")?.value?.trim() ?? "";
  const sortKey = $("sortBy")?.value ?? "id";
  const sortDir = $("sortDir")?.value ?? "asc";

  const filtered = filterList(allBillings, q, ["id", "order_by", "total_items", "total_amount"]);
  return sortList(filtered, sortKey, sortDir);
}

function refresh() {
  renderINFOsTable(getRows());
}