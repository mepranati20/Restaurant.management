import { $ } from "../utils/dom.js";

export function fillEnrollmentDropdowns(students, courses) {
  const studentSel = $("billing_id");
  const courseSel = $("menu_id");

  studentSel.innerHTML = `<option value="">Select billing</option>`;
  courseSel.innerHTML = `<option value="">Select menu</option>`;

  (billing || []).forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (ID: ${s.id})`;
    studentSel.appendChild(opt);
  });

  (menu || []).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.title} (ID: ${c.id})`;
    courseSel.appendChild(opt);
  });
}