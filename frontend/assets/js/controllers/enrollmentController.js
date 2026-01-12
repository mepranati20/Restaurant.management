import { apiGetAll as apiGetAllEnrollments, apiCreate, apiDelete } from "../services/enrollmentService.js";
import { apiGetAll as apiGetAllbillings } from "../services/billingService.js";
import { apiGetAll as apiGetAllmenus } from "../services/menuService.js";

import { showAlert } from "../components/Alert.js";
import { renderEnrollmentTable } from "../components/EnrollmentTable.js";
import { fillEnrollmentDropdowns } from "../components/EnrollmentForm.js";

import { $ } from "../utils/dom.js";

export function initEnrollmentController() {
  loadEverything();

  $("enrollmentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
    billing_id: Number($("billing_id").value),
     menu_id: Number($("menu_id").value),
    };

    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Enrollment created!");
      await loadEnrollmentsOnly();
    }
  });
}

async function loadEverything() {
  await Promise.all([loadbillingsAndmenus(), loadEnrollmentsOnly()]);
}

async function loadbillingsAndmenus() {
  const [billings, menus] = await Promise.all([apiGetAllbillings(), apiGetAllmenus()]);
  fillEnrollmentDropdowns(billings, menus);
}

async function loadEnrollmentsOnly() {
  const spinner = $("loadingSpinner");
  const table = $("enrollmentsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const enrollments = await apiGetAllEnrollments();
  renderEnrollmentTable(enrollments);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function deleteEnrollmentAction(id) {
  if (!confirm("Delete this enrollment?")) return;
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Enrollment deleted!");
    await loadEnrollmentsOnly();
  }
}