// Main entrypoint for frontend
// import { initMenuController } from "./controllers/menuController.js";
// import { initBillingController } from "./controllers/billingController.js";
// import { initStaffController } from "./controllers/staffController.js";
import { router } from "./router/viewRouter.js";

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
  router();
  // initBillingController();
  // initStaffController();
});