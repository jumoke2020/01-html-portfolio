const whatsappToggle = document.querySelector(".whatsapp-float");
const whatsappOptions = document.querySelector("#whatsapp-options");
const currentYear = document.querySelector("#current-year");

whatsappToggle?.addEventListener("click", () => {
  const isExpanded = whatsappToggle.getAttribute("aria-expanded") !== "true";
  whatsappToggle.setAttribute("aria-expanded", isExpanded);
  whatsappOptions.hidden = !isExpanded;
});

if (currentYear) currentYear.textContent = new Date().getFullYear();

const slider = document.querySelector("[data-slider]");
if (slider) {
  const slides = [...slider.querySelectorAll(".slider-image")];
  const count = slider.querySelector(".slider-count");
  const pauseButton = slider.querySelector('[data-slide="toggle"]');
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let paused = reduceMotion.matches;
  let timer;
  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === activeIndex);
      slide.setAttribute("aria-hidden", String(i !== activeIndex));
    });
    count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };
  const setPaused = (shouldPause) => {
    paused = shouldPause;
    pauseButton.textContent = paused ? "Play" : "Pause";
    pauseButton.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    pauseButton.setAttribute("aria-pressed", String(paused));
    window.clearInterval(timer);
    timer = paused ? undefined : window.setInterval(() => showSlide(activeIndex + 1), 6000);
  };
  slider.addEventListener("click", (event) => {
    const control = event.target.closest("[data-slide]");
    if (!control) return;
    if (control.dataset.slide === "previous") showSlide(activeIndex - 1);
    if (control.dataset.slide === "next") showSlide(activeIndex + 1);
    if (control.dataset.slide === "toggle") setPaused(!paused);
  });
  reduceMotion.addEventListener("change", (event) => {
    if (event.matches) setPaused(true);
  });
  setPaused(paused);
}
