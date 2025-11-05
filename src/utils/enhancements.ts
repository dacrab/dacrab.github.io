import { scrollToWithOffset } from "@/utils/scroll";

export function initIndexEnhancements() {
	type IndexEnhancementsFlag = { __indexEnhancements?: boolean };
	const w = window as unknown as IndexEnhancementsFlag;
	if (w.__indexEnhancements) {
		return;
	}
	w.__indexEnhancements = true;

	document.addEventListener("DOMContentLoaded", () => {
		// Smooth anchor scrolling for non-nav links
		const anchors = document.querySelectorAll<HTMLAnchorElement>(
			'a[href^="#"]:not([data-nav-link])',
		);
		for (const anchor of anchors) {
			anchor.addEventListener("click", (e) => {
				e.preventDefault();
				const targetId = anchor.getAttribute("href")?.substring(1);
				const target = targetId ? document.getElementById(targetId) : null;
				if (target) {
					scrollToWithOffset(target, 60);
				}
			});
		}

		// Section reveal animations (entire sections)
		try {
			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							entry.target.classList.add("revealed");
						}
					}
				},
				{ threshold: 0.1, rootMargin: "0px" },
			);
			const sections = document.querySelectorAll("section");
			for (const section of sections) {
				section.classList.add("reveal-element");
				observer.observe(section);
			}
		} catch {
			// IntersectionObserver unsupported or DOM not ready; skip enhancements
		}

		// Grouped reveal animations with staggered children
		try {
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			const groupObserver = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (!entry.isIntersecting) continue;
						const group = entry.target as HTMLElement;
						group.classList.add("revealed");
						const children =
							group.querySelectorAll<HTMLElement>(".reveal-child");
						children.forEach((el, index) => {
							// Set index for CSS calc-based delay
							el.style.setProperty("--i", String(index));
							if (prefersReducedMotion) {
								el.classList.add("animate-in");
							}
						});
					}
				},
				{ threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
			);
			document.querySelectorAll<HTMLElement>(".reveal-group").forEach((g) => {
				groupObserver.observe(g);
			});
		} catch {}

		// Hero intro sequence (subtle Swiss-style stagger)
		try {
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			const items = document.querySelectorAll<HTMLElement>("#home .intro-item");
			if (items.length) {
				const baseDelay = 80; // ms between items
				items.forEach((el, i) => {
					if (prefersReducedMotion) {
						el.classList.add("animate-in");
						return;
					}
					setTimeout(() => el.classList.add("animate-in"), i * baseDelay + 100);
				});
			}
		} catch {}
	});
}
