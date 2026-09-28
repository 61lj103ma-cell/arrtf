document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.style.opacity = 1; });
}, { threshold: .1 });
document.querySelectorAll(".feature-card,.section-head,.workspace-preview,.about").forEach(el => {
  el.style.opacity = 0; el.style.transition = "opacity .7s ease, transform .7s ease"; observer.observe(el);
});
