import { $ } from "../utils/dom.js";

export function fillEnrollmentDropdowns(billings, menus) {
  const billingSel = $("billing_id");
  const menuSel = $("menu_id");

  billingSel.innerHTML = `<option value="">Select billing</option>`;
  menuSel.innerHTML = `<option value="">Select menu</option>`;

  (billings || []).forEach(s => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = `${b.name} (ID: ${b.id})`;
    billingSel.appendChild(opt);
  });

  (menus || []).forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = `${m.title} (ID: ${m.id})`;
    menuSel.appendChild(opt);
  });
}