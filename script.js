const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") !== "true";
  primaryNav.classList.toggle("is-open", isExpanded);
  menuToggle.setAttribute("aria-expanded", isExpanded);
});

primaryNav?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  primaryNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
});
