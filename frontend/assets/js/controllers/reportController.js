import { apiGetReceiptReport } from "../services/reportService.js";
import { renderReceiptReportTable } from "../components/ReceiptReportTable.js";
import { $ } from "../utils/dom.js";

export function initReceiptReportController() {
  loadReport();
}

async function loadReport() {
  const spinner = $("loadingSpinner");
  const table = $("reportTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";
  const rows = await apiGetReceiptReport();
  renderReceiptReportTable(rows);

  spinner.style.display = "none";
  table.style.display = "block";
}