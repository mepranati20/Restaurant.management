const API_URL = window.ENV.API_BASE_URL;
const REPORT_URL = "/api/reports/receipts";

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
export async function apiGetReceiptReport() {
  const res = await fetch(REPORT_URL);
  if (!res.ok) return [];
  return safeJson(res);
}