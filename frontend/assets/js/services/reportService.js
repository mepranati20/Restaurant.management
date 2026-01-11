const BASE = window.ENV.API_BASE_URL.replace("/billings", "");
const API_URL = `${BASE}/reports/enrollments`;

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
export async function apiGetEnrollmentReport() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}