import { $ } from "../utils/dom.js";
 
export function resetStaffForm() {
   $("staffForm").reset();
   $("cancelBtn").classList.add("hidden");
   $("submitBtn").textContent = "Add Staff";
 }
 
export function fillStaffForm(staff) {
   $("name").value = staff.name;
   $("email").value = staff.email;
   $("age").value = staff.age;
   $("cancelBtn").classList.remove("hidden");
   $("submitBtn").textContent = "Update Menu";
   setState({ editingStaffId: staff.id });
 }