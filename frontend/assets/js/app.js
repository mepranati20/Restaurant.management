// Main entrypoint for frontend
 import { initBillingController } from "./controllers/billingController.js";
 import { initMenuController } from "./controllers/billingController.js";
 import { initStaffController } from "./controllers/billingController.js";
import { router } from "./router/viewRouter.js";

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
  router();
   initBillingController();
   initMenuController();
   initStaffController();
});