// frontend/assets/js/utils/infoExport.js
// Only export helpers for the info page (no DOM events)

function esc(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export const INFO_CSV_COLUMNS = [
    { key: "receipt_id", label: "receipt ID" },
    { key: "menu_Category", label: "Category" },
    { key: "menu_name", label: "Item_name" },
    { key: "price", label: "Price" },
    { key: "staff_name", label: "Staff_name" },
    { key: "staff_email", label: "Email" },
    { key: "receipt_on", label: "Receipt On" },
  ];


export function normalizeINFORows(rows) {
  // keep it consistent even if backend keys vary slightly
  return (rows || []).map((r) => ({
    receipt_id: r.receipt_id ?? r.id ?? "-",
    menu_Category: r.menu_Category ?? "-",
    menu_name: r.menu_name ?? r.name ?? "-",
    price: r.price ?? "-",
    staff_name: r.staff_name ?? "-",
    staff_email: r.staff_email ?? "-",
    receipt_on: r.receipt_on ?? "-",
  }));
}

export function buildINFOPDFHtml(billing, rows) {
  const safeBilling = billing || {};
  const safeRows = normalizeINFORows(rows);

  return `
    <h1>Billing INFO</h1>

    <h2>Basic Details</h2>
    <table>
      <tbody>
        <tr><th>ID</th><td>${esc(safeBilling.id)}</td></tr>
        <tr><th>Order_by</th><td>${esc(safeBilling.order_by)}</td></tr>
        <tr><th>Total_items</th><td>${esc(safeBilling.total_items)}</td></tr>
        <tr><th>Total_amount</th><td>${esc(safeBilling.total_amount)}</td></tr>
        <tr><th>Total Receipts</th><td>${esc(safeRows.length)}</td></tr>
      </tbody>
    </table>

    <h2>receipt Menus</h2>
    <table>
      <thead>
        <tr>
          <th>receipt ID</th>
          <th>Category</th>
          <th>Item_name</th>
          <th>Price</th>
          <th>Staff_name</th>
          <th>Email</th>
          <th>Receipt  On</th>
        </tr>
      </thead>
      <tbody>
        ${
          safeRows.length
            ? safeRows
                .map(
                  (r) => `
          <tr>
            <td>${esc(r.receipt_id)}</td>
            <td>${esc(r.menu_Category)}</td>
            <td>${esc(r.menu_name)}</td>
            <td>${esc(r.price)}</td>
            <td>${esc(r.staff_name)}</td>
            <td>${esc(r.staff_email)}</td>
            <td>${esc(r.receipt_on)}</td>
          </tr>
        `
                )
                .join("")
            : `<tr><td colspan="7">No receipts found.</td></tr>`
        }
      </tbody>
    </table>
  `;
}