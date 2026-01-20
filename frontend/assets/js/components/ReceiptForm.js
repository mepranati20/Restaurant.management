import { $ } from "../utils/dom.js";

export function fillReceiptDropdowns(billings, menus , staffs) {
  const billingSel = $("billing_id");
  const menuSel = $("menu_id");
  const staffSel = $("staff_id");
 
  billingSel.innerHTML = `<option value="">Select billing</option>`;
  menuSel.innerHTML = `<option value="">Select menu</option>`;
  staffSel.innerHTML = `<option value="">Select staff</option>`;

  (billings || []).forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = `${b.order_by} (ID: ${b.id})`;
    billingSel.appendChild(opt);
  });

  (menus || []).forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = `${m.name} (ID: ${m.id})`;
    menuSel.appendChild(opt);
  });
  
  (staffs || []).forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (ID: ${s.id})`;
    staffSel.appendChild(opt);
  });
}