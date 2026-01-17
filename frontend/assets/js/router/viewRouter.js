import { initBillingController } from "../controllers/billingController.js";
import { initMenuController } from "../controllers/menuController.js";
import { initStaffController } from "../controllers/staffController.js";
import { initEnrollmentController } from "../controllers/enrollmentController.js";
import { initEnrollmentReportController } from "../controllers/reportController.js";
// Load a view into #app container
async function loadView(path) {
const res = await fetch(path);

// If the view file is missing, show 404 view
    if (!res.ok) {
    const fallback = await fetch("/frontend/pages/404.html").then((r) => r.text());
    document.querySelector("#app").innerHTML = fallback;
    return;
  }
  
  const html = await res.text();
  document.querySelector("#app").innerHTML = html;
}
export async function router() {
  // Normalize path: remove trailing slash (except "/")
  let path = window.location.pathname;
   if (path.length > 1) path = path.replace(/\/$/, "");

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  }
else if (path === "/billings") {
    await loadView("/frontend/pages/billings.html");
    initBillingController();
  }
  else if (path === "/menus") {
    await loadView("/frontend/pages/menus.html");
    initMenuController();
  }
  else if (path === "/staffs") {
    await loadView("/frontend/pages/staffs.html");
    initStaffController();
  }
  else if (path === "/enrollments") {
    await loadView("/frontend/pages/enrollments.html");
    initEnrollmentController();
  }
  else if (path === "/events") {
        await loadView("/frontend/pages/events.html");
    }

    
   
else if (path === "/reports/enrollments") {
    await loadView("/frontend/pages/report_enrollments.html");
    initEnrollmentReportController();
  }
  else {
    await loadView("/frontend/pages/404.html");
  }
}

// Make links work without page reload
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  // Back/forward buttons support
  window.addEventListener("popstate", router);
}