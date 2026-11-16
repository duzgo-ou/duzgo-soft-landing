(function () {
  var t = "https://" + "tools." + "duzgosoft.com";
  var s = "https://" + "suites." + "duzgosoft.com";
  ["link-nav-tools", "link-card-tools"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = t;
  });
  
})();
function showView(name) {
  document.querySelectorAll(".view").forEach(function (el) { el.classList.remove("active"); });
  var target = document.getElementById("view-" + name) || document.getElementById("view-home");
  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (history.replaceState) history.replaceState(null, "", name === "home" ? "/" : "#" + name);
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
  var h = window.location.hash.replace("#", "");
  if (["suites", "support", "about", "privacy", "terms", "policies"].indexOf(h) !== -1) showView(h);
});
