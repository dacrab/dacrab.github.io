import { scrollToWithOffset } from "@/utils/scroll";

export function initIndexEnhancements() {
  if ((window as any).__indexEnhancements) return;
  (window as any).__indexEnhancements = true;

  document.addEventListener("DOMContentLoaded", () => {
    try { document.body.classList.add("loaded"); } catch {}

    // Smooth anchor scrolling for non-nav links
    document
      .querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not([data-nav-link])')
      .forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute("href")?.substring(1);
          const target = targetId ? document.getElementById(targetId) : null;
          if (target) scrollToWithOffset(target, 60);
        });
      });

    // Section reveal animations
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("revealed");
          });
        },
        { threshold: 0.1, rootMargin: "0px" },
      );
      document
        .querySelectorAll("section")
        .forEach((section) => {
          section.classList.add("reveal-element");
          observer.observe(section);
        });
    } catch {}
  });
}
