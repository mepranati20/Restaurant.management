// Base API URL from env.js
const API_URL = "/api/staffs";

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
// Fetch all staffs
export async function apiGetAll() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}
// Fetch one staff by ID
export async function apiGetOne(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new staff
export function apiCreate(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update a staff
export function apiUpdate(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a staff
export function apiDelete(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}