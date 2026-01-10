import { apiGetAll as apiGetAllEnrollments, apiCreate, apiDelete } from "../services/enrollmentService.js";
import { apiGetAll as apiGetAllStudents } from "../services/billingService.js";
import { apiGetAll as apiGetAllCourses } from "../services/menuService.js";

import { showAlert } from "../components/Alert.js";
import { renderEnrollmentTable } from "../components/EnrollmentTable.js";
import { fillEnrollmentDropdowns } from "../components/EnrollmentForm.js";

import { $ } from "../utils/dom.js";

export function initEnrollmentController() {
  loadEverything();

  $("enrollmentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      student_id: Number($("billing_id").value),
      course_id: Number($("menu_id").value),
    };

    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Enrollment created!");
      await loadEnrollmentsOnly();
    }
  });
}

async function loadEverything() {
  await Promise.all([loadbillingAndmenu(), loadEnrollmentsOnly()]);
}

async function loadbillingAndmenu() {
  const [billing, menu] = await Promise.all([apiGetAllbilling(), apiGetAllmenu()]);
  fillEnrollmentDropdowns(billing, menu);
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