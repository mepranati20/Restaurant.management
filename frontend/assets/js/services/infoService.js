// frontend/assets/js/services/infoService.js
// Only data fetching / shaping (no DOM here)

export async function fetchBillingById(billingId) {
  const res = await fetch(`/api/billings/${billingId}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchReceiptsForBilling(billingId) {
  const res = await fetch(`/api/reports/receipts`);
  if (!res.ok) return [];

  const all = await res.json();
  return (all || []).filter((r) => Number(r.billing_id) === Number(billingId));
}