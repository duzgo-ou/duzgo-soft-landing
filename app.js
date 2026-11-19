var VIEW_META = {
home: {
title: "Duzgo Soft — Free Browser PDF & Developer Tools & Cloud Accounting (Duzgo OÜ)",
desc: "Duzgo Soft by Duzgo OÜ (Estonia) builds 74+ free privacy-first browser PDF, OCR, image, and developer tools plus Duzgo Suites automated double-entry cloud accounting."
},
suites: {
title: "Duzgo Suites Accounting — Automated Cloud Bookkeeping & EU VAT Invoicing",
desc: "Automated cloud accounting, double-entry bookkeeping, and recurring invoice software by Duzgo OÜ. Request early access to Duzgo Suites."
},
support: {
title: "Support Center — Duzgo Soft Customer & Technical Helpdesk",
desc: "Submit a support ticket for Duzgo Utility Tools Hub, Duzgo Suites Accounting, billing inquiries, or custom software development by Duzgo OÜ."
},
about: {
title: "About Duzgo Soft — Operated by Duzgo OÜ (Estonia, EU)",
desc: "Learn about Duzgo Soft and Duzgo OÜ, an Estonian software company building privacy-first browser utilities and automated cloud accounting software."
},
privacy: {
title: "Privacy Policy (GDPR) — Duzgo Soft & Duzgo OÜ",
desc: "Read the GDPR-compliant Privacy Policy for Duzgo Soft websites, local browser utility tools, and Duzgo Suites cloud accounting."
},
terms: {
title: "Terms & Conditions — Duzgo Soft (Duzgo OÜ)",
desc: "Terms and Conditions governing the use of Duzgo Soft web utilities, SaaS products, and services operated by Duzgo OÜ (Estonia)."
},
policies: {
title: "Refund & Cookie Policy — Duzgo Soft (Duzgo OÜ)",
desc: "Review Duzgo Soft subscription refund terms and essential functional cookie usage policies."
},
  faq: { title: "FAQ & Popular Tools — Duzgo Soft (Duzgo OÜ)", desc: "Frequently asked questions about Duzgo Soft, Duzgo OÜ (Estonia), privacy-first PDF and developer tools, and cloud accounting.", path: "/faq" }
};
(function () {
var t = "https://" + "tools." + "duzgosoft.com";
["link-nav-tools", "link-card-tools"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = t;
  });
  var s = "https://" + "suites." + "duzgosoft.com";
  ["link-nav-suites", "link-card-suites"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = s;
  });
})();
function showView(name) {  if (name === "suites") { window.location.replace("https://suites.duzgosoft.com"); return; }
var key = VIEW_META[name] ? name : "home";
document.querySelectorAll(".view").forEach(function (el) { el.classList.remove("active"); });
var target = document.getElementById("view-" + key) || document.getElementById("view-home");
target.classList.add("active");
document.title = VIEW_META[key].title;
var metaDesc = document.querySelector("meta[name='description']");
if (metaDesc) metaDesc.setAttribute("content", VIEW_META[key].desc);
window.scrollTo({ top: 0, behavior: "smooth" });
if (history.pushState) history.pushState(null, "", key === "home" ? "/" : "/" + key); var canon = document.querySelector("link[rel='canonical']"); if (canon) canon.setAttribute("href", key === "home" ? "https://duzgosoft.com/" : "https://duzgosoft.com/" + key);
}
function cleanInput(str) {
return String(str || "").replace(/<[^>]*>?/gm, "").replace(/[<>]/g, "").trim();
}
function isValidEmail(email) {
var at = email.indexOf("@");
var dot = email.lastIndexOf(".");
return at > 0 && dot > at + 1 && dot < email.length - 1;
}
function submitSupport(e) {
e.preventDefault();
var trap = document.getElementById("sup-trap");
if (trap && trap.value !== "") return;
var btn = document.getElementById("sup-btn");
var box = document.getElementById("ticket-result");
var name = cleanInput(document.getElementById("sup-name").value);
var email = cleanInput(document.getElementById("sup-email").value).toLowerCase();
var product = cleanInput(document.getElementById("sup-product").value);
var msg = cleanInput(document.getElementById("sup-message").value);
if (!name || !isValidEmail(email) || msg.length < 2) {
box.style.display = "block";
box.innerHTML = "<strong style=\"color:#b91c1c;\">Please enter a valid email address and message before submitting.</strong>";
return;
}
var ticketId = "DZG-" + Math.floor(100000 + Math.random() * 900000);
btn.disabled = true;
btn.textContent = "Submitting Ticket...";
var url = "https://" + "duzgo-support-mailer" + "." + "ecom-apps" + ".workers.dev";
fetch(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ ticketId: ticketId, name: name, email: email, product: product, message: msg })
}).catch(function () { return null; }).finally(function () {
btn.disabled = false;
btn.textContent = "Submit Support Ticket →";
box.style.display = "block";
box.innerHTML = "<strong>✔ Ticket Number: " + ticketId + "</strong>";
document.getElementById("support-form").reset();
});
}
window.addEventListener("DOMContentLoaded", function () {
var p = window.location.pathname.replace(/^\/+|\/+$/g, ""); var h = VIEW_META[p] ? p : window.location.hash.replace("#", "");
if (VIEW_META[h]) showView(h);
});

