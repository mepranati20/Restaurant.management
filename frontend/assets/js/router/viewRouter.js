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
     return;
  }
  if (path === "/billings") {
    await loadView("/frontend/pages/billings.html");
    const mod = await import("../controllers/billingController.js");
    mod.initBillingController();
     return;
  }
  if (path === "/menus") {
    await loadView("/frontend/pages/menus.html");
    const mod = await import("../controllers/menuController.js");
    mod.initMenuController();
     return;
  }
   if (path === "/staffs") {
    await loadView("/frontend/pages/staffs.html");
    const mod = await import("../controllers/staffController.js");
    mod.initStaffController();
     return;
  }
  if (path === "/receipts") {
    await loadView("/frontend/pages/receipts.html");
    const mod = await import("../controllers/receiptController.js");
    mod.initReceiptController();
     return;
  }

  if (path === "/reports/receipts") {
    await loadView("/frontend/pages/report_receipts.html");
    const mod = await import("../controllers/reportController.js");
    mod.initReceiptReportController();
     return;
  }
  if (path === "/infos") {
    await loadView("/frontend/pages/infos.html");
    const mod = await import("../controllers/infosController.js");
    mod.initINFOsController();
    return;
  }
   if (path === "/events") {
    await loadView("/frontend/pages/events.html")
     return;
   }
  // --------------------
  // INFO PAGE (dynamic): /infos/:id
  // -------------------
  if (path.startsWith("/infos/")) {
    const idStr = path.split("/")[2]; // "/infos/1" -> "1"
    const id = Number(idStr);

    // If invalid id, show 404
    if (!Number.isInteger(id)) {
      await loadView("/frontend/pages/404.html");
      return;
    }
    await loadView("/frontend/pages/info.html");
    const mod = await import("../controllers/infoController.js");
    mod.initINFOController(id);
    return;
  }
    await loadView("/frontend/pages/404.html");
  
}

// Make links work without page reload
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    router();
  });
  // Back/forward buttons support
  window.addEventListener("popstate", router);
}