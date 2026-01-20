const API_URL = window.ENV.API_BASE_URL; // /api/students

export async function fetchAllINFOs() {
  const res = await fetch(API_URL);
  return res.ok ? await res.json() : [];
}