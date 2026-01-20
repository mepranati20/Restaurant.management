// frontend/assets/js/controllers/infoController.js

import { $ } from "../utils/dom.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

import { fetchBillingById, fetchReceiptsForBilling } from "../services/infoService.js";
import {
  setINFOLoading,
  renderBillingBasic,
  renderReceiptCount,
  renderReceiptsTable,
  renderINFOError,
} from "../components/INFOView.js";

import {
  INFO_CSV_COLUMNS,
  normalizeINFORows,
  buildINFOPDFHtml,
} from "../utils/infoExport.js";

export async function initINFOController(billingId) {
  setINFOLoading(true);

  try {
    // Fetch data (service)
    const [billing, rows] = await Promise.all([
      fetchBillingById(billingId),
      fetchReceiptsForBilling(billingId),
    ]);

    if (!billing) throw new Error("Billing not found");
 
    // Render UI (view)
    renderBillingBasic(billing);
    renderReceiptCount(rows.length);
    renderReceiptsTable(rows);

    // Wire export buttons (controller)
    $("infoExportCsvBtn")?.addEventListener("click", () => {
      const safeRows = normalizeINFORows(rows);
      const filename = `billing_${billing.id}_receipts.csv`;
      exportToCSV(filename, safeRows, INFO_CSV_COLUMNS);
    });

    $("infoExportPdfBtn")?.addEventListener("click", () => {
      const html = buildINFOPDFHtml(billing, rows);
      exportToPDF(`Billing ${billing.id} Receipt`, html);
    });

    setINFOLoading(false);
  } catch (err) {
    console.error("[infoController] error:", err);
    renderINFOError();
  }
}

export default { initINFOController };